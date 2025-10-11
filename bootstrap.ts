import knex from "knex";
import {Model} from "objection";
import ModelNotFoundException from "@/app/exceptions/ModelNotFoundException";
import RouterInvalidException from "@/app/exceptions/RouterInvalidException";
import KnexConfig from "@/config/database";

global.ModelNotFoundException = ModelNotFoundException;
global.RouterInvalidException = RouterInvalidException;

Model.knex(knex(KnexConfig));