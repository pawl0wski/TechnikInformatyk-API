import Database, { Privilege } from "../database/database";
import chalk from "chalk";

async function generateKeyCommand(str: string) {
    const database = Database.getInstance();
    if (str == "admin" || str == "client") {
        try {
            const generatedKey = await database.generateApiKey(Privilege[str]);
            console.log(
                `Your new ${str} key: ${chalk.green(generatedKey.key)}`
            );
        } catch (e) {
            console.log(chalk.red("Error while generating apiKey."));
            throw e;
        }
    } else {
        console.log(chalk.red("Type of key should be admin or client."));
    }
}

export default generateKeyCommand;
