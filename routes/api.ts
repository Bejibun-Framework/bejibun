import hello from "@/routes/hello";
import test from "@/routes/test";
import Response from "@/utils/Response";
import Router from "@/utils/Router";

export default {
    "/*": new Response().setMessage("Not Found").setStatus(404).send(),

    ...new Router().prefix("api").group({
        ...hello,
        ...test
    })
};