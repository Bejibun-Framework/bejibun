import Router from "@bejibun/core/facades/Router";
import TestMiddleware from "@/app/middlewares/TestMiddleware";
import LoggerMiddleware from "@/app/middlewares/LoggerMiddleware";

export default Router.prefix("test")
    .middleware(new TestMiddleware(), new LoggerMiddleware())
    .group([
        Router.get("redis", "TestController@redis"),
        Router.get("cache", "TestController@cache"),
        Router.get("queue", "TestController@queue"),
        Router.get("/", "TestController@index"),
        Router.get("/:id", "TestController@show"),
        Router.post("/", "TestController@store"),
        Router.put("/:id", "TestController@update"),
        Router.delete("/:id", "TestController@destroy"),
        Router.patch("/:id", "TestController@restore")
    ]);
