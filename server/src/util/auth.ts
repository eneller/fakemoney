import { Request } from "express"
import User from "../model/user"
import { JWT, JWK } from 'ts-jose';

const privateKey = process.env.FM_PRIVATE_KEY;
export function checkJWT(req: Request){
  // TODO check JWT
  return req.cookies.jwt
}

export function getJWT(user: User){
    return 'toekn'
}