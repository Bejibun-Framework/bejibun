import {defineValue} from "@/utils/utils";

export default class RedisException extends Error {
    public code: number;

    public constructor(message?: string, code?: number) {
        super(message);
        this.name = "RedisException";
        this.code = defineValue(code, 503);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, RedisException);
        }
    }
}