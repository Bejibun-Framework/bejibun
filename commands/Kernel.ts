import Schedule from "@bejibun/core/facades/Schedule";

export default class Kernel {
    public schedule(schedule: typeof Schedule): void {
        schedule.command("hello:world").everyMinute();
    }
}
