import { Table, Column, Model, CreatedAt, DataType} from 'sequelize-typescript';

@Table
export default class User extends Model{

    @Column({primaryKey: true, unique: true, allowNull: false})
    userID: string;

    @Column
    displayName: string;

    @Column(DataType.DECIMAL(20,2))
    balance: number;

    @Column
    password: string;

    @CreatedAt
    creationDate: Date;

}