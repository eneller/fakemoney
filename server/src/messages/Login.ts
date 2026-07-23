import Account from "../model/user";
export class LoginRequest{
    constructor(
        public username: string,
        public password: string
    ){}
}
export class LoginResponse{
    constructor(
        public user: Account,
        public ownedBusinesses: Account[],
    ){}
}