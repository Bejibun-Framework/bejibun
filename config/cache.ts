const config = {
    connection: "redis",

    connections: {
        redis: {
            host: Bun.env.REDIS_HOST,
            port: Bun.env.REDIS_PORT,
            password: Bun.env.REDIS_PASSWORD,
            database: Bun.env.REDIS_DATABASE
        }
    }
};
export default config;
