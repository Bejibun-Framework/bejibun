import type {HandlerType} from "@bejibun/core/types";
import Logger from "@bejibun/logger";
import Luxon from "@bejibun/utils/facades/Luxon";

export default class LoggerMiddleware {
    public handle(handler: HandlerType): HandlerType {
        return async (request: Bun.BunRequest, server: Bun.Server<any>) => {
            Logger.setContext("LoggerMiddleware").debug(Math.floor(Luxon.DateTime.now().toSeconds()));

            return handler(request, server);
        };
    }
}