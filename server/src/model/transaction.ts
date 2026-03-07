import { Table, Column, Model, CreatedAt, ForeignKey, BelongsTo} from 'sequelize-typescript';
import User from './user';

@Table
export default class Transaction extends Model{
    @Column
    declare amount: number;

    @Column
    @ForeignKey(()=> User)
    declare senderID: string;

    @BelongsTo(() => User, 'senderID')
    declare sender: User;

    @Column
    @ForeignKey(()=> User)
    declare receiverID: string;

    @BelongsTo(() => User, 'receiverID')
    declare receiver: User;

    @CreatedAt
    declare date: Date;
}