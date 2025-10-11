import hello from "@/routes/hello";
import test from "@/routes/test";
import Router from "@/utils/Router";
import ExceptionHandler from "@/app/exceptions/handler";

export default {
    "/*": new ExceptionHandler().route,

    ...Router.prefix("api").group([
        hello,
        test
    ])
};