import vine from "@vinejs/vine";
import TestModel from "@/app/models/TestModel";
import BaseValidator, {BaseValidatorType} from "@/app/validators/BaseValidator";

export default class TestValidator extends BaseValidator {
    public static get detail(): BaseValidatorType {
        return vine.compile(
            vine.object({
                id: vine.number().min(1).exists(TestModel, "id")
            })
        );
    }

    public static get add(): BaseValidatorType {
        return vine.compile(
            vine.object({
                name: vine.string()
            })
        );
    }

    public static get edit(): BaseValidatorType {
        return vine.compile(
            vine.object({
                id: vine.number().min(1).exists(TestModel, "id"),
                name: vine.string()
            })
        );
    }

    public static get delete(): BaseValidatorType {
        return vine.compile(
            vine.object({
                id: vine.number().min(1).exists(TestModel, "id")
            })
        );
    }

    public static get restore(): BaseValidatorType {
        return vine.compile(
            vine.object({
                id: vine.number().min(1).exists(TestModel, "id", true)
            })
        );
    }
}