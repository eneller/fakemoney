import express  from 'express';
import { logger } from '../util/logging';
import { requireAuth } from '../util/auth';
import Account, { BusinessOwnership, getOwnedAccounts } from '../model/user';
import { db } from '../util/db';
import Transaction from '../model/transaction';
import { SendRequest, SendResponse} from '../messages/Send';
import { GenericMessage as Err} from '../messages/Message';


const router = express.Router();

router.post('/', requireAuth, async (req, res) => {
  try {
    const user = res.locals.user as Account;
    const data : SendRequest = req.body;
    if ( Number(data.amount) <= 0) {
      return res.status(400).json(new Err('Invalid transfer amount'));
    }
    const recipient = await Account.findOne({where: {id: data.recipientID}})
    if (!recipient) {
      return res.status(404).json(new Err('Recipient not found' ));
    }
    const sender = await Account.findOne({where: {id: data.senderID}})
    if (!sender) {
      return res.status(404).json(new Err('Sender not found' ));
    }
    let ownsAccount = (await getOwnedAccounts(user))?.some(
      business => business.id == data.senderID
    );
    if(!(user.equals(sender) || ownsAccount )){
      return res.status(403).json(new Err('Unauthorized sender'));
    }
    if (Number(sender.balance) < Number(data.amount)){
      logger.debug(`Insufficient balance: ${sender.balance} < ${data.amount}`)
      return res.status(402).json(new Err('Insufficient balance'))
    }

    await db.transaction(async (t) =>{
      await sender.decrement({balance: data.amount});
      await recipient.increment({balance: data.amount});
      await Transaction.create({
        amount: data.amount,
        senderID: sender.id,
        receiverID: recipient.id,
        reference: data.reference
      });
    })
    return res.status(200).json(new SendResponse(sender.balance))
  } catch (err) {
    logger.error('Failed to commit transaction:', err);
    return res.status(500).json(new Err('Failed to commit transaction' ));
  }
});

export default router;
