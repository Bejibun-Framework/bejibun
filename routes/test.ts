import TestController from "@/app/controllers/TestController";
import TestMiddleware from "@/app/middlewares/TestMiddleware";
import LoggerMiddleware from "@/app/middlewares/LoggerMiddleware";
import Router from "@/utils/Router";

export default new Router().prefix("test")
    .middleware(
        new TestMiddleware(),
        new LoggerMiddleware()
    )
    .group({
        "get": {
            GET: new TestController().get
        },
        "detail/:id": {
            GET: new TestController().detail
        },
        "add": {
            POST: new TestController().add
        },
        "edit": {
            POST: new TestController().edit
        },
        "delete/:id": {
            DELETE: new TestController().delete
        },
        "restore/:id": {
            GET: new TestController().restore
        }
    });