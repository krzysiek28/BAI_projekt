export interface TransactionModel {
  date: string;
  amount: number;
  price: number;
  bidPrice: number;
  askPrice: number;
  status: TransactionStatus;
  cryptocurrency: string;
}

export interface ShortTransactionModel {
  date: string;
  amount: number;
  price: string;
  status: TransactionStatus;
  cryptocurrency: string;
}

export enum TransactionStatus {
  BOUGHT = 'Kupione', SOLD = 'Sprzedane'
}
