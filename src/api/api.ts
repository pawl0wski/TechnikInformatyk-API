import express from "express";
import getExams from "../routes/api/getExams";
import getQuestions from "../routes/api/getQuestions";
import getPing from "../routes/api/getPing";
import getImage from "../routes/api/getImage";
import getDatabaseVersion from "../routes/api/getDatabaseVersion";
import getImagesSnapshot from "../routes/api/getImagesSnapshot";
import ExamsAdapter, { AdaptedExam } from "./adapters/examsAdapter";
import Exam from "../database/models/exam.model";
import QuestionsAdapter, { AdaptedQuestion } from "./adapters/questionsAdapter";
import Question from "../database/models/question.model";
import ApiCache from "../services/cache/apiCache";

export default class Api {
    private static instance: Api;
    private readonly router: express.Router;
    private readonly apiCache?: ApiCache;

    private constructor() {
        this.router = express.Router();
        if (ApiCache.apiEnabled)
            this.apiCache = new ApiCache({ prefix: "TechnikInformatyk" });
    }

    public async initializeApi() {
        this.router.get("/exams", getExams);
        this.router.get("/image/:uuid", getImage);
        this.router.get("/questions", getQuestions);
        this.router.get("/ping", getPing);
        this.router.get("/databaseVersion", getDatabaseVersion);
        this.router.get("/imagesSnapshot", getImagesSnapshot);

        if (this.apiCache !== undefined) await this.apiCache.connectToRedis();
    }

    public get expressRouter() {
        return this.router;
    }

    public static getInstance() {
        if (Api.instance === undefined) {
            Api.instance = new Api();
        }
        return Api.instance;
    }

    async getAllExamsWithAdapter(): Promise<AdaptedExam[]> {
        let adaptedExams: AdaptedExam[] | null | undefined;
        if (ApiCache.apiEnabled) {
            adaptedExams = await this.apiCache?.getAdaptedExamsFromCache();
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            if (adaptedExams !== null) return adaptedExams!;
        }
        const exams = await Exam.findAll();
        adaptedExams = new ExamsAdapter(exams).adapt();
        if (ApiCache.apiEnabled)
            this.apiCache?.saveAdaptedExamsToCache(adaptedExams);
        return adaptedExams;
    }

    async getAllQuestionsWithAdapter(): Promise<AdaptedQuestion[]> {
        let adaptedQuestions: AdaptedQuestion[] | null | undefined;
        if (ApiCache.apiEnabled) {
            adaptedQuestions =
                await this.apiCache?.getAdaptedQuestionsFromCache();
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            if (adaptedQuestions !== null) return adaptedQuestions!;
        }
        const questions = await Question.findAll({ include: Exam });
        adaptedQuestions = new QuestionsAdapter(questions).adapt();
        if (ApiCache.apiEnabled)
            this.apiCache?.saveAdaptedQuestionsToCache(adaptedQuestions);
        return adaptedQuestions;
    }
}
