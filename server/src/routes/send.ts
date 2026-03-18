import express from 'express';
import { logger } from '../util/logging';
import { requireAuth } from '../util/auth';
import User from '../model/user';
import { db } from '../util/db';
import Transaction from '../model/transaction';


const router = express.Router();

router.get('/:recipientID', requireAuth, async (req, res) => {
  try {
    let sender = res.locals.user as User;
    let amount = Number(req.query.amount);
    let recipient = await User.findOne({where: {userID: req.params.recipientID}})
    if ( amount <= 0) {
      return res.status(400).json({ error: 'Invalid transfer amount' });
    }
    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }
    if (sender.balance < amount){
      res.status(400).json({error: 'Insufficient balance'})
    }

    await db.transaction(async (t) =>{
      await sender.decrement({balance: amount});
      await recipient.increment({balance: amount});
      await Transaction.create({
        amount: amount,
        senderID: sender.userID,
        receiverID: recipient.userID
      });
    })
    res.status(200).json({balance: sender.balance, amount: amount});
  } catch (err) {
    logger.error('Failed to commit transaction:', err);
    res.status(500).json({ error: 'Failed to commit transaction' });
  }
});

export default router;
