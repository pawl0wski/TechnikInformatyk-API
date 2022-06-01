import Adapter from "./adapter";
import Exam from "../database/models/exam.model";

export default class ExamsAdapter extends Adapter {
    protected exams: Exam[];

    constructor(exams: Exam[]) {
        super();
        this.exams = exams;
    }

    protected adaptExam(exam: Exam) {
        const { uuid, name, description, icon, type } = exam;
        return {
            uuid,
            name,
            description,
            icon,
            type,
        };
    }

    adapt(): {
        [key: string]: string | boolean | string[] | number;
    }[] {
        return this.exams.map((e: Exam) => this.adaptExam(e));
    }
}
