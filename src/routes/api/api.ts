import express from "express";
import getExams from "./getExams";
import getQuestions from "./getQuestions";
import getPing from "./getPing";

const apiRouter = express.Router();

apiRouter.get("/exams", getExams);
apiRouter.get("/questions", getQuestions);
apiRouter.get("/ping", getPing);

export default apiRouter;
