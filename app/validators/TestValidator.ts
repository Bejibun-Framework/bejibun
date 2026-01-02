import type {ValidatorType} from "@bejibun/core/types/ValidatorType";
import BaseValidator from "@bejibun/core/bases/BaseValidator";
import TestModel from "@/app/models/TestModel";

export default class TestValidator extends BaseValidator {
    public static get detail(): ValidatorType {
        return super.validator.create({
            id: super.validator.number().min(1).exists(TestModel, "id")
        });
    }

    public static get add(): ValidatorType {
        return super.validator.create({
            name: super.validator.string()
        });
    }

    public static get edit(): ValidatorType {
        return super.validator.create({
            id: super.validator.number().min(1).exists(TestModel, "id"),
            name: super.validator.string()
        });
    }

    public static get delete(): ValidatorType {
        return super.validator.create({
            id: super.validator.number().min(1).exists(TestModel, "id")
        });
    }

    public static get restore(): ValidatorType {
        return super.validator.create({
            id: super.validator.number().min(1).exists(TestModel, "id", true)
        });
    }
}