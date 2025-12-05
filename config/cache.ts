import App from "@bejibun/app";

const config: Record<string, any> = {
    connection: "local",

    connections: {
        local: {
            path: App.Path.storagePath("cache") // absolute path
        },

        redis: {
            host: Bun.env.REDIS_HOST,
            port: Bun.env.REDIS_PORT,
            password: Bun.env.REDIS_PASSWORD,
            database: Bun.env.REDIS_DATABASE
        }
    }
};

export default config;