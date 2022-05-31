import {
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    Unique,
} from "sequelize-typescript";
import Question from "./question.model";

@Table
export default class Report extends Model {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
    })
    uuid: string;

    @Column(DataType.STRING)
    content: string;

    @ForeignKey(() => Question)
    @Column(DataType.STRING)
    questionUuid: string;
}
