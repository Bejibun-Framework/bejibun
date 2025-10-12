import knex from "knex";
import {Model} from "objection";
import ModelNotFoundException from "@/app/exceptions/ModelNotFoundException";
import RedisException from "@/app/exceptions/RedisException";
import RouterInvalidException from "@/app/exceptions/RouterInvalidException";
import KnexConfig from "@/config/database";

global.ModelNotFoundException = ModelNotFoundException;
global.RedisException = RedisException;
global.RouterInvalidException = RouterInvalidException;

Model.knex(knex(KnexConfig));