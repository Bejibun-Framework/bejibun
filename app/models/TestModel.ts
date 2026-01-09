import type {Timestamp, NullableTimestamp} from "@bejibun/core/bases/BaseModel";
import BaseModel from "@bejibun/core/bases/BaseModel";

export default class TestModel extends BaseModel {
    public static tableName: string = "tests";
    public static idColumn: string = "id";

    declare id: bigint;
    declare name: string;
    declare created_at: Timestamp;
    declare updated_at: Timestamp;
    declare deleted_at: NullableTimestamp;
}