import BaseJob from "@bejibun/core/bases/BaseJob";
import Logger from "@bejibun/logger";

export default class TestJob extends BaseJob {
    /**
     * Execute the job.
     *
     * @var $arguments Array<any>
     */
    public async handle(args: Array<any>): Promise<void> {
        for (const arg of args) {
            Logger.debug(`Hello ${arg}!`);
        }
    }
}