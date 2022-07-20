export default class EnvironmentConfiguration {
    // Methods to get a value from env
    private static _getBoolEnv(envName: string): boolean {
        const env = process.env[envName];
        return env === "true" || env === "1" || env === "yes";
    }

    private static _getNumberEnv(envName: string): number {
        const env = process.env[envName];
        const parsedEnv = parseInt(env ?? "0");
        if (isNaN(parsedEnv)) return 0;
        return parsedEnv;
    }

    private static _getStringEnv(envName: string): string {
        const env = process.env[envName];
        return env ?? "";
    }

    // Public getters for services or repositories
    public static get snapshotEnabled() {
        return EnvironmentConfiguration._getBoolEnv("ENABLE_SNAPSHOT");
    }

    public static get snapshotPath() {
        return EnvironmentConfiguration._getStringEnv("SNAPSHOT_PATH");
    }

    public static get cacheEnabled() {
        return EnvironmentConfiguration._getBoolEnv("ENABLE_CACHE");
    }

    public static get serverPort() {
        return EnvironmentConfiguration._getNumberEnv("SERVER_PORT");
    }

    public static get databaseUser() {
        return EnvironmentConfiguration._getStringEnv("DB_USER");
    }

    public static get databasePassword() {
        return EnvironmentConfiguration._getStringEnv("DB_PASS");
    }

    public static get databaseName() {
        return EnvironmentConfiguration._getStringEnv("DB_DATABASE");
    }

    public static get databaseHost() {
        return EnvironmentConfiguration._getStringEnv("DB_HOST");
    }

    public static get databaseDriver() {
        return EnvironmentConfiguration._getStringEnv("DB_DRIVER");
    }
}
