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
export default class Exam extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        unique: true,
        allowNull: false,
    })
    @ForeignKey(() => Question)
    uuid: string;

    @Column(DataType.STRING)
    name: string;

    @Column(DataType.STRING)
    description: string;

    @Column(DataType.STRING)
    icon: string;

    @Column(DataType.ENUM("subject", "main"))
    type: string;
}
