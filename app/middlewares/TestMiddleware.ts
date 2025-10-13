import type {HandlerType} from "@bejibun/core/types";
import {BunRequest} from "bun";

export default class TestMiddleware {
    public constructor() {
        //
    }

    public handle(handler: HandlerType): HandlerType {
        return async (request: BunRequest) => {
            console.log(`[TestMiddleware]: ${request.url}`);

            return handler(request);
        };
    }
}