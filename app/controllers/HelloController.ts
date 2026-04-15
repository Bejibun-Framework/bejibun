import BaseController from "@bejibun/core/bases/BaseController";
import HelloValidator from "@/app/validators/HelloValidator";

export default class HelloController extends BaseController {
    @ApiDoc({
        description: "Hello"
    })
    public async hello(request: Bun.BunRequest): Promise<Response> {
        return super.response.setData({
            message: "Hello, world!",
            method: request.method
        }).send();
    }

    @ApiDoc({
        description: "Hello with Name",
        request: {
            params: [
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
    public async helloName(request: Bun.BunRequest): Promise<Response> {
        const body = await super.parse(request);
        await super.validate(HelloValidator.helloName, body);

        return super.response.setData({
            message: `Hello, ${body.name}!`,
        }).send();
    }
}