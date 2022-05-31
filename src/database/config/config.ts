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
        try {
            this.user = process.env.DB_USER || settings.user!;
            this.password = process.env.DB_PASS || settings.password!;
            this.host = process.env.DB_HOST || settings.host!;
            this.database = process.env.DB_DATABASE || settings.database!;
            this.driver = process.env.DB_DRIVER || settings.driver!;
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
