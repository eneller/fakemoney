export class SendRequest{
    constructor(
        public senderID: string,
        public recipientID: string,
        public amount: number,
        public reference: string
    ){}
}

export class SendResponse{
    constructor(
        public balance: number,
    ){}
}