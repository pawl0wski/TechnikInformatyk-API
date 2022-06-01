import Backup from "./backup";
import Exam from "../../database/models/exam.model";
import ExamsAdapter from "../../adapters/examsAdapter";

export default class ExamBackup extends Backup {
    protected adaptToApiResponse(models: Exam[]): { [p: string]: any }[] {
        return new ExamsAdapter(models).adapt();
    }

    protected async getAllModels(): Promise<Exam[]> {
        return await Exam.findAll();
    }

    protected getModelName(): string {
        return "Exam";
    }
}
