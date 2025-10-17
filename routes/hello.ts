import Router from "@bejibun/core/facades/Router";
import HttpMethodEnum from "@bejibun/utils/enums/HttpMethodEnum";

export default Router.prefix("hello").group([
    Router.match([
        HttpMethodEnum.Get,
        HttpMethodEnum.Put
    ], "/", "HelloController@hello"),

    Router.get(":name", "HelloController@helloName")
]);