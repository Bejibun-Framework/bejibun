import Router from "@bejibun/core/facades/Router";
import hello from "@/routes/hello";
import test from "@/routes/test";

export default Router.prefix("api").group([
    hello,
    test
]);