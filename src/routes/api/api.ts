import express from "express";
import getExams from "./getExams";
import getQuestions from "./getQuestions";

const apiRouter = express.Router();

apiRouter.get("/exams", getExams);
apiRouter.get("/questions", getQuestions);

export default apiRouter;
