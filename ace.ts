import {program} from "commander";
import Knex from "knex";
import ora from "ora";
import os from "os";
import path from "path";
import KnexConfig from "@/config/database";
import {version} from "@/package.json";
import Chalk from "@/utils/Chalk";
import Str from "@/utils/Str";
import {ask, isNotEmpty} from "@/utils/utils";
import "@/bootstrap";

const commandExec = "ace";
const knex = Knex(KnexConfig);

program
    .name(commandExec)
    .version(version, "-v, --version", "Show the current version")
    .description(`${new Str().setValue(commandExec).toPascalCase()} for your commander${os.EOL}Author: Acacia Malaccensis <acacia.malaccensis@gmail.com>`)
    .addHelpText("after", [
        `${os.EOL}Examples:`,
        `$ bun ${commandExec} --help`,
        `$ bun ${commandExec} --version`,
        `$ bun ${commandExec} migrate:latest`
    ].join(`${os.EOL}  `));

program
    .command("db:seed")
    .description("Run database seeders")
    .action(async () => {
        const spinner = ora(new Chalk().setValue("Seeding...").info().show()).start();
        try {
            const logs = (await knex.seed.run()).flat();
            spinner.succeed("Seeding finished");

            if (logs.length > 0) logs.forEach((seeder: string) => spinner.succeed(path.basename(seeder)));
            else spinner.succeed("No seeders were run.");
        } catch (e) {
            spinner.fail(`Seeding failed : ${e.message}`);
        } finally {
            await knex.destroy();
            spinner.stop();
        }
    });

program
    .command("migrate:fresh")
    .description("Rollback all migrations and re-run migrations")
    .option("-f, --force", "Skip command confirmation.")
    .action(async (options: any) => {
        const bypass = isNotEmpty(options.force);

        let confirm = "Y";
        if (!bypass) confirm = await ask(
            new Chalk()
                .setValue("This will DROP ALL tables and re-run ALL migrations. Are you want to continue? (Y/N): ")
                .inline()
                .danger()
                .show()
        );

        if (confirm.toUpperCase() === "Y") {
            if (!bypass) console.log();

            const spinner = ora(
                new Chalk()
                    .setValue("Rollback...")
                    .info()
                    .show()
            ).start();
            try {
                await knex.migrate.rollback({}, true);
                spinner.succeed("Rolled back all migrations");

                const [batchNo, logs] = await knex.migrate.latest();
                spinner.succeed(`Batch ${batchNo} finished`);

                if (logs.length > 0) logs.forEach((migration: string) => spinner.succeed(migration));
                else spinner.succeed("No migrations were run.");
            } catch (e) {
                spinner.fail(`Migration failed : ${e.message}`);
            } finally {
                await knex.destroy();
                spinner.stop();
            }
        }
    });

program
    .command("migrate:latest")
    .description("Run latest migration")
    .action(async () => {
        const spinner = ora(
            new Chalk()
                .setValue("Migrating...")
                .info()
                .show()
        ).start();
        try {
            const [batchNo, logs] = await knex.migrate.latest();
            spinner.succeed(`Batch ${batchNo} finished`);

            if (logs.length > 0) logs.forEach((migration: string) => spinner.succeed(migration));
            else spinner.succeed("No migrations were run.");
        } catch (e) {
            spinner.fail(`Migration failed : ${e.message}`);
        } finally {
            await knex.destroy();
            spinner.stop();
        }
    });

program
    .command("migrate:rollback")
    .description("Rollback the latest migrations")
    .option("-f, --force", "Skip command confirmation.")
    .action(async (options: any) => {
        const bypass = isNotEmpty(options.force);

        let confirm = "Y";
        if (!bypass) confirm = await ask(
            new Chalk()
                .setValue("This will ROLLBACK latest migrations. Are you want to continue? (Y/N): ")
                .inline()
                .danger()
                .show()
        );

        if (confirm.toUpperCase() === "Y") {
            if (!bypass) console.log();

            const spinner = ora(
                new Chalk()
                    .setValue("Rollback...")
                    .info()
                    .show()
            ).start();
            try {
                const [batchNo, logs] = await knex.migrate.rollback();
                spinner.succeed(`Batch ${batchNo} finished`);

                if (logs.length > 0) logs.forEach((migration: string) => spinner.succeed(migration));
                else spinner.succeed("No migrations were rolled back.");
            } catch (e) {
                spinner.fail(`Rollback failed : ${e.message}`);
            } finally {
                await knex.destroy();
                spinner.stop();
            }
        }
    });

program
    .command("migrate:status")
    .description("List migrations status")
    .action(async () => {
        const spinner = ora(
            new Chalk()
                .setValue("Fetching...")
                .info()
                .show()
        ).start();
        try {
            const [completed, pending] = await knex.migrate.list();

            spinner.succeed("Completed Migrations :");
            if (completed.length > 0) completed.forEach((migration: {name: string}) => spinner.succeed(migration.name));
            else spinner.succeed("No migrations were completed.");

            console.log();

            spinner.succeed("Pending Migrations :");
            if (pending.length > 0) pending.forEach((migration: {file: string, directory: string}) => spinner.succeed(migration.file));
            else spinner.succeed("No migrations were pending.");
        } catch (e) {
            spinner.fail(`Fetching failed : ${e.message}`);
        } finally {
            await knex.destroy();
            spinner.stop();
        }
    });

program.parse();