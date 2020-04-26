import { TransactionModel } from '@/models/TransactionModel'
import { CryptocurrencyAmountModel } from '@/models/CryptocurrencyAmountModel'
import { ALL_CRYPTOCURRENCIES } from '@/constants/cryptocurrency.constants'

const defaultBalance = 50000

export class StorageService {
  private static _balance: number = defaultBalance
  private static _investedMoney = 62
  private static _profit = 34
  private static _followedCryptocurrencyList: Array<string> = ['BTC', 'ETH', 'LSK', 'LTC']
  private static _transactionHistory: Array<TransactionModel> = []
  private static _ownedCryptocurrencies: Array<CryptocurrencyAmountModel> = []

  public static buyCryptocurrency (transactionModel: TransactionModel) {
    // if (this.hasEnoughMoneyForTransaction(transactionModel.bidPrice, transactionModel.amount)) {
    //   throw new Error('not enough money')
    // }
    this.handleBoughtCryptocurrency(transactionModel)
    this._transactionHistory.push(transactionModel)
  }

  private static handleBoughtCryptocurrency (transactionModel: TransactionModel) {
    this.subtractFromBalance(transactionModel.bidPrice, transactionModel.amount)

    const cryptocurrencyAmount = this._ownedCryptocurrencies.find(entry => entry.cryptocurrency === transactionModel.cryptocurrency)
    if (cryptocurrencyAmount === undefined) {
      this._ownedCryptocurrencies.push({ cryptocurrency: transactionModel.cryptocurrency, amount: transactionModel.amount })
    } else {
      cryptocurrencyAmount.amount = +cryptocurrencyAmount.amount + +transactionModel.amount
    }
  }

  private static subtractFromBalance (bidPrice: number, amount: number) {
    this._balance = this._balance - bidPrice * amount
  }

  public static sellCryptocurrency (transactionModel: TransactionModel) {
    this.handleSoldCryptocurrency(transactionModel)
    this._transactionHistory.push(transactionModel)
  }

  private static handleSoldCryptocurrency (transactionModel: TransactionModel) {
    this.addToBalance(transactionModel.askPrice, transactionModel.amount)

    const cryptocurrencyAmount = this._ownedCryptocurrencies.find(entry => entry.cryptocurrency === transactionModel.cryptocurrency)
    if (cryptocurrencyAmount === undefined || cryptocurrencyAmount.amount < transactionModel.amount) {
      throw new Error('not enough cryptocurrency owned')
    } else {
      cryptocurrencyAmount.amount = +cryptocurrencyAmount.amount - +transactionModel.amount
      this.removeElementIfAmountEqualZero(cryptocurrencyAmount)
    }
  }

  private static removeElementIfAmountEqualZero (cryptocurrencyAmount: CryptocurrencyAmountModel) {
    if (+cryptocurrencyAmount.amount === 0) {
      const index = this._ownedCryptocurrencies.indexOf(cryptocurrencyAmount, 0)
      if (index > -1) {
        this._ownedCryptocurrencies.splice(index, 1)
      }
    }
  }

  private static addToBalance (askPrice: number, amount: number) {
    this._balance = this._balance + askPrice * amount
  }

  public static getCryptocurrencyAmount (cryptocurrency: string): number {
    const ownedCryptocurrency = this._ownedCryptocurrencies.find(entry => {
      if (entry.cryptocurrency === cryptocurrency) {
        return entry
      }
    })
    return ownedCryptocurrency !== undefined ? +ownedCryptocurrency.amount : 0
  }

  public static hasEnoughMoneyForTransaction (price: number, amount: number) {
    return this._balance >= price * amount
  }

  public static getAvailableCurrenciesToFollow (): Array<string> {
    return ALL_CRYPTOCURRENCIES.filter(currency => {
      return !this._followedCryptocurrencyList.includes(currency)
    })
  }

  public static addCryptocurrencyToFollowedList (cryptocurrency: string) {
    this._followedCryptocurrencyList.push(cryptocurrency)
  }

  public static reset () {
    this._balance = defaultBalance
    this._investedMoney = 0
    this._profit = 0
    this._transactionHistory = []
    this._ownedCryptocurrencies = []
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

  public static get ownedCryptocurrencies () {
    return this._ownedCryptocurrencies
  }
}
