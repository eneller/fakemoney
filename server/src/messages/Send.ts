export class SendRequest{
    constructor(
        public recipientID: string,
        public amount: number,
        public reference: string
    ){}
}

export class SendResponse{
    constructor(
        public balance: number,
        public message: string
    ){}
}