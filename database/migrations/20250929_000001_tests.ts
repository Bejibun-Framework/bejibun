import type {Knex} from "knex";
import TestModel from "@/app/models/TestModel";

export function up(knex: Knex): void {
    return knex.schema.createTable(TestModel.tableName, (table: Knex.TableBuilder) => {
        table.bigIncrements("id");
        table.string("name");
        table.timestamps(true, true);
        table.timestamp("deleted_at");
    });
}

export function down(knex: Knex): void {
    return knex.schema.dropTable(TestModel.tableName);
}