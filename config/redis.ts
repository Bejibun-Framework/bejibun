const config: Record<string, any> = {
    default: env("REDIS_CONNECTION"),

    connections: {
        local: {
            host: env("REDIS_HOST"),
            port: env("REDIS_PORT"),
            password: env("REDIS_PASSWORD"),
            database: env("REDIS_DATABASE"),
            maxRetries: Number(env("REDIS_MAX_RETRIES"))
        }
    }
};

export default config;