import type {RedisPipeline} from "@bejibun/redis/types";
import BaseController from "@bejibun/core/bases/BaseController";
import Cache from "@bejibun/cache";
import Logger from "@bejibun/logger";
import Redis from "@bejibun/redis";
import TestModel from "@/app/models/TestModel";
import TestValidator from "@/app/validators/TestValidator";
import TestJob from "@/app/jobs/TestJob";

export default class TestController extends BaseController {
    public async redis(request: Bun.BunRequest): Promise<Response> {
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

        const subscriber = await Redis.subscribe("redis-subscribe", (message: string, channel: string) => {
            Logger.setContext(channel).debug(message);
        });
        await Redis.publish("redis-subscribe", "Hai redis subscriber!");

        await Bun.sleep(500);

        await subscriber.unsubscribe();

        return super.response.setData({redis, connection, pipeline}).send();
    }

    public async cache(request: Bun.BunRequest): Promise<Response> {
        const remember = await Cache.remember("test", () => {
            return "Hello world"
        });

        const has = await Cache.has("test");

        const get = await Cache.get("test");

        const add = await Cache.add("test-add", "Lorem ipsum");
        const addValue = await Cache.get("test-add");

        const put = await Cache.put("test", "Hello bejibun");
        const putValue = await Cache.get("test");

        await Cache.forget("test");
        const forgetValue = await Cache.get("test");

        return super.response.setData({
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
        }).send();
    }

    public async queue(request: Bun.BunRequest): Promise<Response> {
        const body = await super.parse(request);

        await TestJob.dispatch(body.name).send();

        return super.response.setData().send();
    }

    public async get(request: Bun.BunRequest): Promise<Response> {
        const tests = await TestModel.all();

        return super.response.setData(tests).send();
    }

    public async detail(request: Bun.BunRequest): Promise<Response> {
        const body = await super.parse(request);
        await super.validate(TestValidator.detail, body);

        const test = await TestModel.findOrFail(body.id as number | string);

        return super.response.setData(test).send();
    }

    public async add(request: Bun.BunRequest): Promise<Response> {
        const body = await super.parse(request);
        await super.validate(TestValidator.add, body);

        const tests = await TestModel.create({
            name: body.name as string
        });

        return super.response.setData(tests).send();
    }

    public async edit(request: Bun.BunRequest): Promise<Response> {
        const body = await super.parse(request);
        await super.validate(TestValidator.edit, body);

        const tests = await TestModel.find(body.id as number | string)
            .update({
                name: body.name as string
            });

        return super.response.setData(tests).send();
    }

    public async delete(request: Bun.BunRequest): Promise<Response> {
        const body = await super.parse(request);
        await super.validate(TestValidator.delete, body);

        const tests = await TestModel.find(body.id as number | string).delete();

        return super.response.setData(tests).send();
    }

    public async restore(request: Bun.BunRequest): Promise<Response> {
        const body = await super.parse(request);
        await super.validate(TestValidator.restore, body);

        const tests = await TestModel.find(body.id as number | string).restore();

        return super.response.setData(tests).send();
    }
}