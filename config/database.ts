import type {Knex} from "knex";

const config: Knex.Config = {
    client: "pg",
    connection: {
        host: Bun.env.DB_HOST,
        port: Bun.env.DB_PORT,
        user: Bun.env.DB_USER,
        password: Bun.env.DB_PASSWORD,
        database: Bun.env.DB_DATABASE
    },
    migrations: {
        extension: "ts",
        directory: "./database/migrations",
        schemaName: "public",
        tableName: "migrations"
    },
    pool: {
        min: 0,
        max: 10
    },
    seeds: {
        extension: "ts",
        directory: "./database/seeders"
    }
};

export default config;