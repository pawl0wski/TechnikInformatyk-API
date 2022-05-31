import express from "express";
import getExams from "./getExams";
import getQuestions from "./getQuestions";
import getPing from "./getPing";
import getImage from "./getImage";

const apiRouter = express.Router();

apiRouter.get("/exams", getExams);
apiRouter.get("/image/:uuid", getImage);
apiRouter.get("/questions", getQuestions);
apiRouter.get("/ping", getPing);

export default apiRouter;
