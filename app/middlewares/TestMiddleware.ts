import type {HandlerType} from "@bejibun/core/types";
import Logger from "@bejibun/logger";

export default class TestMiddleware {
    public handle(handler: HandlerType): HandlerType {
        return async (request: Bun.BunRequest, server: Bun.Server<any>) => {
            Logger.setContext("TestMiddleware").debug(request.url);

            return handler(request, server);
        };
    }
}