import BaseJob from "@bejibun/core/bases/BaseJob";
import Logger from "@bejibun/logger";

export default class TestJob extends BaseJob {
    /**
     * Execute the job.
     *
     * @var $arguments Array<any>
     */
    public async handle(args: Array<any>): Promise<void> {
        Logger.debug("Hello World!");
    }
}