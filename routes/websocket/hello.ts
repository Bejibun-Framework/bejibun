import Router from "@bejibun/core/facades/Router";

export default Router.prefix("hello").group([
    Router.websocket("websocket", "HelloWebSocket@handle")
]);