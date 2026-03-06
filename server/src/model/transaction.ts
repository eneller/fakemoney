import { Table, Column, Model, CreatedAt, ForeignKey, BelongsTo} from 'sequelize-typescript';
import User from './user';

@Table
export default class Transaction extends Model{
    @Column
    amount: number;

    @Column
    @ForeignKey(()=> User)
    senderID: string;

    @BelongsTo(() => User, 'senderID')
    sender: User;

    @Column
    @ForeignKey(()=> User)
    receiverID: string;

    @BelongsTo(() => User, 'receiverID')
    receiver: User;

    @CreatedAt
    creationDate: Date;
}