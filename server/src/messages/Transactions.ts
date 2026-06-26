import Transaction from "../model/transaction";

export class TransactionsRequest{
    constructor(
        public offset = 0,
        public count = 50,
    ){}
}

export class TransactionsResponse{
    constructor(
        public transactions: Transaction[],
    ){}
}