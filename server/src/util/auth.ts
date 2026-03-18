import { NextFunction, Request, Response } from "express";
import User from "../model/user"
import { importJWK, SignJWT, jwtVerify } from "jose";


let key;

async function setKeyFromEnv() {
    key = await importJWK(JSON.parse(process.env.FM_PRIVATE_KEY));
}

async function getJWT(user: User){
    let jwt = await new SignJWT()
        .setSubject(user.userID)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .sign(key);

    return jwt
}

async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.jwt; // Or req.headers.authorization
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    const jwt= await jwtVerify(token, key);
    const user = await User.findOne({where: { userID: jwt.payload.sub}});
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: User not found' });
    }
    //TODO extend req instead of using res.locals
    res.locals.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}

function requireRole(role: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // First, run requireAuth to ensure the user is authenticated
    await requireAuth(req, res, () => {
      if (res.locals.role !== role) {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
      }
      next(); // User is authenticated and has the required role
    });
  };
}

export {getJWT, setKeyFromEnv, requireAuth}