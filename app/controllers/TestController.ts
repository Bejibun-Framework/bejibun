import {BunRequest} from "bun";
import BaseController from "@/app/controllers/BaseController";
import TestModel from "@/app/models/TestModel";
import TestValidator from "@/app/validators/TestValidator";

export default class TestController extends BaseController {
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