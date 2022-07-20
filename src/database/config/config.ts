import EnvironmentConfiguration from "../../environmentConfiguration";

export default class DatabaseConfig {
    public user: string;
    public password: string;
    public host: string;
    public database: string;
    public driver: string;

    constructor(settings: {
        user?: string;
        password?: string;
        host?: string;
        database?: string;
        driver?: string;
    }) {
        const { user, password, host, database, driver } = settings;

        try {
            this.user = EnvironmentConfiguration.databaseUser || (user ?? "");
            this.password =
                EnvironmentConfiguration.databasePassword || (password ?? "");
            this.host = EnvironmentConfiguration.databaseHost || (host ?? "");
            this.database =
                EnvironmentConfiguration.databaseName || (database ?? "");
            this.driver =
                EnvironmentConfiguration.databaseDriver || (driver ?? "");
        } catch (e) {
            throw Error(
                "Can't initialize DatabaseConfig check your .env file."
            );
        }
    }

    public generateConnectionPath(): string {
        return `${this.driver}://${this.user}:${this.password}@${this.host}/${this.database}`;
    }
}
