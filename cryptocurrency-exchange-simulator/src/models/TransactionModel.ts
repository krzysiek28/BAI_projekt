export interface TransactionModel {
  price: number,
  date: Date,
  rate: number,
  amount: number,
  bidPrice: number,
  askPrice: number,
  status: TransactionStatus,
  cryptocurrency: string
}

export enum TransactionStatus {
  BOUGHT, SOLD
}
