import type {HandlerType} from "@bejibun/core/types";
import {BunRequest} from "bun";
import {DateTime} from "luxon";

export default class LoggerMiddleware {
    public constructor() {
        //
    }

    public handle(handler: HandlerType): HandlerType {
        return async (request: BunRequest) => {
            console.log(`[LoggerMiddleware]: ${Math.floor(DateTime.now().toSeconds())}`);

            return handler(request);
        };
    }
}