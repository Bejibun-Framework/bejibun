import {DateTime} from "luxon";
import {QueryBuilder, ModelClass, QueryContext, Model} from "objection";

interface SoftDeleteQueryContext extends QueryContext {
    withTrashed?: boolean;
    onlyTrashed?: boolean;
}

export default class SoftDeletes<M extends Model, R = M[]> extends QueryBuilder<M, R> {
    private hasFilterApplied = false;

    constructor(modelClass: ModelClass<M>) {
        super(modelClass);

        this.onBuild((builder: QueryBuilder<M, R>) => {
            const context = this.context() as SoftDeleteQueryContext;

            if (!this.hasFilterApplied) {
                const tableName = this.modelClass().tableName;

                if (context.onlyTrashed) {
                    builder.whereNotNull(`${tableName}.${this.modelClass().deletedColumn}`);
                } else if (!context.withTrashed) {
                    builder.whereNull(`${tableName}.${this.modelClass().deletedColumn}`);
                }

                this.hasFilterApplied = true;
            }
        });
    }

    withTrashed(): this {
        return this.context({
            ...this.context(),
            withTrashed: true
        });
    }

    onlyTrashed(): this {
        return this.context({
            ...this.context(),
            onlyTrashed: true
        });
    }

    delete(): this {
        return this.update({
            [this.modelClass().deletedColumn]: DateTime.now()
        });
    }

    del(): this {
        return this.delete();
    }

    forceDelete(): this {
        return super.delete();
    }

    restore(): this {
        return this.onlyTrashed().update({
            [this.modelClass().deletedColumn]: null
        });
    }
}