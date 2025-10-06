import {errors} from "@vinejs/vine";
import {ErrorLike} from "bun";
import {ValidationError} from "objection";
import Response from "@/utils/Response";
import {defineValue} from "@/utils/utils";

export default class ExceptionHandler {
    public handle(error: ErrorLike): globalThis.Response {
        if (error instanceof ModelNotFoundException) return new Response()
            .setMessage(error.message)
            .setStatus(404)
            .send();

        if (error instanceof errors.E_VALIDATION_ERROR) return new Response()
            .setMessage(error.messages[0].message)
            .setStatus(422)
            .send();

        if (error instanceof ValidationError) return new Response()
            .setMessage(error.message)
            .setStatus(422)
            .send();

        return new Response()
            .setMessage(defineValue(error.message, "Internal server error."))
            .setStatus(500)
            .send();
    }
}