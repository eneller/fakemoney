import express from 'express';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    res.json('abc');
  } catch (err) {
    console.error('Failed to authenticate:', err);
    res.status(500).json({ error: 'Failed to authenticate' });
  }
});

export default router;
