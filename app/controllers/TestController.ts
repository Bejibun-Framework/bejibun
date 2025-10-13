import BaseController from "@bejibun/core/bases/BaseController";
import Redis from "@bejibun/redis";
import {BunRequest} from "bun";
import TestModel from "@/app/models/TestModel";
import TestValidator from "@/app/validators/TestValidator";

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

    public async get(request: BunRequest): Promise<Response> {
        const tests = await TestModel.all();

        return super.response.setData(tests).send();
    }

    public async detail(request: BunRequest): Promise<Response> {
        const body = await super.parse(request);
        await super.validate(TestValidator.detail, body);

        const test = await TestModel.findOrFail(body.get("id") as number | string);

        return super.response.setData(test).send();
    }

    public async add(request: BunRequest): Promise<Response> {
        const body = await super.parse(request);
        await super.validate(TestValidator.add, body);

        const tests = await TestModel.create({
            name: body.get("name") as string
        });

        return super.response.setData(tests).send();
    }

    public async edit(request: BunRequest): Promise<Response> {
        const body = await super.parse(request);
        await super.validate(TestValidator.edit, body);

        const tests = await TestModel.find(body.get("id") as number | string)
            .update({
                name: body.get("name") as string
            });

        return super.response.setData(tests).send();
    }

    public async delete(request: BunRequest): Promise<Response> {
        const body = await super.parse(request);
        await super.validate(TestValidator.delete, body);

        const tests = await TestModel.find(body.get("id") as number | string).delete();

        return super.response.setData(tests).send();
    }

    public async restore(request: BunRequest): Promise<Response> {
        const body = await super.parse(request);
        await super.validate(TestValidator.restore, body);

        const tests = await TestModel.find(body.get("id") as number | string).restore();

        return super.response.setData(tests).send();
    }
}