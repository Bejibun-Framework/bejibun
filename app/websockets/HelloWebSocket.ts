import BaseWebSocket from "@bejibun/core/bases/BaseWebSocket";

export default class HelloWebSocket extends BaseWebSocket {
    public async handle(message: any): Promise<void> {
        return super.broadcast(message);
    }
}