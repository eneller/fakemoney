import express from 'express';
import { logger } from '../util/logging';
import Transaction from '../model/transaction';
import { requireAuth } from '../util/auth';

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      limit: 100,
      order: [['date', 'DESC']]
     });
    res.json(transactions);
  } catch (err) {
    logger.error('Failed to fetch transactions:', err);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

export default router;
