import HelloController from "@/app/controllers/HelloController";
import Router from "@/utils/Router";

export default Router.prefix("hello").group({
    "/": {
        GET: new HelloController().hello,
        PUT: new HelloController().hello
    },

    ":name": {
        GET: new HelloController().helloName
    }
});