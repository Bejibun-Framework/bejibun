import Router from "@bejibun/core/facades/Router";
import chat from "@/routes/websocket/chat";

export default Router.prefix("ws").group([
    chat
]);