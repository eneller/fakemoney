import express from 'express';
import { logger } from '../util/logging';
import User from '../model/user';
import { getJWT, requireAuth } from '../util/auth';
import { LoginRequest } from '../messages/Login';
import { GenericMessage as Msg } from '../messages/Message';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const data : LoginRequest = req.body;
    const user = await User.findOne({where: { userID: data.username}});
    if (!user) return res.status(401).json(new Msg('Invalid credentials'));
    const isMatch = (data.password == user.password);
    //TODO hash passwords
    //const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json(new Msg('Invalid credentials'));

    // successfully authenticated
    let jwt = await getJWT(user);
    res.cookie('jwt', jwt, {
      httpOnly: true, // Prevent XSS
      secure: process.env.NODE_ENV === 'production', // HTTPS only
      sameSite: 'strict', // CSRF protection
      maxAge: 86400000,  // 1 day
    });
    res.json(new Msg('Logged in successfully'));
  }catch (err) {
    logger.error('Failed to authenticate:', err);
    res.status(500).json(new Msg('Failed to authenticate'));
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
