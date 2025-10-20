import ExceptionHandler from "@bejibun/core/exceptions/ExceptionHandler";

export default class Handler extends ExceptionHandler {
    public handle(error: any): globalThis.Response {
        return super.handle(error);
    }
}