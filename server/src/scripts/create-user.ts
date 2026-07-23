import { db, testConnection } from "../util/db";
import { hash } from "bcrypt";
import Account  from '../model/user';
(async () =>{
    await testConnection();
    await Account.create({
        id: process.argv[2],
        displayName: process.argv[3],
        balance: process.argv[4],
        password: await hash(process.argv[5], 10),
    })
})();