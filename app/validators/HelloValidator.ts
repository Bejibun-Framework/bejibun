import BaseValidator from "@bejibun/core/bases/BaseValidator";

export default class HelloValidator extends BaseValidator {
    public static get helloName(): Bejibun.Validator {
        return super.validator.create({
            name: super.validator.string()
        });
    }
}
