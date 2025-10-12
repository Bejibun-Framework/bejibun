<div align="center">

![GitHub top language](https://img.shields.io/github/languages/top/crenata/bejibun)
![GitHub all releases](https://img.shields.io/github/downloads/crenata/bejibun/total)
![GitHub issues](https://img.shields.io/github/issues/crenata/bejibun)
![GitHub](https://img.shields.io/github/license/crenata/bejibun)
![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/crenata/bejibun?display_name=tag&include_prereleases)

</div>

# Framework for Bun
A typescript framework using Bun runtime. Designed for backend purposes.

## Tech Stacks
- [Bun](https://bun.com) - Runtime
- [Knex](https://knexjs.org) - Migrations & Seeders
- [Objection](https://vincit.github.io/objection.js) - Model
- [Vine](https://vinejs.dev) - Validator
- [Luxon](https://moment.github.io/luxon) - Date and Time
- [React](https://react.dev) - Homepage only

## Features

### Controllers
Logical processes

Example :

```ts
import {BunRequest} from "bun";
import BaseController from "@/app/controllers/BaseController";

export default class HelloController extends BaseController {
    public async hello(request: BunRequest): Promise<Response> {
        return super.response.setData({
            message: "Hello, world!",
            method: request.method
        }).send();
    }
}
```

### Exception Handler
Handle any incoming errors

Example :

```ts
import {errors} from "@vinejs/vine";
import {BunRequest, ErrorLike} from "bun";
import {ValidationError} from "objection";
import HttpMethodEnum from "@/app/enums/HttpMethodEnum";
import Response from "@/utils/Response";
import {defineValue} from "@/utils/utils";

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
```

### Middlewares
Handle any request before forwarding to controller

Example :

```ts
import {BunRequest} from "bun";

export default class TestMiddleware {
    public constructor() {
        //
    }

    public handle(handler: HandlerType): HandlerType {
        return async (request: BunRequest) => {
            console.log(`[TestMiddleware]: ${request.url}`);

            return handler(request);
        };
    }
}
```

Usage :

```ts
import TestMiddleware from "@/app/middlewares/TestMiddleware";
import LoggerMiddleware from "@/app/middlewares/LoggerMiddleware";
import Router from "@/utils/Router";

export default Router.prefix("test")
    .middleware(
        new TestMiddleware(),
        new LoggerMiddleware()
    )
    .group([
        Router.get("redis", "TestController@redis"),
        Router.get("get", "TestController@get"),
        Router.get("detail/:id", "TestController@detail"),
        Router.post("add", "TestController@add"),
        Router.post("edit", "TestController@edit"),
        Router.delete("delete/:id", "TestController@delete"),
        Router.get("restore/:id", "TestController@restore")
    ]);
```

### Validators
Validate any incoming requests

Example :

```ts
import vine from "@vinejs/vine";
import TestModel from "@/app/models/TestModel";
import BaseValidator from "@/app/validators/BaseValidator";

export default class TestValidator extends BaseValidator {
    public static get detail(): ValidatorType {
        return vine.compile(
            vine.object({
                id: vine.number().min(1).exists(TestModel, "id")
            })
        );
    }

    public static get add(): ValidatorType {
        return vine.compile(
            vine.object({
                name: vine.string()
            })
        );
    }

    public static get edit(): ValidatorType {
        return vine.compile(
            vine.object({
                id: vine.number().min(1).exists(TestModel, "id"),
                name: vine.string()
            })
        );
    }

    public static get delete(): ValidatorType {
        return vine.compile(
            vine.object({
                id: vine.number().min(1).exists(TestModel, "id")
            })
        );
    }

    public static get restore(): ValidatorType {
        return vine.compile(
            vine.object({
                id: vine.number().min(1).exists(TestModel, "id", true)
            })
        );
    }
}
```

Usage :

```ts
import {BunRequest} from "bun";
import BaseController from "@/app/controllers/BaseController";
import TestModel from "@/app/models/TestModel";
import TestValidator from "@/app/validators/TestValidator";

export default class TestController extends BaseController {
    public async detail(request: BunRequest): Promise<Response> {
        const body = await super.parse(request);
        await super.validate(TestValidator.detail, body);

        const test = await TestModel.findOrFail(body.get("id") as number | string);

        return super.response.setData(test).send();
    }
}
```

### Models
Database table model

Example :

```ts
import {DateTime} from "luxon";
import BaseModel, {BaseColumns} from "@/app/models/BaseModel";

export interface TestColumns extends BaseColumns {
    name: string;
}

export default class TestModel extends BaseModel implements TestColumns {
    public static tableName: string = "tests";
    public static idColumn: string = "id";

    declare id: bigint;
    declare name: string;
    declare created_at: DateTime | string;
    declare updated_at: DateTime | string;
    declare deleted_at: DateTime | string | null;
}
```

#### Fetch All
Example :

```ts
import {BunRequest} from "bun";
import BaseController from "@/app/controllers/BaseController";
import TestModel from "@/app/models/TestModel";

export default class TestController extends BaseController {
    public async get(request: BunRequest): Promise<Response> {
        const tests = await TestModel.all();

        return super.response.setData(tests).send();
    }
}
```

#### Find or Fail
Example :

```ts
import {BunRequest} from "bun";
import BaseController from "@/app/controllers/BaseController";
import TestModel from "@/app/models/TestModel";
import TestValidator from "@/app/validators/TestValidator";

export default class TestController extends BaseController {
    public async detail(request: BunRequest): Promise<Response> {
        const body = await super.parse(request);
        await super.validate(TestValidator.detail, body);

        const test = await TestModel.findOrFail(body.get("id") as number | string);

        return super.response.setData(test).send();
    }
}
```

#### Create
Example :

```ts
import {BunRequest} from "bun";
import BaseController from "@/app/controllers/BaseController";
import TestModel from "@/app/models/TestModel";
import TestValidator from "@/app/validators/TestValidator";

export default class TestController extends BaseController {
    public async add(request: BunRequest): Promise<Response> {
        const body = await super.parse(request);
        await super.validate(TestValidator.add, body);

        const tests = await TestModel.create({
            name: body.get("name") as string
        });

        return super.response.setData(tests).send();
    }
}
```

#### Update
Example :

```ts
import {BunRequest} from "bun";
import BaseController from "@/app/controllers/BaseController";
import TestModel from "@/app/models/TestModel";
import TestValidator from "@/app/validators/TestValidator";

export default class TestController extends BaseController {
    public async edit(request: BunRequest): Promise<Response> {
        const body = await super.parse(request);
        await super.validate(TestValidator.edit, body);

        const tests = await TestModel.find(body.get("id") as number | string)
            .update({
                name: body.get("name") as string
            });

        return super.response.setData(tests).send();
    }
}
```

#### Soft Delete
Example :

```ts
import {BunRequest} from "bun";
import BaseController from "@/app/controllers/BaseController";
import TestModel from "@/app/models/TestModel";
import TestValidator from "@/app/validators/TestValidator";

export default class TestController extends BaseController {
    public async delete(request: BunRequest): Promise<Response> {
        const body = await super.parse(request);
        await super.validate(TestValidator.delete, body);

        const tests = await TestModel.find(body.get("id") as number | string).delete();

        return super.response.setData(tests).send();
    }
}
```

#### Force Delete
Example :

```ts
import {BunRequest} from "bun";
import BaseController from "@/app/controllers/BaseController";
import TestModel from "@/app/models/TestModel";
import TestValidator from "@/app/validators/TestValidator";

export default class TestController extends BaseController {
    public async delete(request: BunRequest): Promise<Response> {
        const body = await super.parse(request);
        await super.validate(TestValidator.delete, body);

        const tests = await TestModel.find(body.get("id") as number | string).forceDelete();

        return super.response.setData(tests).send();
    }
}
```

#### With Trashed
Example :

```ts
import {BunRequest} from "bun";
import BaseController from "@/app/controllers/BaseController";
import TestModel from "@/app/models/TestModel";

export default class TestController extends BaseController {
    public async get(request: BunRequest): Promise<Response> {
        const tests = await TestModel.withTrashed();

        return super.response.setData(tests).send();
    }
}
```

#### Only Trashed
Example :

```ts
import {BunRequest} from "bun";
import BaseController from "@/app/controllers/BaseController";
import TestModel from "@/app/models/TestModel";

export default class TestController extends BaseController {
    public async get(request: BunRequest): Promise<Response> {
        const tests = await TestModel.onlyTrashed();

        return super.response.setData(tests).send();
    }
}
```

#### Restore
Example :

```ts
import {BunRequest} from "bun";
import BaseController from "@/app/controllers/BaseController";
import TestModel from "@/app/models/TestModel";

export default class TestController extends BaseController {
    public async restore(request: BunRequest): Promise<Response> {
        const body = await super.parse(request);
        await super.validate(TestValidator.restore, body);

        const tests = await TestModel.find(body.get("id") as number | string).restore();

        return super.response.setData(tests).send();
    }
}
```

### Database

#### Migrations
Example :

```ts
import type {Knex} from "knex";
import TestModel from "@/app/models/TestModel";

export function up(knex: Knex): void {
    return knex.schema.createTable(TestModel.table, (table: Knex.TableBuilder) => {
        table.bigIncrements("id");
        table.string("name");
        table.timestamps(true, true);
        table.timestamp("deleted_at");
    });
}

export function down(knex: Knex): void {
    return knex.schema.dropTable(TestModel.table);
}
```

#### Seeders
Example :

```ts
import type {Knex} from "knex";
import TestModel from "@/app/models/TestModel";

export async function seed(knex: Knex): Promise<void> {
    for (const name of ["Name 1", "Name 2", "Name 3"]) {
        await TestModel.query(knex).insert({
            name: name
        });
    }
}
```

### Public
For public assets

### Resources
- Views

### Bootstrap
Any startup loads

At this time used for :
- Init model connection
- Declare custom exception

Example :

```ts
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
```

### Redis
Example :

```ts
import {BunRequest} from "bun";
import BaseController from "@/app/controllers/BaseController";
import Redis from "@/utils/Redis";

export default class TestController extends BaseController {
    public async redis(request: BunRequest): Promise<Response> {
        await Redis.set("redis", {hello: "world"});
        const redis = await Redis.get("redis");

        const pipeline = await Redis.pipeline((pipe: RedisPipeline) => {
            pipe.set("redis-pipeline-1", "This is redis pipeline 1");
            pipe.set("redis-pipeline-2", "This is redis pipeline 2");

            pipe.get("redis-pipeline-1");
            pipe.get("redis-pipeline-2");
        });

        const subscriber = await Redis.subscribe("redis-subscribe", (message: string, channel: string) => {
            console.log(`[${channel}]: ${message}`);
        });
        await Redis.publish("redis-subscribe", "Hai redis subscriber!");
        setTimeout(async () => {
            await subscriber.unsubscribe();
        }, 500);

        return super.response.setData({redis, pipeline}).send();
    }
}
```

### Ace
Any commands for development

```bash
Usage: ace [options] [command]

Ace for your commander
Author: Acacia Malaccensis <acacia.malaccensis@gmail.com>

Options:
  -v, --version            Show the current version
  -h, --help               display help for command

Commands:
  db:seed                  Run database seeders
  migrate:fresh [options]  Rollback all migrations and re-run migrations
  migrate:latest           Run latest migration
  migrate:rollback         Rollback the latest migrations
  migrate:status           List migrations status
  help [command]           display help for command

Examples:
  $ bun ace --help
  $ bun ace --version
  $ bun ace migrate:latest
```

## Usage

### Installation
If you don't have bun installed :

```bash
# Linux / Mac OS
curl -fsSL https://bun.sh/install | bash

# Windows
powershell -c "irm bun.sh/install.ps1 | iex"
```
Install project dependencies.

```bash
bun install
```

### Available Commands
To see list of available commands, run.

```bash
bun ace
bun ace help
bun ace --h
bun ace --help
```

To see help of specific command, run :

```bash
bun ace help migrate:latest
bun ace migrate:latest --h
bun ace migrate:latest --help
```

### Database

#### Migrations
To fresh or drop all table and re-run the migrations, run :

```bash
bun ace migrate:fresh
```

Example :

```bash
This will DROP ALL tables and re-run ALL migrations. Are you want to continue? (Y/N): Y

✔ Rolled back all migrations
✔ Batch 1 finished
✔ 20250929_000001_tests.ts
```

To migrate the migrations, run :

```bash
bun ace migrate:latest
```

Example :

```bash
✔ Batch 1 finished
✔ 20250929_000001_tests.ts
```

To rollback the migrations, run :

```bash
bun ace migrate:rollback
```

Example :

```bash
This will ROLLBACK latest migrations. Are you want to continue? (Y/N): Y

✔ Batch 1 finished
✔ 20250929_000001_tests.ts
```

To see migrations status, run :

```bash
bun ace migrate:status
```

Example :

```bash
✔ Completed Migrations :
✔ No migrations were completed.

✔ Pending Migrations :
✔ 20250929_000001_tests.ts
```

#### Seeders
To execute seeder, run :

```bash
bun ace db:seed
```

Example :

```bash
✔ Seeding finished
✔ 20250929_000001_seeder_test.ts
```

### Run the Project
To run the project, run :

```bash
# Development Mode
bun dev

# Production Mode
bun start
```

## Upcoming Features
- [ ] Authentication
- [ ] Unit Tests
- [ ] Mail Service
- [ ] Maintenance Mode (Up and Down)
- [ ] Job Dispatch / Background Tasks
- [ ] Rate Limiter
- [ ] Cache (Redis)
  
## Backlog
- [ ] Import Excel
- [ ] Export Excel
- [ ] Export PDF
- [ ] CSRF/XSS Protection

## Contributors
- [Acacia Malaccensis](mailto:acacia.malaccensis@gmail.com)