import Logger from "@bejibun/logger";

export default class HelloWorldCommand {
    /**
     * The name and signature of the console command.
     *
     * @var $signature string
     */
    protected $signature: string = "hello:world";

    /**
     * The console command description.
     *
     * @var $description string
     */
    protected $description: string = "Run hello world";

    /**
     * The options or optional flag of the console command.
     *
     * @var $options Array<Array<string>>
     */
    protected $options: Array<Array<string>> = [];

    /**
     * The arguments of the console command.
     *
     * @var $arguments Array<Array<string>>
     */
    protected $arguments: Array<Array<string>> = [];

    public async handle(options: any, args: Array<string>): Promise<void> {
        Logger.separator();
        Logger.debug("Hello World!");
        Logger.debug(`Options: ${JSON.stringify(options)}`);
        Logger.debug(`Arguments: ${JSON.stringify(args)}`);
        Logger.separator();
    }
}
