import type {ValidatorType} from "@bejibun/core/types/ValidatorType";
import BaseValidator from "@bejibun/core/bases/BaseValidator";

export default class HelloValidator extends BaseValidator {
    public static get helloName(): ValidatorType {
        return super.validator.create({
            name: super.validator.string()
        });
    }
}