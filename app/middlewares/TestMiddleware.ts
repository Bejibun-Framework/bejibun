import type {HandlerType} from "@bejibun/core/types";
import Logger from "@bejibun/logger";

export default class TestMiddleware {
    public handle(handler: HandlerType): HandlerType {
        return async (request: Bun.BunRequest) => {
            Logger.setContext("TestMiddleware").debug(request.url);

            return handler(request);
        };
    }
}