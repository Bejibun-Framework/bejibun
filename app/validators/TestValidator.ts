import vine, {SchemaTypes, VineValidator} from "@vinejs/vine";
import TestModel from "@/app/models/TestModel";
import BaseValidator from "@/app/validators/BaseValidator";

export default class TestValidator extends BaseValidator {
    public static get detail(): VineValidator<SchemaTypes, Record<string, any> | undefined> {
        return vine.compile(
            vine.object({
                id: vine.number().min(1).exists(TestModel, "id")
            })
        );
    }

    public static get add(): VineValidator<SchemaTypes, Record<string, any> | undefined> {
        return vine.compile(
            vine.object({
                name: vine.string()
            })
        );
    }

    public static get edit(): VineValidator<SchemaTypes, Record<string, any> | undefined> {
        return vine.compile(
            vine.object({
                id: vine.number().min(1).exists(TestModel, "id"),
                name: vine.string()
            })
        );
    }

    public static get delete(): VineValidator<SchemaTypes, Record<string, any> | undefined> {
        return vine.compile(
            vine.object({
                id: vine.number().min(1).exists(TestModel, "id")
            })
        );
    }

    public static get restore(): VineValidator<SchemaTypes, Record<string, any> | undefined> {
        return vine.compile(
            vine.object({
                id: vine.number().min(1).exists(TestModel, "id", true)
            })
        );
    }
}