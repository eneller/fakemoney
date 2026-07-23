import { Table, Column, Model, DataType, Scopes, DefaultScope, DeletedAt, BelongsToMany, ForeignKey} from 'sequelize-typescript';

@DefaultScope(() => ({
  attributes:{ exclude: ['password']}
}))
@Scopes(() => ({
  withPassword: {
    attributes: {include: ['password']}
  }
}))
@Table
export default class Account extends Model{

    @Column({primaryKey: true, unique: true, allowNull: false})
    declare id: string;

    @Column
    declare isBusiness: boolean;

    @Column
    declare displayName: string;

    @Column(DataType.DECIMAL(20,2))
    declare balance: number;

    @Column
    declare password: string;
    
    @DeletedAt
    declare deletedAt: Date | null;
    
}
@Table
export class BusinessOwnership extends Model {
  @ForeignKey(() => Account)
  @Column
  ownerAccountId!: number;

  @ForeignKey(() => Account)
  @Column
  ownedAccountId!: number;

  @DeletedAt
  declare deletedAt: Date | null;
}