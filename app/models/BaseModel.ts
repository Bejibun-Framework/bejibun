import {defineValue, isEmpty} from "@bejibun/core";
import Str from "@bejibun/core/str";
import {DateTime} from "luxon";
import {
    Constructor,
    Model,
    ModelOptions,
    QueryBuilder,
    QueryBuilderType,
    QueryContext,
    TransactionOrKnex
} from "objection";
import {relative, sep} from "path";
import {fileURLToPath} from "url";
import SoftDeletes from "@/utils/SoftDeletes";

export interface BaseColumns {
    id: bigint | number;
    created_at: DateTime | string;
    updated_at: DateTime | string;
    deleted_at: DateTime | string | null;
}

class BunQueryBuilder<M extends Model, R = M[]> extends SoftDeletes<M, R> {
    async update(payload: Partial<M>): Promise<M[]> {
        const cloneQuery: QueryBuilder<M, R> = (this as QueryBuilder<M, R>).clone();

        const beforeRows: any = await cloneQuery;

        if (isEmpty(beforeRows)) return defineValue(beforeRows);

        await super.update(payload);

        return cloneQuery;
    }
}

export default class BaseModel extends Model implements BaseColumns {
    public static tableName: string;
    public static idColumn: string;
    public static deletedColumn: string = "deleted_at";

    public static QueryBuilder = BunQueryBuilder;

    declare id: number | bigint;
    declare created_at: DateTime | string;
    declare updated_at: DateTime | string;
    declare deleted_at: DateTime | string | null;

    public static get namespace(): string {
        const filePath = fileURLToPath(import.meta.url);
        const appRoot = process.cwd();
        const rel = relative(appRoot, filePath);
        const withoutExt = rel.replace(/\.[tj]s$/, "");
        const namespaces = withoutExt.split(sep);
        namespaces.pop();
        namespaces.push(this.name);

        return namespaces.map(part => Str.toPascalCase(part)).join("/");
    }

    $beforeInsert(queryContext: QueryContext): Promise<any> | void {
        const now = DateTime.now();
        this.created_at = now;
        this.updated_at = now;
    }

    $beforeUpdate(opt: ModelOptions, queryContext: QueryContext): Promise<any> | void {
        this.updated_at = DateTime.now();
    }

    public static query<T extends Model>(this: Constructor<T>, trxOrKnex?: TransactionOrKnex): QueryBuilderType<T> {
        return super.query(trxOrKnex);
    };

    public static withTrashed<T extends Model>(this: T): QueryBuilderType<T> {
        return this.query<T>().withTrashed();
    }

    public static onlyTrashed<T extends Model>(this: T): QueryBuilderType<T> {
        return this.query<T>().onlyTrashed();
    }

    public static all<T extends Model>(this: T): QueryBuilderType<T> {
        return this.query<T>().select();
    }

    public static create<T extends Model>(this: T, payload: Record<string, any>): QueryBuilderType<T> {
        return this.query<T>().insert(payload);
    }

    public static find<T extends Model>(this: T, id: bigint | number | string): QueryBuilderType<T> {
        return this.query<T>().findById(id);
    }

    public static async findOrFail<T extends Model>(this: T, id: bigint | number | string): Promise<T> {
        const result = await this.find(id);

        if (isEmpty(result)) throw new ModelNotFoundException(`[ModelNotFoundException]: No query results for model [${this.namespace}] [${id}].`);

        return result;
    }
}