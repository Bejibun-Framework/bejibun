import Router from "@bejibun/core/facades/Router";

export default Router.prefix("chat").group([
    Router.websocket("/", "ChatWebSocket@handle")
]);