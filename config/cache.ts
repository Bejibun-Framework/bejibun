import App from "@bejibun/app";
import CacheDriverEnum from "@bejibun/cache/enums/CacheDriverEnum";

const config: Record<string, any> = {
    /** Default connection name used when none is specified. */
    default: env("CACHE_DRIVER", "local"),

    /** Named cache driver connections. */
    connections: {
        /** Local filesystem cache driver. */
        local: {
            driver: CacheDriverEnum.Local,
            path: App.Path.storagePath("cache") // absolute path
        },

        /** Redis cache driver. */
        redis: {
            driver: CacheDriverEnum.Redis,
            host: env("REDIS_HOST"),
            port: env("REDIS_PORT"),
            password: env("REDIS_PASSWORD"),
            database: env("REDIS_DATABASE")
        }
    }
};

export default config;
