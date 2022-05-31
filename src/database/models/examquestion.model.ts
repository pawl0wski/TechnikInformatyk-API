import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import Exam from "./exam.model";
import Question from "./question.model";

@Table
export default class ExamQuestion extends Model {
    @ForeignKey(() => Exam)
    @Column(DataType.UUID)
    examUuid: string;

    @ForeignKey(() => Question)
    @Column(DataType.UUID)
    questionUuid: string;
}
