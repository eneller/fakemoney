import express from 'express';
import { Transaction } from "@shared/interfaces/transaction"

const router = express.Router();

// Mock data
const mockTransactions: Transaction[] = [
  { id: '1', partner: 'Alice Smith', amount: 50.00, date: new Date('2026-03-01'), type: 'Received' },
  { id: '2', partner: 'Bob Johnson', amount: -25.50, date: new Date('2026-02-28'), type: 'Sent' },
];

// GET /api/transactions
router.get('/', (req, res) => {
  res.json(mockTransactions);
});

export default router;
