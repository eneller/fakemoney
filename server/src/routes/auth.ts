import express from 'express';
import { logger } from '../util/logging';
import User from '../model/user';
import { getJWT, requireAuth } from '../util/auth';

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

    // successfully authenticated
    let jwt = await getJWT(user);
    res.cookie('jwt', jwt, {
      httpOnly: true,    // Prevent XSS
      secure: process.env.NODE_ENV === 'production',// HTTPS only
      sameSite: 'strict', // CSRF protection
      maxAge: 86400000,  // 1 day
    });
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

router.get('/status',requireAuth , async (req, res) => {
    return res.status(200).json({authenticated: true});
})

export default router;
