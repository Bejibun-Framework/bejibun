import {defineValue} from "@bejibun/core";
import {errors} from "@vinejs/vine";
import {BunRequest, ErrorLike} from "bun";
import {ValidationError} from "objection";
import HttpMethodEnum from "@/app/enums/HttpMethodEnum";
import Response from "@/utils/Response";

export default class ExceptionHandler {
    public handle(
        error: ErrorLike |
            typeof ModelNotFoundException |
            errors.E_VALIDATION_ERROR |
            ValidationError
    ): globalThis.Response {
        if (error instanceof ModelNotFoundException) return Response
            .setMessage(error.message)
            .setStatus(error.code)
            .send();

        if (error instanceof errors.E_VALIDATION_ERROR) return Response
            .setMessage(error.messages[0].message)
            .setStatus(422)
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

    public route(request: BunRequest): globalThis.Response {
        if (request.method === HttpMethodEnum.Options) return Response
            .setMessage("What are you looking for doesn't exists.")
            .setStatus(204)
            .send();

        return Response
            .setMessage("What are you looking for doesn't exists.")
            .setStatus(404)
            .send();
    }
}