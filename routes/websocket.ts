import Router from "@bejibun/core/facades/Router";
import hello from "@/routes/websocket/hello";

export default Router.prefix("ws").group([
    hello
]);