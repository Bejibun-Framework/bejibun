import type {Knex} from "knex";

const config: Knex.Config = {
    client: "pg",
    connection: {
        host: env("DB_HOST"),
        port: env("DB_PORT"),
        user: env("DB_USER"),
        password: env("DB_PASSWORD"),
        database: env("DB_DATABASE")
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
