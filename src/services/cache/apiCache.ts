import { createClient, RedisClientType } from "redis";
import Database, { DatabaseI } from "../../database/database";
import QuestionResponseI from "../../interfaces/questionResponse";
import ExamResponseI from "../../interfaces/examResponse";

interface ApiCacheConfiguration {
    redisClient?: RedisClientType;
    database?: DatabaseI;
    prefix: string;
}

export default class ApiCache {
    private redisClient: RedisClientType;
    private database: DatabaseI;
    private readonly redisPrefix: string;

    constructor(config: ApiCacheConfiguration) {
        const { redisClient, prefix, database } = config;
        // TODO: Load redis configuration from ENV
        this.redisClient = redisClient ?? createClient();
        this.database = database ?? Database.getInstance();
        this.redisPrefix = prefix;
    }

    public connectToRedis(): Promise<void> {
        return this.redisClient.connect();
    }

    private get databaseChecksum(): number {
        return this.database.checksum;
    }

    private generateCacheKey(args: {
        prefix?: string;
        type: string;
        checksum?: number;
    }): string {
        let { prefix, checksum } = args;
        const { type } = args;

        prefix ??= this.redisPrefix;
        checksum ??= this.databaseChecksum;
        return `${prefix}::${type}::${checksum}`;
    }

    private async getObjectFromCache(type: string): Promise<any | null> {
        const key = this.generateCacheKey({ type });

        const cacheData = await this.redisClient.get(key);
        return cacheData === null ? null : JSON.parse(cacheData);
    }

    private async saveObjectToCache(
        type: string,
        data: { [key: string]: any }
    ) {
        const key = this.generateCacheKey({ type });

        await this.redisClient.set(key, JSON.stringify(data));
    }

    getAdaptedExamsFromCache(): Promise<ExamResponseI[] | null> {
        return this.getObjectFromCache("exams");
    }

    getAdaptedQuestionsFromCache(): Promise<QuestionResponseI[] | null> {
        return this.getObjectFromCache("questions");
    }

    saveAdaptedExamsToCache(adaptedExams: ExamResponseI[]) {
        return this.saveObjectToCache("exams", adaptedExams);
    }

    saveAdaptedQuestionsToCache(adaptedQuestions: QuestionResponseI[]) {
        return this.saveObjectToCache("questions", adaptedQuestions);
    }
}
