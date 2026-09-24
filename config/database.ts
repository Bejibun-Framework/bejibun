import type {Knex} from "knex";

const config: Knex.Config = {
    /** Database client to use. */
    client: "pg",

    /** Connection settings for the PostgreSQL server. */
    connection: {
        host: env("DB_HOST"),
        port: env("DB_PORT"),
        user: env("DB_USER"),
        password: env("DB_PASSWORD"),
        database: env("DB_DATABASE")
    },

    /** Migration settings. */
    migrations: {
        extension: "ts",
        directory: "./database/migrations",
        schemaName: "public",
        tableName: "migrations"
    },

    /** Connection pool settings. */
    pool: {
        min: 0,
        max: 10
    },

    /** Seeder settings. */
    seeds: {
        extension: "ts",
        directory: "./database/seeders"
    }
};

export default config;
