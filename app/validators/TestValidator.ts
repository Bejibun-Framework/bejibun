import vine from "@vinejs/vine";
import TestModel from "@/app/models/TestModel";
import BaseValidator from "@/app/validators/BaseValidator";

export default class TestValidator extends BaseValidator {
    public static get detail(): ValidatorType {
        return vine.compile(
            vine.object({
                id: vine.number().min(1).exists(TestModel, "id")
            })
        );
    }

    public static get add(): ValidatorType {
        return vine.compile(
            vine.object({
                name: vine.string()
            })
        );
    }

    public static get edit(): ValidatorType {
        return vine.compile(
            vine.object({
                id: vine.number().min(1).exists(TestModel, "id"),
                name: vine.string()
            })
        );
    }

    public static get delete(): ValidatorType {
        return vine.compile(
            vine.object({
                id: vine.number().min(1).exists(TestModel, "id")
            })
        );
    }

    public static get restore(): ValidatorType {
        return vine.compile(
            vine.object({
                id: vine.number().min(1).exists(TestModel, "id", true)
            })
        );
    }
}