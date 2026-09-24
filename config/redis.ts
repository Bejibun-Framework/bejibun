const config: Record<string, any> = {
    /** Name of the connection used when none is specified. */
    default: env("REDIS_CONNECTION", "local"),

    /** Map of named Redis connections to their connection options. */
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
