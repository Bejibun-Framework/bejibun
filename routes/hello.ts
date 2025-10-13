import HttpMethodEnum from "@bejibun/core/enums/HttpMethodEnum";
import Router from "@bejibun/core/facades/Router";

export default Router.prefix("hello").group([
    Router.match([
        HttpMethodEnum.Get,
        HttpMethodEnum.Put
    ], "/", "HelloController@hello"),

    Router.get(":name", "HelloController@helloName")
]);