declare global {
    type MiddlewareType = (handler: HandlerType) => HandlerType;

    interface Middleware {
        handle(handler: HandlerType): HandlerType;
    }
}

export {};