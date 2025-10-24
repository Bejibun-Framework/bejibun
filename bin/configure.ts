import Logger from "@bejibun/logger";
import {isCommandExists} from "@bejibun/utils";

if (!isCommandExists("git")) {
    Logger.setContext("BEJIBUN").error("The git command doesn't exists.");
    process.exit(1);
}

if (!isCommandExists("bun")) {
    Logger.setContext("BEJIBUN").error("The bun command doesn't exists.");
    process.exit(1);
}

Bun.spawnSync(["git", "clone", "https://github.com/crenata/bejibun.git"], {
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit"
});

Bun.spawnSync(["bun", "install"], {
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit"
});