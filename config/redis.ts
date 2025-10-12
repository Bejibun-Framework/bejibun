const config: Record<string, any> = {
    default: process.env.REDIS_CONNECTION,

    connections: {
        local: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD,
            database: process.env.REDIS_DATABASE,
            maxRetries: Number(process.env.REDIS_MAX_RETRIES)
        }
    }
};

export default config;