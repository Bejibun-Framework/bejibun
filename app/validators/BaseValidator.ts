import {SchemaTypes, VineValidator} from "@vinejs/vine";
import "@/utils/vine";

export type BaseValidatorType<T extends SchemaTypes = SchemaTypes> = VineValidator<SchemaTypes, Record<string, any> | undefined>;

export default class BaseValidator {}