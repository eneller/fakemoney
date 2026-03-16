import { Request } from "express"
import User from "../model/user"
import { importJWK, SignJWT, jwtVerify } from "jose";


let key;

async function setKeyFromEnv() {
    key = await importJWK(JSON.parse(process.env.FM_PRIVATE_KEY));
}

async function checkJWT(req: Request){
    try {
        let jwt= await jwtVerify(req.cookies.jwt, key);
        const user = await User.findOne({where: { userID: jwt.payload.sub}});
        return user
    } catch (error) {
        return null
    }
}

async function getJWT(user: User){
    let jwt = await new SignJWT()
        .setSubject(user.userID)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .sign(key);

    return jwt
}
export {getJWT, checkJWT, setKeyFromEnv}