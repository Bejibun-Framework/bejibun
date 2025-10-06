import {BunRequest} from "bun";

declare global {
    type HandlerType = (request: BunRequest) => Promise<Response>;
    type MiddlewareType = (handler: HandlerType) => HandlerType;

    interface Middleware {
        handle(handler: HandlerType): HandlerType;
    }
}

export {};