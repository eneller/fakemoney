import { Table, Column, Model, CreatedAt, ForeignKey, BelongsTo} from 'sequelize-typescript';
import Account from './user';

@Table
export default class Transaction extends Model{
    @Column
    declare amount: number;
    
    @Column
    declare reference: string;

    @Column
    @ForeignKey(()=> Account)
    declare senderID: string;

    @BelongsTo(() => Account, 'senderID')
    declare sender: Account;

    @Column
    @ForeignKey(()=> Account)
    declare receiverID: string;

    @BelongsTo(() => Account, 'receiverID')
    declare receiver: Account;

    @CreatedAt
    declare date: Date;
}