import express from "express";
import getExams from "./getExams";

const apiRouter = express.Router();

apiRouter.get("/getExams", getExams);

export default apiRouter;
