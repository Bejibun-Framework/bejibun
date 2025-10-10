import RouterBuilder, {ResourceOptions} from "@/builders/RouterBuilder";

export default class Router {
    public static prefix(basePath: string): RouterBuilder {
        return new RouterBuilder().prefix(basePath);
    }

    public static middleware(...middlewares: Middleware[]): RouterBuilder {
        return new RouterBuilder().middleware(...middlewares);
    }

    public static resources(
        controller: Record<string, HandlerType>,
        options?: ResourceOptions
    ): Record<string, Record<string, HandlerType>> {
        return new RouterBuilder().resources(controller, options);
    }
}