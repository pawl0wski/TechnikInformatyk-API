import {
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
    Unique,
} from "sequelize-typescript";

@Table
export default class ExamModel extends Model {
    @PrimaryKey
    @Unique
    @Column(DataType.UUID)
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
