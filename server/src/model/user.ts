import { Table, Column, Model, DataType, Scopes, DefaultScope, DeletedAt, BelongsToMany, ForeignKey} from 'sequelize-typescript';

@Table
@DefaultScope(() => ({
  //FIXME getting account still includes password
  attributes:{ exclude: ['password']}
}))
@Scopes(() => ({
  withPassword: {
    attributes: {include: ['password']}
  }
}))
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
  
  @BelongsToMany(() => Account, () => BusinessOwnership, 'ownerAccountId', 'ownedAccountId')
  declare ownedBusinesses: Account[];

  @BelongsToMany(() => Account, () => BusinessOwnership, 'ownedAccountId', 'ownerAccountId')
  declare owners: Account[];
  
  override toJSON() {
    const values = { ...this.get() };
    delete values.password;
    return values;
  }
}

@Table
export class BusinessOwnership extends Model {
  @ForeignKey(() => Account)
  @Column
  declare ownerAccountId: string;

  @ForeignKey(() => Account)
  @Column
  declare ownedAccountId: string;

  @DeletedAt
  declare deletedAt: Date | null;
}

export async function getOwnedAccounts(user: Account){
    let q = await Account.findByPk(user.id, {
      include: ['ownedBusinesses'],
    });
    let ownedAccounts = q?.ownedBusinesses;
    return ownedAccounts ?? [];
}