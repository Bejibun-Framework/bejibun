import Router from "@bejibun/core/facades/Router";
import hello from "@/routes/api/hello";
import test from "@/routes/api/test";

export default Router.prefix("api").group([
    hello,
    test
]);