import {errors} from "@vinejs/vine";
import {BunRequest, ErrorLike} from "bun";
import {ValidationError} from "objection";
import CorsMethodEnum from "@/app/enums/CorsMethodEnum";
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

    public route(request: BunRequest): globalThis.Response {
        if (request.method === CorsMethodEnum.Options) return new Response()
            .setMessage("What are you looking for doesn't exists.")
            .setStatus(204)
            .send();

        new Response()
            .setMessage("What are you looking for doesn't exists.")
            .setStatus(404)
            .send();
    }
}