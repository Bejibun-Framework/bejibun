import {defineValue} from "@bejibun/utils";
import ModelNotFoundException from "@bejibun/core/exceptions/ModelNotFoundException";
import ValidatorException from "@bejibun/core/exceptions/ValidatorException";
import Response from "@bejibun/core/facades/Response";
import HttpMethodEnum from "@bejibun/utils/enums/HttpMethodEnum";
import {ValidationError} from "objection";

export default class ExceptionHandler {
    public handle(
        error: Bun.ErrorLike |
            typeof ModelNotFoundException |
            typeof ValidatorException |
            ValidationError
    ): globalThis.Response {
        if (
            error instanceof ModelNotFoundException ||
            error instanceof ValidatorException
        ) return Response
            .setMessage(error.message)
            .setStatus(error.code)
            .send();

        if (error instanceof ValidationError) return Response
            .setMessage(error.message)
            .setStatus(error.statusCode)
            .send();

        return Response
            .setMessage(defineValue(error.message, "Internal server error."))
            .setStatus(500)
            .send();
    }

    public route(request: Bun.BunRequest): globalThis.Response {
        return Response
            .setMessage("What are you looking for doesn't exists.")
            .setStatus(request.method === HttpMethodEnum.Options ? 204 : 404)
            .send();
    }
}