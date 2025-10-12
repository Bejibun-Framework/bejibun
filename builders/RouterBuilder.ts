import HttpMethodEnum from "@/app/enums/HttpMethodEnum";
import {isEmpty} from "@/utils/utils";

export interface ResourceOptions {
    only?: Array<ResourceAction>;
    except?: Array<ResourceAction>;
}

export default class RouterBuilder {
    private basePath: string = "";
    private middlewares: Array<Middleware> = [];

    public prefix(basePath: string): RouterBuilder {
        this.basePath = basePath;

        return this;
    }

    public middleware(...middlewares: Array<Middleware>): RouterBuilder {
        this.middlewares.push(...middlewares);

        return this;
    }

    public group(routes: RouterGroup | Array<RouterGroup>): RouterGroup {
        const routeList = Array.isArray(routes) ? routes : [routes];
        const newRoutes: RouterGroup = {};

        for (const route of routeList) {
            for (const path in route) {
                const fullPath = this.joinPaths(this.basePath, path);
                const routeHandlers = route[path];
                const wrappedHandlers: Record<string, HandlerType> = {};

                for (const method in routeHandlers) {
                    let handler = routeHandlers[method];

                    for (const middleware of this.middlewares) {
                        handler = middleware.handle(handler);
                    }

                    wrappedHandlers[method] = handler;
                }

                if (isEmpty(newRoutes[fullPath])) newRoutes[fullPath] = {};

                Object.assign(newRoutes[fullPath], wrappedHandlers);
            }
        }

        return newRoutes;
    }

    public resources(controller: Record<string, HandlerType>, options?: ResourceOptions): RouterGroup {
        const allRoutes: Record<string, Record<string, ResourceAction>> = {
            "": {
                GET: "index",
                POST: "store"
            },
            ":id": {
                GET: "show",
                PUT: "update",
                DELETE: "destroy"
            }
        };

        const includedActions = this.resolveIncludedActions(options);

        const filteredRoutes: RouterGroup = {};

        for (const path in allRoutes) {
            const methods = allRoutes[path];
            const methodHandlers: Record<string, HandlerType> = {};

            for (const method in methods) {
                const action = methods[method];
                if (includedActions.has(action) && controller[action]) {
                    methodHandlers[method] = controller[action];
                }
            }

            if (Object.keys(methodHandlers).length > 0) {
                filteredRoutes[path] = methodHandlers;
            }
        }

        return this.group(filteredRoutes);
    }

    public buildSingle(method: HttpMethodEnum, path: string, handler: string | HandlerType): RouterGroup {
        const cleanPath = this.joinPaths(this.basePath, path);

        let resolvedHandler: HandlerType = typeof handler === "string" ?
            this.resolveControllerString(handler) :
            handler;

        for (const middleware of this.middlewares) {
            resolvedHandler = middleware.handle(resolvedHandler);
        }

        return {
            [cleanPath]: {
                [method]: resolvedHandler
            }
        };
    }

    private joinPaths(base: string, path: string): string {
        base = base.replace(/\/+$/, "");
        path = path.replace(/^\/+/, "");

        return "/" + [base, path].filter(Boolean).join("/");
    }

    private resolveControllerString(definition: string): HandlerType {
        const [controllerName, methodName] = definition.split("@");

        if (isEmpty(controllerName) || isEmpty(methodName)) {
            throw new RouterInvalidException(`[RouterInvalidException]: Invalid router controller definition: ${definition}.`);
        }

        let ControllerClass: any;

        try {
            ControllerClass = require(`@/app/controllers/${controllerName}`).default;
        } catch {
            return async (...args: any[]) => {
                const module = await import(`@/app/controllers/${controllerName}`);
                const ESMController = module.default;
                const instance = new ESMController();

                if (typeof instance[methodName] !== "function") {
                    throw new RouterInvalidException(`[RouterInvalidException]: Method "${methodName}" not found in ${controllerName}.`);
                }

                return instance[methodName](...args);
            };
        }

        if (isEmpty(ControllerClass)) {
            throw new RouterInvalidException(`[RouterInvalidException]: Controller not found: ${controllerName}.`);
        }

        const instance = new ControllerClass();

        if (typeof instance[methodName] !== "function") {
            throw new RouterInvalidException(`[RouterInvalidException]: Method "${methodName}" not found in ${controllerName}.`);
        }

        return instance[methodName].bind(instance);
    }

    private resolveIncludedActions(options?: ResourceOptions): Set<ResourceAction> {
        const all: Array<ResourceAction> = ["index", "store", "show", "update", "destroy"];

        if (options?.only) {
            return new Set(options.only);
        }

        if (options?.except) {
            return new Set(all.filter(action => !options.except!.includes(action)));
        }

        return new Set(all);
    }
}