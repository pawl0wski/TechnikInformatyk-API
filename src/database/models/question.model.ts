import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    Table,
} from "sequelize-typescript";
import Exam from "./exam.model";
import ExamQuestion from "./examquestion.model";

@Table
export default class Question extends Model {
    @Column({
        type: DataType.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
    })
    uuid: string;

    @Column(DataType.STRING(512))
    content: string;

    @Column(DataType.STRING)
    answerA: string;

    @Column(DataType.STRING)
    answerB: string;

    @Column(DataType.STRING)
    answerC: string;

    @Column(DataType.STRING)
    answerD: string;

    @Column(DataType.SMALLINT)
    correctAnswer: number;

    @Column(DataType.BLOB("medium"))
    image: Uint8Array;

    @BelongsToMany(() => Exam, () => ExamQuestion)
    exams: Exam[];
}
