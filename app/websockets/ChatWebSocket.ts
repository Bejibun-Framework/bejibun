import BaseWebSocket from "@bejibun/core/bases/BaseWebSocket";

export default class ChatWebSocket extends BaseWebSocket {
    public async handle(ws: Bun.ServerWebSocket<any>, message: string | Buffer<ArrayBuffer>): Promise<void> {
        for (const connection of super.connections) {
            if (connection.data.id !== ws.data.id) {
                if (connection.readyState === 1) {
                    connection.send(message);
                }
            }
        }
    }
}