import type {HandlerType} from "@bejibun/core/types";
import type {BunRequest} from "bun";
import Logger from "@bejibun/logger";

export default class TestMiddleware {
    public constructor() {
        //
    }

    public handle(handler: HandlerType): HandlerType {
        return async (request: BunRequest) => {
            Logger.setContext("TestMiddleware").debug(request.url);

            return handler(request);
        };
    }
}