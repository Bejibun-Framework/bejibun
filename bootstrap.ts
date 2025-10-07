import knex from "knex";
import {Model} from "objection";
import ModelNotFoundException from "@/app/exceptions/ModelNotFoundException";
import KnexConfig from "@/config/database";

global.ModelNotFoundException = ModelNotFoundException;

Model.knex(knex(KnexConfig));