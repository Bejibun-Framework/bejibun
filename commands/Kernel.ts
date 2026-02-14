import type Schedule from "@bejibun/core/facades/Schedule";

export default class Kernel {
    public handle(schedule: Schedule): void {
        schedule.command("hello:world").hourly();
    }
}