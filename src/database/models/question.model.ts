import {
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
    Unique,
} from "sequelize-typescript";

@Table
export default class Question extends Model {
    @PrimaryKey
    @Unique
    @Column(DataType.UUID)
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
}
