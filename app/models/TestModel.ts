import BaseModel, {BaseColumns} from "@bejibun/core/bases/BaseModel";
import Luxon from "@bejibun/utils/facades/Luxon";

export interface TestColumns extends BaseColumns {
    name: string;
}

export default class TestModel extends BaseModel implements TestColumns {
    public static tableName: string = "tests";
    public static idColumn: string = "id";

    declare id: bigint;
    declare name: string;
    declare created_at: Luxon.DateTime | string;
    declare updated_at: Luxon.DateTime | string;
    declare deleted_at: Luxon.DateTime | string | null;
}