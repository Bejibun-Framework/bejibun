import Enum from "@bejibun/core/enum";
import CorsHeaderEnum from "@/app/enums/CorsHeaderEnum";
import HttpMethodEnum from "@/app/enums/HttpMethodEnum";
import corsConfig from "@/config/cors";

export const cors = (): Record<string, string> => {
    const headers: Record<string, string> = {
        "Access-Control-Allow-Origin": corsConfig.origin,
        "Access-Control-Allow-Headers": Array.isArray(corsConfig.allowedHeaders)
            ? corsConfig.allowedHeaders.join(", ")
            : Enum.setEnums(CorsHeaderEnum).toArray().map(value => value.value).join(", "),
        "Access-Control-Allow-Methods": Array.isArray(corsConfig.methods)
            ? corsConfig.methods.join(", ")
            : Enum.setEnums(HttpMethodEnum).toArray().map(value => value.value).join(", ")
    };

    if (corsConfig.exposedHeaders.length > 0) headers["Access-Control-Expose-Headers"] = corsConfig.exposedHeaders.join(", ");

    if (corsConfig.credentials) headers["Access-Control-Allow-Credentials"] = "true";

    if (corsConfig.maxAge) headers["Access-Control-Max-Age"] = corsConfig.maxAge.toString();

    return headers;
};
