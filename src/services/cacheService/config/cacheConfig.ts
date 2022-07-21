import EnvironmentConfig from "../../../config/environmentConfig";

export default class CacheConfig {
    public ip: string;
    public port: number;
    public prefix: string;
    public username?: string;
    public password?: string;

    static fromEnv(): CacheConfig {
        const cacheConfig = new CacheConfig();

        cacheConfig.ip = EnvironmentConfig.redisIP;
        cacheConfig.port = EnvironmentConfig.redisPort;
        cacheConfig.prefix = EnvironmentConfig.redisPrefix;
        cacheConfig.username = EnvironmentConfig.redisUsername;
        cacheConfig.password = EnvironmentConfig.redisPassword;

        return cacheConfig;
    }

    public get redisUrl(): string {
        return `redis://${this.username}:${this.password}@${this.ip}:${this.port}`;
    }
}
