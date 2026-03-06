
export interface Transaction {
  id: string;
  partner: string;
  amount: number;
  date: Date;
  type: 'Sent' | 'Received';
}