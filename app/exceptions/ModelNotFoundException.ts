export default class ModelNotFoundException extends Error {
    public code: string | undefined;

    public constructor(message?: string, code?: string) {
        super(message);
        this.name = "ModelNotFoundException";
        this.code = code;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ModelNotFoundException);
        }
    }
}