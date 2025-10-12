import {RedisClient} from "bun";
import RedisBuilder from "@/builders/RedisBuilder";

export default class Redis {
    public static connection(name: string): Record<string, Function> {
        return RedisBuilder.connection(name);
    }

    public static async connect(name?: string): Promise<RedisClient> {
        return RedisBuilder.connect(name);
    }

    public static async disconnect(name?: string): Promise<void> {
        return RedisBuilder.disconnect(name);
    }

    public static async get(key: RedisClient.KeyLike, connection?: string): Promise<any> {
        return RedisBuilder.get(key, connection);
    }

    public static async set(key: RedisClient.KeyLike, value: any, ttl?: number, connection?: string): Promise<number | "OK"> {
        return RedisBuilder.set(key, value, ttl, connection);
    }

    public static async del(key: RedisClient.KeyLike, connection?: string): Promise<number> {
        return RedisBuilder.del(key, connection);
    }

    public static async publish(channel: string, message: any, connection?: string): Promise<number> {
        return RedisBuilder.publish(channel, message, connection);
    }

    public static async subscribe(channel: string, listener: RedisClient.StringPubSubListener, connection?: string): Promise<RedisSubscribe> {
        return RedisBuilder.subscribe(channel, listener, connection);
    }

    public static async pipeline(fn: (pipe: RedisPipeline) => void, connection?: string) {
        return RedisBuilder.pipeline(fn, connection);
    }

    public static on(event: "connect" | "disconnect" | "error", listener: (...args: Array<any>) => void): void {
        return RedisBuilder.on(event, listener);
    }

    public static off(event: "connect" | "disconnect" | "error", listener: (...args: Array<any>) => void): void {
        return RedisBuilder.off(event, listener);
    }
}