type ResourceAction = "index" | "store" | "show" | "update" | "destroy";

export interface ResourceOptions {
    only?: Array<ResourceAction>;
    except?: Array<ResourceAction>;
}

export default class RouterBuilder {
    private basePath: string = "";
    private middlewares: Middleware[] = [];

    public prefix(basePath: string): RouterBuilder {
        this.basePath = basePath;

        return this;
    }

    public middleware(...middlewares: Middleware[]): RouterBuilder {
        this.middlewares.push(...middlewares);

        return this;
    }

    public group(routes: Record<string, Record<string, HandlerType>>): Record<string, Record<string, HandlerType>> {
        const newRoutes: Record<string, Record<string, HandlerType>> = {};

        for (const path in routes) {
            const fullPath = this.joinPaths(this.basePath, path);
            const routeHandlers = routes[path];
            const wrappedHandlers: Record<string, HandlerType> = {};

            for (const method in routeHandlers) {
                let handler = routeHandlers[method];

                for (const middleware of this.middlewares) {
                    handler = middleware.handle(handler);
                }

                wrappedHandlers[method] = handler;
            }

            newRoutes[fullPath] = wrappedHandlers;
        }

        return newRoutes;
    }

    public resources(
        controller: Record<string, HandlerType>,
        options?: ResourceOptions
    ): Record<string, Record<string, HandlerType>> {
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

        const filteredRoutes: Record<string, Record<string, HandlerType>> = {};

        for (const path in allRoutes) {
            const methods = allRoutes[path];
            const methodHandlers: Record<string, HandlerType> = {};

            for (const httpMethod in methods) {
                const action = methods[httpMethod];
                if (includedActions.has(action) && controller[action]) {
                    methodHandlers[httpMethod] = controller[action];
                }
            }

            if (Object.keys(methodHandlers).length > 0) {
                filteredRoutes[path] = methodHandlers;
            }
        }

        return this.group(filteredRoutes);
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

    private joinPaths(base: string, path: string): string {
        base = base.replace(/\/+$/, "");
        path = path.replace(/^\/+/, "");

        return "/" + [base, path].filter(Boolean).join("/");
    }
}