import type {HandlerType} from "@bejibun/core/types";
import Logger from "@bejibun/logger";
import {BunRequest} from "bun";
import {DateTime} from "luxon";

export default class LoggerMiddleware {
    public constructor() {
        //
    }

    public handle(handler: HandlerType): HandlerType {
        return async (request: BunRequest) => {
            Logger.setContext("LoggerMiddleware").debug(Math.floor(DateTime.now().toSeconds()));

            return handler(request);
        };
    }
}