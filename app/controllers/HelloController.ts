import type {BunRequest} from "bun";
import BaseController from "@bejibun/core/bases/BaseController";

export default class HelloController extends BaseController {
    public async hello(request: BunRequest): Promise<Response> {
        return super.response.setData({
            message: "Hello, world!",
            method: request.method
        }).send();
    }

    public async helloName(request: BunRequest): Promise<Response> {
        const body = await super.parse(request);

        return super.response.setData({
            message: `Hello, ${body.name}!`,
        }).send();
    }
}