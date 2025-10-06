import type {Knex} from "knex";

const config: Knex.Config = {
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    },
    migrations: {
        extension: "ts",
        directory: "./database/migrations",
        tableName: "migrations"
    },
    pool: {
        min: 0,
        max: 1
    },
    seeds: {
        extension: "ts",
        directory: "./database/seeders"
    }
};

export default config;