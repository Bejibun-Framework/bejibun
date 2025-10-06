import chalk from "chalk";
import os from "os";

export default class Chalk {
    protected value: string;
    protected clk: any;

    public constructor() {
        this.value = "";
    }

    public setValue(value: string): Chalk {
        this.value = `${value}${os.EOL}`;

        return this;
    }

    public bold(): Chalk {
        if (this.clk) this.clk = this.clk.bold;
        else this.clk = chalk.bold;

        return this;
    }

    public info(): Chalk {
        if (this.clk) this.clk = this.clk.hex("#0CCAF0");
        else this.clk = chalk.hex("#0CCAF0");

        return this;
    }

    public line(): void {
        console.log("-".repeat(process.stdout.columns));
    }

    public show(): string {
        return this.clk(this.value);
    }
}