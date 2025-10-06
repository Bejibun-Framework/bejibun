import type {Knex} from "knex";
import TestModel from "@/app/models/TestModel";

export async function seed(knex: Knex): Promise<void> {
    for (const name of ["Name 1", "Name 2", "Name 3"]) {
        await TestModel.query(knex).insert({
            name: name
        });
    }
}