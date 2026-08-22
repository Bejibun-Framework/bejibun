import BaseController from "@bejibun/core/bases/BaseController";
import HelloValidator from "@/app/validators/HelloValidator";

export default class HelloController extends BaseController {
    @ApiDoc({
        description: "Hello",
        tags: ["Hello"]
    })
    public async hello(request: Bejibun.Request): Promise<Response> {
        return super.response
            .setData({
                message: "Hello, world!",
                method: request.method
            })
            .send();
    }

    @ApiDoc({
        description: "Hello with Name",
        tags: ["Hello"],
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
    public async helloName(request: Bejibun.Request): Promise<Response> {
        await request.validate(HelloValidator.helloName);

        return super.response
            .setData({
                message: `Hello, ${request.get("name")}!`
            })
            .send();
    }
}
