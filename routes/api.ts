import Router from "@bejibun/core/facades/Router";
import hello from "@/routes/hello";
import test from "@/routes/test";
import ExceptionHandler from "@/app/exceptions/handler";

export default {
    "/*": new ExceptionHandler().route,

    ...Router.prefix("api").group([
        hello,
        test
    ])
};