import express, { Request } from 'express';
import { logger } from '../util/logging';
import User from '../model/user';
import { getJWT, checkJWT } from '../util/auth';

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
    // TODO change this for production setup
    res.cookie('jwt', getJWT(user), {
      httpOnly: true,    // Prevent XSS
      secure: false,      // HTTPS only
      sameSite: 'lax', // CSRF protection
      domain: '.localhost',
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

router.get('/status', (req, res) => {
  if (checkJWT(req)){
    return res.status(200).json({authenticated: true});
  }
  return res.status(401).json({authenticated: false});
})

export default router;
