import type Schedule from "@bejibun/core/facades/Schedule";

export default class Kernel {
    public schedule(schedule: Schedule): void {
        schedule.command("hello:world").everyMinute();
    }
}