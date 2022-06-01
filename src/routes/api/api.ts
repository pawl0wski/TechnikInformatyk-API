import express from "express";
import getExams from "./getExams";
import getQuestions from "./getQuestions";
import getPing from "./getPing";
import getImage from "./getImage";
import getDatabaseVersion from "./getDatabaseVersion";
import getImagesSnapshot from "./getImagesSnapshot";

const apiRouter = express.Router();

apiRouter.get("/exams", getExams);
apiRouter.get("/image/:uuid", getImage);
apiRouter.get("/questions", getQuestions);
apiRouter.get("/ping", getPing);
apiRouter.get("/databaseVersion", getDatabaseVersion);
apiRouter.get("/imagesSnapshot", getImagesSnapshot);

export default apiRouter;
