export default class Router {
    private basePath: string = "";
    private middlewares: Middleware[] = [];

    public prefix(basePath: string): Router {
        this.basePath = basePath;

        return this;
    }

    public middleware(...middlewares: Middleware[]): Router {
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

    private joinPaths(base: string, path: string): string {
        base = base.replace(/\/+$/, "");
        path = path.replace(/^\/+/, "");

        return "/" + [base, path].filter(Boolean).join("/");
    }
}