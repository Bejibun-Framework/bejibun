import {BunRequest, RedisClient} from "bun";
import {SchemaTypes, VineValidator} from "@vinejs/vine";
import ModelNotFoundException from "@/app/exceptions/ModelNotFoundException";
import RedisException from "@/app/exceptions/RedisException";
import RouterInvalidException from "@/app/exceptions/RouterInvalidException";

declare global {
    type HandlerType = (request: BunRequest) => Promise<Response>;
    type RouterGroup = Record<string, Record<string, HandlerType>>;
    type ResourceAction = "index" | "store" | "show" | "update" | "destroy";

    type ValidatorType<T extends SchemaTypes = SchemaTypes> = VineValidator<SchemaTypes, Record<string, any> | undefined>;

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

    var ModelNotFoundException: typeof ModelNotFoundException;
    var RedisException: typeof RedisException;
    var RouterInvalidException: typeof RouterInvalidException;
}

export {};