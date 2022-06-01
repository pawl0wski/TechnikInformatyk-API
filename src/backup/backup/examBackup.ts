import Backup from "./backup";
import Exam from "../../database/models/exam.model";
import ExamsAdapter from "../../adapters/examsAdapter";
import DatabaseService from "../../database/databaseService";

export default class ExamBackup extends Backup {
    protected adaptToApiResponse(models: Exam[]): { [p: string]: any }[] {
        return new ExamsAdapter(models).adapt();
    }

    protected async getAllModels(): Promise<Exam[]> {
        const databaseService = DatabaseService.getInstance();
        return await databaseService.getAllExams();
    }

    protected getModelName(): string {
        return "Exam";
    }
}
