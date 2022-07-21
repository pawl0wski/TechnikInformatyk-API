import { createClient, RedisClientType } from "redis";
import Database, { DatabaseI } from "../../database/database";
import CacheConfig from "./config/cacheConfig";

interface CacheServiceAdditionalOptions {
    redisClient?: RedisClientType;
    database?: DatabaseI;
}

export default class CacheService {
    private readonly _redisClient: RedisClientType;
    private readonly _database: DatabaseI;
    private readonly _redisPrefix: string;

    constructor(
        config: CacheConfig,
        additionalOptions: CacheServiceAdditionalOptions
    ) {
        const { redisUrl, prefix } = config;
        const { redisClient, database } = additionalOptions;
        this._redisClient =
            redisClient ??
            createClient({
                url: redisUrl,
            });
        this._database = database ?? Database.getInstance();
        this._redisPrefix = prefix;
    }

    public connectToRedis(): Promise<void> {
        return this._redisClient.connect();
    }

    private _generateCacheKey(args: {
        prefix?: string;
        type: string;
        checksum?: number;
    }): string {
        let { prefix, checksum } = args;
        const { type } = args;

        prefix ??= this._redisPrefix;
        checksum ??= this._database.checksum;
        return `${prefix}::${type}::${checksum}`;
    }

    public async getObjectFromCache(type: string): Promise<string | null> {
        const key = this._generateCacheKey({ type });

        const cacheData = await this._redisClient.get(key);
        return cacheData === null ? null : JSON.parse(cacheData);
    }

    public async saveObjectToCache(type: string, data: { [key: string]: any }) {
        const key = this._generateCacheKey({ type });

        await this._redisClient.set(key, JSON.stringify(data));
    }
}
