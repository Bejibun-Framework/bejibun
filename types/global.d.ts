import {RedisClient} from "bun";
import RedisException from "@/app/exceptions/RedisException";

declare global {
    type RedisConfig = {
        host: string;
        port: number;
        password?: string | null;
        database?: number;
        maxRetries?: number;
    };
    type RedisPipeline = {
        del: (key: string) => void;
        get: (key: string) => void;
        set: (key: string, value: any, ttl?: number) => void;
    };
    type RedisSubscribe = {
        client: RedisClient;
        unsubscribe: () => Promise<boolean>;
    };

    var RedisException: typeof RedisException;
}

export {};