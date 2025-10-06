export default class Response {
    protected data: any;
    protected message: string;
    protected status: number;

    public constructor() {
        this.data = null;
        this.message = "Success";
        this.status = 200;
    }

    public setData(data: any): Response {
        this.data = data;

        return this;
    }

    public setMessage(message: string): Response {
        this.message = message;

        return this;
    }

    public setStatus(status: number): Response {
        this.status = status;

        return this;
    }

    public send(): globalThis.Response {
        return globalThis.Response.json({
            data: this.data,
            message: this.message,
            status: this.status
        }, {
            status: this.status
        });
    }

    public stream(options: ResponseInit = {}): globalThis.Response {
        return new globalThis.Response(Bun.file(this.data), {
            ...options,
            status: this.status
        });
    }
}