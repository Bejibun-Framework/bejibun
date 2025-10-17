import type {HandlerType} from "@bejibun/core/types";
import Logger from "@bejibun/logger";
import {BunRequest} from "bun";

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