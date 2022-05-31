import ApiAdapter from "./apiAdapter";
import Exam from "../../../database/models/exam.model";

export default class ExamsApiAdapter extends ApiAdapter {
    protected exams: Exam[];

    constructor(exams: Exam[]) {
        super();
        this.exams = exams;
    }

    private mapExamToApiObject(exam: Exam) {
        const { uuid, name, description, icon, type } = exam;
        return {
            uuid,
            name,
            description,
            icon,
            type,
        };
    }

    getAsApiObject(): {
        [key: string]: string | boolean | string[] | number;
    }[] {
        return this.exams.map((e: Exam) => this.mapExamToApiObject(e));
    }
}
