import type {RedisPipeline} from "@bejibun/redis/types";
import BaseController from "@bejibun/core/bases/BaseController";
import Cache from "@bejibun/cache";
import Logger from "@bejibun/logger";
import Redis from "@bejibun/redis";
import TestModel from "@/app/models/TestModel";
import TestValidator from "@/app/validators/TestValidator";
import TestJob from "@/app/jobs/TestJob";

export default class TestController extends BaseController {
    @ApiDoc({
        description: "Redis",
        tags: ["Test"]
    })
    public async redis(): Promise<Response> {
        await Redis.set("redis", {hello: "world"});
        const redis = await Redis.get("redis");

        await Redis.connection("local").set("connection", "This is using custom connection.");
        const connection = await Redis.connection("local").get("connection");

        const pipeline = await Redis.pipeline((pipe: RedisPipeline) => {
            pipe.set("redis-pipeline-1", "This is redis pipeline 1");
            pipe.set("redis-pipeline-2", "This is redis pipeline 2");

            pipe.get("redis-pipeline-1");
            pipe.get("redis-pipeline-2");
        });

        const subscriber = await Redis.subscribe(
            "redis-subscribe",
            (message: string, channel: string) => {
                Logger.setContext(channel).debug(message);
            }
        );
        await Redis.publish("redis-subscribe", "Hai redis subscriber!");

        await Bun.sleep(500);

        await subscriber.unsubscribe();

        return super.response.setData({redis, connection, pipeline}).send();
    }

    @ApiDoc({
        description: "Cache",
        tags: ["Test"]
    })
    public async cache(): Promise<Response> {
        const remember = await Cache.remember("test", () => {
            return "Hello world";
        });

        const has = await Cache.has("test");

        const get = await Cache.get("test");

        const add = await Cache.add("test-add", "Lorem ipsum");
        const addValue = await Cache.get("test-add");

        const put = await Cache.put("test", "Hello bejibun");
        const putValue = await Cache.get("test");

        await Cache.forget("test");
        const forgetValue = await Cache.get("test");

        return super.response
            .setData({
                remember,
                has,
                get,
                add: {
                    status: add,
                    value: addValue
                },
                put: {
                    status: put,
                    value: putValue
                },
                forget: forgetValue
            })
            .send();
    }

    @ApiDoc({
        description: "Queue",
        tags: ["Test"]
    })
    public async queue(request: Bejibun.Request): Promise<Response> {
        await TestJob.dispatch(request.get("name")).send();

        return super.response.setData().send();
    }

    @ApiDoc({
        description: "Get test list",
        tags: ["Test"]
    })
    public async index(): Promise<Response> {
        const tests = await TestModel.all();

        return super.response.setData(tests).send();
    }

    @ApiDoc({
        description: "Show detail test",
        tags: ["Test"],
        request: {
            params: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "number"
                    }
                }
            ]
        }
    })
    public async show(request: Bejibun.Request): Promise<Response> {
        await request.validate(TestValidator.show);

        const test = await TestModel.findOrFail(request.integer("id"));

        return super.response.setData(test).send();
    }

    @ApiDoc({
        description: "Store test data",
        tags: ["Test"],
        request: {
            params: [
                {
                    name: "name",
                    in: "query",
                    required: true,
                    schema: {
                        type: "string"
                    }
                }
            ]
        }
    })
    public async store(request: Bejibun.Request): Promise<Response> {
        await request.validate(TestValidator.store);

        const test = await TestModel.create({
            name: request.get("name") as string
        });

        return super.response.setData(test).send();
    }

    @ApiDoc({
        description: "Update test data",
        tags: ["Test"],
        request: {
            params: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "number"
                    }
                },
                {
                    name: "name",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    }
                }
            ]
        }
    })
    public async update(request: Bejibun.Request): Promise<Response> {
        await request.validate(TestValidator.update);

        const test = await TestModel.find(request.integer("id")).update({
            name: request.get("name") as string
        });

        return super.response.setData(test).send();
    }

    @ApiDoc({
        description: "Destroy test data",
        tags: ["Test"],
        request: {
            params: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "number"
                    }
                }
            ]
        }
    })
    public async destroy(request: Bejibun.Request): Promise<Response> {
        await request.validate(TestValidator.destroy);

        const test = await TestModel.find(request.integer("id")).delete();

        return super.response.setData(test).send();
    }

    @ApiDoc({
        description: "Restore test data",
        tags: ["Test"],
        request: {
            params: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "number"
                    }
                }
            ]
        }
    })
    public async restore(request: Bejibun.Request): Promise<Response> {
        await request.validate(TestValidator.restore);

        const test = await TestModel.find(request.integer("id")).restore();

        return super.response.setData(test).send();
    }
}
