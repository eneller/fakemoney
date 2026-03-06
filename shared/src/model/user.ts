import { Table, Column, Model, CreatedAt, DataType} from 'sequelize-typescript';

@Table
export class User extends Model{

    @Column({primaryKey: true, unique: true, allowNull: false})
    userID: string;
    
    @Column
    displayName: string;
    
    @Column(dataType: DataType.DECIMAL(20,2))
    balance: number;

    @CreatedAt
    creationDate: Date;

}