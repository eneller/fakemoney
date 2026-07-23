import { Table, Column, Model, CreatedAt, DataType, Scopes, DefaultScope} from 'sequelize-typescript';

@DefaultScope(() => ({
  attributes:{ exclude: ['password']}
}))
@Scopes(() => ({
  withPassword: {
    attributes: {include: ['password']}
  }
}))
@Table
export default class User extends Model{

    @Column({primaryKey: true, unique: true, allowNull: false})
    declare userID: string;

    @Column
    declare displayName: string;

    @Column(DataType.DECIMAL(20,2))
    declare balance: number;

    @Column
    declare password: string;

    @CreatedAt
    declare creationDate: Date;

}