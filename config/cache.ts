import App from "@bejibun/app";
import CacheDriverEnum from "@bejibun/cache/enums/CacheDriverEnum";

const config: Record<string, any> = {
    connection: "local",

    connections: {
        local: {
            driver: CacheDriverEnum.Local,
            path: App.Path.storagePath("cache") // absolute path
        },

        redis: {
            driver: CacheDriverEnum.Redis,
            host: Bun.env.REDIS_HOST,
            port: Bun.env.REDIS_PORT,
            password: Bun.env.REDIS_PASSWORD,
            database: Bun.env.REDIS_DATABASE
        }
    }
};

export default config;