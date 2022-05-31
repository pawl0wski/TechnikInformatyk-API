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
        this.user =
            settings.user == null ? process.env.DB_USER! : settings.user;
        this.password =
            settings.password == null
                ? process.env.DB_PASS!
                : settings.password;
        this.host =
            settings.host == null ? process.env.DB_HOST! : settings.host;
        this.database =
            settings.database == null
                ? process.env.DB_DATABASE!
                : settings.database;
        this.driver =
            settings.driver == null ? process.env.DB_DRIVER! : settings.driver;
    }

    public generateConnectionPath(): string {
        return `${this.driver}://${this.user}:${this.password}@${this.host}/${this.database}`;
    }
}
