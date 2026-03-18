import express  from 'express';
import { logger } from '../util/logging';
import { requireAuth } from '../util/auth';
import User from '../model/user';
import { db } from '../util/db';
import Transaction from '../model/transaction';
import { SendRequest, SendResponse} from '../messages/Send';


const router = express.Router();

router.post('/', requireAuth, async (req, res) => {
  try {
    const sender = res.locals.user as User;
    const data : SendRequest = req.body;
    const recipient = await User.findOne({where: {userID: data.recipientID}})
    if ( Number(data.amount) <= 0) {
      // TODO return SendResponse here and everywhere else in this file
      return res.status(400).json({ error: 'Invalid transfer amount' });
    }
    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }
    if (Number(sender.balance) < Number(data.amount)){
      logger.error(`Insufficient balance: ${sender.balance} < ${data.amount}`)
      return res.status(402).json({error: 'Insufficient balance'})
    }

    await db.transaction(async (t) =>{
      await sender.decrement({balance: data.amount});
      await recipient.increment({balance: data.amount});
      await Transaction.create({
        amount: data.amount,
        senderID: sender.userID,
        receiverID: recipient.userID,
        reference: data.reference
      });
    })
    return res.status(200).json({balance: sender.balance, amount: data.amount});
  } catch (err) {
    logger.error('Failed to commit transaction:', err);
    return res.status(500).json({ error: 'Failed to commit transaction' });
  }
});

export default router;
