import SnapshotService from "../services/snapshotService/snapshotService";
import chalk from "chalk";
import Database from "../database/database";

async function rebuildSnapshotCommand() {
    console.log("Rebuilding snapshot...");
    const db = Database.getInstance();
    await db.sync();
    await new SnapshotService({}).rebuild();
    console.log(chalk.green("Rebuild"));
}

export default rebuildSnapshotCommand;
