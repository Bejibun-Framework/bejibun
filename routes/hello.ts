import Router from "@/utils/Router";
import HttpMethodEnum from "@/app/enums/HttpMethodEnum";

export default Router.prefix("hello").group([
    Router.match([
        HttpMethodEnum.Get,
        HttpMethodEnum.Put
    ], "/", "HelloController@hello"),

    Router.get(":name", "HelloController@helloName")
]);