import express, { Request } from 'express';
import { logger } from '../util/logging';
import User from '../model/user';
import { JWT, JWK } from 'ts-jose';

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
    res.cookie('jwt', 'toekn', {
      /*
      httpOnly: true,    // Prevent XSS
      secure: true,      // HTTPS only
      sameSite: 'strict', // CSRF protection
      */
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
  console.log(req.cookies);
  if (isAuthenticated(req)){
    return res.status(200).json({authenticated: true});
  }
  return res.status(401).json({authenticated: false});
})

function isAuthenticated(req: Request){
  // TODO check JWT
  return req.cookies.jwt
}

function getJWT(user: User){

}

export default router;
