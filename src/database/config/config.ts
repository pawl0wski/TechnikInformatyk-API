export default class DatabaseConfig {
    public user: string;
    public password: string;
    public host: string;
    public database: string;
    public driver: string;

    constructor(settings: {
        user: string;
        password: string;
        host: string;
        database: string;
        driver: string;
    }) {
        const { user, password, host, database, driver } = settings;

        try {
            this.user = process.env.DB_USER || user;
            this.password = process.env.DB_PASS || password;
            this.host = process.env.DB_HOST || host;
            this.database = process.env.DB_DATABASE || database;
            this.driver = process.env.DB_DRIVER || driver;
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
