import {BunRequest} from "bun";
import {SchemaTypes, VineValidator} from "@vinejs/vine";
import ModelNotFoundException from "@/app/exceptions/ModelNotFoundException";
import RouterInvalidException from "@/app/exceptions/RouterInvalidException";

declare global {
    type HandlerType = (request: BunRequest) => Promise<Response>;
    type RouterGroup = Record<string, Record<string, HandlerType>>;
    type ResourceAction = "index" | "store" | "show" | "update" | "destroy";

    type ValidatorType<T extends SchemaTypes = SchemaTypes> = VineValidator<SchemaTypes, Record<string, any> | undefined>;

    var ModelNotFoundException: typeof ModelNotFoundException;
    var RouterInvalidException: typeof RouterInvalidException;
}

export {};