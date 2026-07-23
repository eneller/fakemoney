import Account from "../model/user";

export class UserRequest{
    constructor(
    ){}
}
export class UserResponse{
    constructor(
        public user: Account
    ){}
}