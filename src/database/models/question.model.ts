import {
    Column,
    DataType,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    Unique,
} from "sequelize-typescript";
import Exam from "./exam.model";

@Table
export default class Question extends Model {
    @Column({
        type: DataType.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
    })
    uuid: string;
    @Column(DataType.STRING)
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
    correct: number;
    @Column(DataType.BLOB)
    image: Uint8Array;
    @HasMany(() => Exam)
    exams: Exam[];
}
