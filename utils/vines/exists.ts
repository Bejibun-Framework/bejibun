import vine, {VineNumber, VineString, FieldContext} from "@vinejs/vine";
import {QueryBuilderType} from "objection";
import BaseModel from "@/app/models/BaseModel";
import {defineValue, isEmpty} from "@/utils/utils";

type Options = {
    table: typeof BaseModel;
    column?: string;
    withTrashed?: boolean;
};

const exists = async (value: unknown, options: Options, field: FieldContext): Promise<void> => {
    if (!field.isValid) return;

    const column = defineValue(options.column, field.name);

    let query = options.table;
    if (options.withTrashed) query = query.withTrashed();
    else query = query.query();

    const row = await (query as QueryBuilderType<any>).where(column, value).first();

    if (isEmpty(row)) field.report("The {{ field }} field doesn't exists", "exists", field);
}

const existsRule = vine.createRule(exists, {async: true});

const registerUniqueMacro = (Type: any): void => {
    Type.macro("exists", function (tableOrOptions: typeof BaseModel | Options, column?: string, withTrashed?: boolean) {
        const isModel = typeof tableOrOptions === "function" && Object.prototype.isPrototypeOf.call(BaseModel, tableOrOptions);

        const options: Options = isModel
            ? {table: tableOrOptions as typeof BaseModel, column, withTrashed}
            : tableOrOptions as Options;

        return this.use(existsRule(options));
    });
};

registerUniqueMacro(VineString);
registerUniqueMacro(VineNumber);