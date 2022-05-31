import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export default class Exam extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        unique: true,
        allowNull: false,
    })
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
