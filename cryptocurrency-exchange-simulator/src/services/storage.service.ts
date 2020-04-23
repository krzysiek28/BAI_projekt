import { TransactionModel } from '@/models/TransactionModel'

const defaultBalance = 10000

export class StorageService {
  private static _balance: number = defaultBalance
  private static _investedMoney = 0
  private static _profit = 0
  private static _transactionHistory: Array<TransactionModel> = []

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
