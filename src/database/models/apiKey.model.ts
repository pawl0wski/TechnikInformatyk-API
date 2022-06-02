import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export default class ApiKey extends Model {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        allowNull: false,
    })
    id: string;

    @Column(DataType.STRING(32))
    key: string;

    @Column(DataType.ENUM("admin", "client"))
    privilege: string;
}
