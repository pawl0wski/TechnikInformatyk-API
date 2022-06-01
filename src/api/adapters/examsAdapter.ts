import Exam from "../../database/models/exam.model";
import { AdapterI } from "./interfaces/adapter";

export interface AdaptedExam {
    uuid: string;
    name: string;
    description: string;
    icon: string;
    type: string;
}

export default class ExamsAdapter implements AdapterI {
    protected exams: Exam[];

    constructor(exams: Exam[]) {
        this.exams = exams;
    }

    protected adaptExam(exam: Exam): AdaptedExam {
        const { uuid, name, description, icon, type } = exam;
        return {
            uuid,
            name,
            description,
            icon,
            type,
        };
    }

    adapt(): AdaptedExam[] {
        return this.exams.map((e: Exam) => this.adaptExam(e));
    }
}
