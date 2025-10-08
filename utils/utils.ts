import readline from "readline";
import CorsHeaderEnum from "@/app/enums/CorsHeaderEnum";
import CorsMethodEnum from "@/app/enums/CorsMethodEnum";
import corsConfig from "@/config/cors";
import Enum from "@/utils/Enum";

export const isEmpty = (value: any): boolean => {
    return (
        value === undefined ||
        value === null ||
        value === false ||
        value === 0 ||
        value === 0n ||
        (typeof value === "string" && value.trim() === "") ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0)
    );
};

export const isNotEmpty = (value: any): boolean => {
    return !isEmpty(value);
};

export const defineValue = (value: any, defaultValue: any = null): any => {
    if (isNotEmpty(value)) return value;

    return defaultValue;
};

export const ask = (question: string): Promise<string> => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => {
        return rl.question(question, (answer: string) => {
            rl.close();

            resolve(answer.trim());
        });
    });
};

export const cors = (): Record<string, string> => {
    const headers: Record<string, string> = {
        "Access-Control-Allow-Origin": corsConfig.origin,
        "Access-Control-Allow-Headers": Array.isArray(corsConfig.allowedHeaders)
            ? corsConfig.allowedHeaders.join(", ")
            : new Enum(CorsHeaderEnum).toArray().map(value => value.value).join(", "),
        "Access-Control-Allow-Methods": Array.isArray(corsConfig.methods)
            ? corsConfig.methods.join(", ")
            : new Enum(CorsMethodEnum).toArray().map(value => value.value).join(", ")
    };

    if (corsConfig.exposedHeaders.length > 0) headers["Access-Control-Expose-Headers"] = corsConfig.exposedHeaders.join(", ");

    if (corsConfig.credentials) headers["Access-Control-Allow-Credentials"] = "true";

    if (corsConfig.maxAge) headers["Access-Control-Max-Age"] = corsConfig.maxAge.toString();

    return headers;
};
