import TestMiddleware from "@/app/middlewares/TestMiddleware";
import LoggerMiddleware from "@/app/middlewares/LoggerMiddleware";
import Router from "@/utils/Router";

export default Router.prefix("test")
    .middleware(
        new TestMiddleware(),
        new LoggerMiddleware()
    )
    .group([
        Router.get("redis", "TestController@redis"),
        Router.get("get", "TestController@get"),
        Router.get("detail/:id", "TestController@detail"),
        Router.post("add", "TestController@add"),
        Router.post("edit", "TestController@edit"),
        Router.delete("delete/:id", "TestController@delete"),
        Router.get("restore/:id", "TestController@restore")
    ]);