import BaseValidator from "@bejibun/core/bases/BaseValidator";
import TestModel from "@/app/models/TestModel";

export default class TestValidator extends BaseValidator {
    public static get show(): Bejibun.Validator {
        return super.validator.create({
            id: super.validator.number().min(1).exists(TestModel, "id")
        });
    }

    public static get store(): Bejibun.Validator {
        return super.validator.create({
            name: super.validator.string()
        });
    }

    public static get update(): Bejibun.Validator {
        return super.validator.create({
            id: super.validator.number().min(1).exists(TestModel, "id"),
            name: super.validator.string()
        });
    }

    public static get destroy(): Bejibun.Validator {
        return super.validator.create({
            id: super.validator.number().min(1).exists(TestModel, "id")
        });
    }

    public static get restore(): Bejibun.Validator {
        return super.validator.create({
            id: super.validator.number().min(1).exists(TestModel, "id", true)
        });
    }
}
