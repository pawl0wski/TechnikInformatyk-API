export default class EnvironmentConfig {
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
        return EnvironmentConfig._getBoolEnv("ENABLE_SNAPSHOT");
    }

    public static get snapshotPath() {
        return EnvironmentConfig._getStringEnv("SNAPSHOT_PATH");
    }

    public static get cacheEnabled() {
        return EnvironmentConfig._getBoolEnv("ENABLE_CACHE");
    }

    public static get serverPort() {
        return EnvironmentConfig._getNumberEnv("SERVER_PORT");
    }

    public static get databaseUser() {
        return EnvironmentConfig._getStringEnv("DB_USER");
    }

    public static get databasePassword() {
        return EnvironmentConfig._getStringEnv("DB_PASS");
    }

    public static get databaseName() {
        return EnvironmentConfig._getStringEnv("DB_DATABASE");
    }

    public static get databaseHost() {
        return EnvironmentConfig._getStringEnv("DB_HOST");
    }

    public static get databaseDriver() {
        return EnvironmentConfig._getStringEnv("DB_DRIVER");
    }

    public static get redisIP() {
        return EnvironmentConfig._getStringEnv("REDIS_IP");
    }

    public static get redisUsername() {
        return EnvironmentConfig._getStringEnv("REDIS_USER");
    }

    public static get redisPort() {
        return EnvironmentConfig._getNumberEnv("REDIS_PORT");
    }

    public static get redisPassword() {
        return EnvironmentConfig._getStringEnv("REDIS_PASS");
    }

    public static get redisAuthenticate() {
        return EnvironmentConfig._getBoolEnv("REDIS_AUTHENTICATE");
    }

    public static get redisPrefix() {
        return EnvironmentConfig._getStringEnv("REDIS_PREFIX");
    }

}
