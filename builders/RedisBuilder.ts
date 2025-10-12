import {RedisClient, RedisOptions} from "bun";
import {EventEmitter} from "events";
import config from "@/config/redis";
import {defineValue, isEmpty, isNotEmpty} from "@/utils/utils";

export default class RedisBuilder {
    private static clients: Record<string, RedisClient> = {};
    private static emitter = new EventEmitter();

    public static connection(name: string): Record<string, Function> {
        return {
            del: (key: RedisClient.KeyLike) => this.del(key, name),
            get: (key: RedisClient.KeyLike) => this.get(key, name),
            pipeline: (fn: (pipe: RedisPipeline) => void) => this.pipeline(fn, name),
            publish: (channel: string, message: any) => this.publish(channel, message, name),
            set: (key: RedisClient.KeyLike, value: any, ttl?: number) => this.set(key, value, ttl, name),
            subscribe: (channel: string, listener: RedisClient.StringPubSubListener) => this.subscribe(channel, listener, name),
        };
    }

    public static async connect(name?: string): Promise<RedisClient> {
        const client = this.getClient(name);
        await client.connect();
        console.log(`[Redis]: Connected manually to "${defineValue(name, "default")}" connection.`);
        this.emitter.emit("connect", defineValue(name, "default"));

        return client;
    }

    public static async disconnect(name?: string): Promise<void> {
        if (isNotEmpty(name)) {
            const client = this.clients[name as string];

            if (isNotEmpty(client)) {
                await client.close();
                delete this.clients[name as string];
                console.log(`[Redis]: Disconnected manually from "${name}" connection.`);
            }
        } else {
            for (const [connectionName, client] of Object.entries(this.clients)) {
                await client.close();
                console.log(`[Redis]: Disconnected manually from "${connectionName}" connection.`);
            }

            this.clients = {};
        }
    }

    public static async get(key: RedisClient.KeyLike, connection?: string): Promise<any> {
        const response = await this.getClient(connection).get(key);

        return this.deserialize(response);
    }

    public static async set(key: RedisClient.KeyLike, value: any, ttl?: number, connection?: string): Promise<number | "OK"> {
        const client = this.getClient(connection);
        const serialized = this.serialize(value);

        if (ttl) return await client.expire(key, ttl);

        return await client.set(key, serialized);
    }

    public static async del(key: RedisClient.KeyLike, connection?: string): Promise<number> {
        return await this.getClient(connection).del(key);
    }

    public static async publish(channel: string, message: any, connection?: string): Promise<number> {
        const serialized = this.serialize(message);

        return await this.getClient(connection).publish(channel, serialized);
    }

    public static async subscribe(channel: string, listener: RedisClient.StringPubSubListener, connection?: string): Promise<RedisSubscribe> {
        const cfg = this.getConfig(connection);
        const client = this.createClient(config.default, cfg);
        this.clients[channel] = client;

        await client.subscribe(channel, (message: string, channel: string) => listener(this.deserialize(message), channel));
        console.log(`[Redis]: Subscribed to "${channel}" channel.`);

        const unsubscribe = async () => {
            await client.unsubscribe(channel);
            console.log(`[Redis]: Unsubscribed from "${channel}" channel.`);
            await client.close();

            return true;
        };

        return {
            client,
            unsubscribe: unsubscribe
        };
    }

    public static async pipeline(fn: (pipe: RedisPipeline) => void, connection?: string) {
        const client = this.getClient(connection);
        const ops: Array<Promise<any>> = [];

        const pipe: RedisPipeline = {
            del: (key: RedisClient.KeyLike): void => {
                ops.push(client.del(key));
            },
            get: (key: RedisClient.KeyLike): void => {
                ops.push(client.get(key));
            },
            set: (key: RedisClient.KeyLike, value: any, ttl?: number): void => {
                const serialized = this.serialize(value);

                if (isNotEmpty(ttl)) ops.push(client.expire(key, ttl as number));

                ops.push(client.set(key, serialized));
            }
        };

        fn(pipe);

        const results = await Promise.all(ops);

        return results.map((result: any) => this.deserialize(result));
    }

    public static on(event: "connect" | "disconnect" | "error", listener: (...args: Array<any>) => void): void {
        this.emitter.on(event, listener);
    }

    public static off(event: "connect" | "disconnect" | "error", listener: (...args: Array<any>) => void): void {
        this.emitter.off(event, listener);
    }

    private static buildUrl(cfg: RedisConfig): string {
        const url = new URL(`redis://${cfg.host}:${cfg.port}`);

        if (isNotEmpty(cfg.password)) url.password = cfg.password as string;
        if (isNotEmpty(cfg.database)) url.pathname = `/${cfg.database}`;

        return url.toString();
    }

    private static createClient(name: string, cfg: RedisConfig): RedisClient {
        const url = this.buildUrl(cfg);
        const client = new RedisClient(url, this.getOptions(cfg));

        client.onconnect = () => {
            console.log(`[Redis]: Connected to "${name}" connection.`);
            this.emitter.emit("connect", name);
        };

        client.onclose = (error: Error) => {
            console.warn(`[Redis]: Disconnected from "${name}" connection.`, error.message);
            this.emitter.emit("disconnect", name, error);
        };

        return client;
    }

    private static getOptions(cfg: RedisConfig): RedisOptions {
        return {
            autoReconnect: true,
            maxRetries: cfg.maxRetries
        };
    }

    private static getConfig(name?: string): RedisConfig {
        const connectionName = defineValue(name, config.default);
        const connection = config.connections[connectionName];

        if (isEmpty(connection)) throw new RedisException(`[Redis]: Connection "${connectionName}" not found.`);

        return connection;
    }

    private static getClient(name?: string): RedisClient {
        const connectionName = defineValue(name, config.default);

        this.ensureExitHooks();

        if (isEmpty(this.clients[connectionName])) {
            const cfg = this.getConfig(connectionName);
            this.clients[connectionName] = this.createClient(connectionName, cfg);
        }

        return this.clients[connectionName];
    }

    private static serialize(value: any): string {
        if (isEmpty(value)) return "";
        if (typeof value === "object") return JSON.stringify(value);
        if (typeof value === "number" || typeof value === "boolean") return String(value);

        return value;
    }

    private static deserialize(value?: string | null): any {
        if (isEmpty(value)) return null;

        try {
            return JSON.parse(value as string);
        } catch (error) {
            return value;
        }
    }

    private static ensureExitHooks(): void {
        this.setupExitHooks();
    }

    private static setupExitHooks = ((): Function => {
        let initialized = false;

        return (): void => {
            if (initialized) return;

            initialized = true;

            const handleExit = async (signal?: string): Promise<void> => {
                try {
                    await RedisBuilder.disconnect();
                    console.log(`[Redis]: Disconnected on "${defineValue(signal, "exit")}".`);
                } catch (error) {
                    console.error("[Redis]: Error during disconnect.", error.message);
                } finally {
                    process.exit(0);
                }
            };

            process.on("exit", async (): Promise<void> => {
                await handleExit();
            });
            process.on("SIGINT", async (): Promise<void> => {
                await handleExit("SIGINT");
            });
            process.on("SIGTERM", async (): Promise<void> => {
                await handleExit("SIGTERM");
            });
        };
    })();
}