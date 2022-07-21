import Database from "../database/database";
import ApiKey from "../database/models/apiKey.model";
import chalk from "chalk";

export default async function showKey() {
    console.log("Getting all api keys...");

    const db = Database.getInstance();
    await db.sync();

    for (const key of await ApiKey.findAll()) {
        console.log(
            `key: ${key.key} privilege: ${
                key.privilege === "admin"
                    ? chalk.red("admin")
                    : chalk.green("client")
            }`
        );
    }
}
