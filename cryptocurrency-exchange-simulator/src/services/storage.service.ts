import { TransactionModel, TransactionStatus } from '@/models/TransactionModel'

const defaultBalance = 10000

export class StorageService {
  private static _balance: number = defaultBalance
  private static _investedMoney = 62
  private static _profit = 34
  private static _transactionHistory: Array<TransactionModel> = [
    { price: 100, date: new Date(), rate: 1.32, amount: 0.32, bidPrice: 10, askPrice: 20, status: TransactionStatus.BOUGHT, cryptocurrency: 'BTC' },
    { price: 120, date: new Date(), rate: 1.76, amount: 0.5, bidPrice: 23, askPrice: 16, status: TransactionStatus.BOUGHT, cryptocurrency: 'DASH' },
    { price: 150, date: new Date(), rate: 2.12, amount: 0.21, bidPrice: 18.23, askPrice: 20.56, status: TransactionStatus.SOLD, cryptocurrency: 'BAT' }
  ]

  // public static _buyCryptocurrency (transactionModel: TransactionModel) {
  //
  // }
  //
  // public static _sellCryptocurrency (transactionMode: TransactionModel) {
  //
  // }

  public static reset () {
    this._balance = defaultBalance
    this._investedMoney = 0
    this._profit = 0
    this._transactionHistory = []
  }

  public static get balance () {
    return this._balance
  }

  public static get investedMoney () {
    return this._investedMoney
  }

  public static get profit () {
    return this._profit
  }

  public static get transactionHistory () {
    return this._transactionHistory
  }

  public static addToBalance () {
    this._balance += 1
  }
}
