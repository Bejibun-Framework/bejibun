import App from "@bejibun/app";
import CacheDriverEnum from "@bejibun/cache/enums/CacheDriverEnum";

const config: Record<string, any> = {
    default: env("CACHE_DRIVER", "local"),

    connections: {
        local: {
            driver: CacheDriverEnum.Local,
            path: App.Path.storagePath("cache") // absolute path
        },

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
