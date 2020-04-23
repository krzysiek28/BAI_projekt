import { TransactionModel, TransactionStatus } from '@/models/TransactionModel'

const defaultBalance = 10000

export class StorageService {
  private static _balance: number = defaultBalance
  private static _investedMoney = 62
  private static _profit = 34
  private static _followedCryptocurrencyList: Array<string> = ['BTC', 'ETH', 'LSK', 'LTC']
  private static _transactionHistory: Array<TransactionModel> = []

  public static buyCryptocurrency (transactionModel: TransactionModel) {
    this.subtractFromBalance(transactionModel.bidPrice, transactionModel.amount)
    this._transactionHistory.push(transactionModel)
  }

  public static sellCryptocurrency (transactionModel: TransactionModel) {
    this.addToBalance(transactionModel.askPrice, transactionModel.amount)
    this._transactionHistory.push(transactionModel)
  }

  private static subtractFromBalance (bidPrice: number, amount: number) {
    this._balance = this._balance - bidPrice * amount
  }

  private static addToBalance (askPrice: number, amount: number) {
    this._balance = this._balance + askPrice * amount
  }

  public static reset () {
    this._balance = defaultBalance
    this._investedMoney = 0
    this._profit = 0
    this._transactionHistory = []
  }

  public static get followedCryptocurrencies () {
    return this._followedCryptocurrencyList
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
}
