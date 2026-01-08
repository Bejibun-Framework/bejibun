import type {Knex} from "knex";
import JobModel from "@bejibun/core/models/JobModel";

export function up(knex: Knex): Knex.SchemaBuilder {
    return knex.schema.createTable(JobModel.tableName, (table: Knex.TableBuilder) => {
        table.bigIncrements("id");
        table.string("queue");
        table.text("payload");
        table.bigInteger("attempts").unsigned().defaultTo(0);
        table.bigInteger("reserved_at").unsigned().nullable();
        table.bigInteger("available_at").unsigned();
        table.bigInteger("created_at").unsigned();
    });
}

export function down(knex: Knex): Knex.SchemaBuilder {
    return knex.schema.dropTable(JobModel.tableName);
}