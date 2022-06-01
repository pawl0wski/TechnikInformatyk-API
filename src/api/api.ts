import express from "express";
import getExams from "../routes/api/getExams";
import getQuestions from "../routes/api/getQuestions";
import getPing from "../routes/api/getPing";
import getImage from "../routes/api/getImage";
import getDatabaseVersion from "../routes/api/getDatabaseVersion";
import getImagesSnapshot from "../routes/api/getImagesSnapshot";

export default class Api {
    private static instance: Api;
    private readonly router: express.Router;

    private constructor() {
        this.router = express.Router();
    }

    public setupRouter() {
        this.router.get("/exams", getExams);
        this.router.get("/image/:uuid", getImage);
        this.router.get("/questions", getQuestions);
        this.router.get("/ping", getPing);
        this.router.get("/databaseVersion", getDatabaseVersion);
        this.router.get("/imagesSnapshot", getImagesSnapshot);
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
}
