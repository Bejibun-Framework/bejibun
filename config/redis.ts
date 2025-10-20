const config: Record<string, any> = {
    default: Bun.env.REDIS_CONNECTION,

    connections: {
        local: {
            host: Bun.env.REDIS_HOST,
            port: Bun.env.REDIS_PORT,
            password: Bun.env.REDIS_PASSWORD,
            database: Bun.env.REDIS_DATABASE,
            maxRetries: Number(Bun.env.REDIS_MAX_RETRIES)
        }
    }
};

export default config;