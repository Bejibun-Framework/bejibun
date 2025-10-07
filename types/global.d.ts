import ModelNotFoundException from "@/app/exceptions/ModelNotFoundException";

declare global {
    var ModelNotFoundException: typeof ModelNotFoundException;
}

export {};