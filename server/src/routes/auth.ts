import express from 'express';
import { logger } from '../util/logging';
import User from '../model/user';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({where: { userID: username}});
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const isMatch = (password == user.password);
    //TODO hash passwords
    //const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ message: 'Logged in successfully' });
  }catch (err) {
    logger.error('Failed to authenticate:', err);
    res.status(500).json({ error: 'Failed to authenticate' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logged out successfully' });
});

export default router;
