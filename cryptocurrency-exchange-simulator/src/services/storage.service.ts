import { TransactionModel, TransactionStatus } from '@/models/TransactionModel'
import { CurrencyAmountModel } from '@/models/CurrencyAmountModel'
import { ALL_CRYPTOCURRENCIES, CryptocurrencyConsts } from '@/constants/cryptocurrency.constants'

const defaultBalance = 50000

export class StorageService {
  private static _balance: number = defaultBalance
  private static _followedCryptocurrencyList: Array<string> = ['BTC', 'ETH', 'LSK', 'LTC']
  private static _transactionHistory: Array<TransactionModel> = []
  private static _ownedCryptocurrencies: Array<CurrencyAmountModel> = []
  private static _ownedCurrencies: Array<CurrencyAmountModel> = [{ currency: CryptocurrencyConsts.CURRENCIES.PLN, amount: defaultBalance }]

  public static buyCryptocurrency (transactionModel: TransactionModel) {
    this.handleBoughtCryptocurrency(transactionModel)
    this._transactionHistory.push(transactionModel)
  }

  private static handleBoughtCryptocurrency (transactionModel: TransactionModel) {
    this.subtractFromBalance(transactionModel.askPrice, transactionModel.amount)

    const cryptocurrencyAmount = this._ownedCryptocurrencies.find(entry => entry.currency === transactionModel.cryptocurrency)
    if (cryptocurrencyAmount === undefined) {
      this._ownedCryptocurrencies.push({ currency: transactionModel.cryptocurrency, amount: transactionModel.amount })
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
    this.addToBalance(transactionModel.bidPrice, transactionModel.amount)

    const cryptocurrencyAmount = this._ownedCryptocurrencies.find(entry => entry.currency === transactionModel.cryptocurrency)
    if (cryptocurrencyAmount === undefined || cryptocurrencyAmount.amount < transactionModel.amount) {
      throw new Error('not enough cryptocurrency owned')
    } else {
      cryptocurrencyAmount.amount = +cryptocurrencyAmount.amount - +transactionModel.amount
      this.removeElementIfAmountEqualZero(cryptocurrencyAmount, this._ownedCryptocurrencies)
    }
  }

  private static removeElementIfAmountEqualZero (cryptocurrencyAmount: CurrencyAmountModel, currencyList: Array<CurrencyAmountModel>) {
    if (+cryptocurrencyAmount.amount === 0) {
      const index = currencyList.indexOf(cryptocurrencyAmount, 0)
      if (index > -1) {
        currencyList.splice(index, 1)
      }
    }
  }

  private static addToBalance (askPrice: number, amount: number) {
    this._balance = this._balance + askPrice * amount
  }

  public static getCryptocurrencyAmount (cryptocurrency: string): number {
    const ownedCryptocurrency = this._ownedCryptocurrencies.find(entry => {
      if (entry.currency === cryptocurrency) {
        return entry
      }
    })
    return ownedCryptocurrency !== undefined ? +ownedCryptocurrency.amount : 0
  }

  public static hasEnoughMoneyForTransaction (price: number, amount: number) {
    return this._balance >= price * amount
  }

  public static getCurrencyAmount (currency: string): number {
    const ownedCurrency = this._ownedCurrencies.find(entry => {
      if (entry.currency === currency) {
        return entry
      }
    })
    return ownedCurrency !== undefined ? +ownedCurrency.amount : 0
  }

  public static buyCurrency (currency: string, amount: number, buyingRate: number) {
    this.subtractFromBalance(+buyingRate, +amount)
    this.handleCurrencyTransaction(currency, -(+amount * +buyingRate), +amount)
  }

  public static sellCurrency (currency: string, amount: number, sellingRate: number) {
    this.addToBalance(+sellingRate, +amount)
    this.handleCurrencyTransaction(currency, +amount * +sellingRate, -+amount)
  }

  public static handleCurrencyTransaction (currency: string, plnAmount: number, otherCurrencyAmount: number) {
    const currencyAmount = this._ownedCurrencies.find(currencyAmount => currencyAmount.currency === currency)
    const plnCurrencyAmount = this._ownedCurrencies.find(currencyAmount => currencyAmount.currency === CryptocurrencyConsts.CURRENCIES.PLN)
    if (plnCurrencyAmount === undefined) {
      throw new Error('pln currency not found')
    }
    if (currencyAmount === undefined) {
      this._ownedCurrencies.push({ currency: currency, amount: otherCurrencyAmount })
    } else {
      currencyAmount.amount = +currencyAmount.amount + +otherCurrencyAmount
      this.removeElementIfAmountEqualZero(currencyAmount, this._ownedCurrencies)
    }
    plnCurrencyAmount.amount = plnCurrencyAmount.amount + plnAmount
  }

  public static getAvailableCurrenciesToFollow (): Array<string> {
    return ALL_CRYPTOCURRENCIES.filter(currency => {
      return !this._followedCryptocurrencyList.includes(currency)
    })
  }

  public static addCryptocurrencyToFollowedList (cryptocurrency: string) {
    this._followedCryptocurrencyList.push(cryptocurrency)
  }

  public static unfollowCryptocurrency (cryptocurrency: string) {
    const index = this._followedCryptocurrencyList.indexOf(cryptocurrency, 0)
    if (index > -1) {
      this._followedCryptocurrencyList.splice(index, 1)
    }
  }

  public static calculateProfit (): number {
    let profit = 0
    this._transactionHistory.forEach(element => {
      if (element.status === TransactionStatus.SOLD) {
        profit = profit + element.price
      }
    })
    return profit
  }

  public static calculateInvestedMoney (): number {
    let investedMoney = 0
    this._transactionHistory.forEach(element => {
      if (element.status === TransactionStatus.BOUGHT) {
        investedMoney = investedMoney + element.price
      }
    })
    return investedMoney
  }

  public static calculateTotalIncomeOrLoss (): number {
    return this.calculateProfit() + this.calculateInvestedMoney()
  }

  public static topUpBalance (amount: number) {
    this._balance = +this._balance + +amount
  }

  public static reset () {
    this._balance = defaultBalance
    this._transactionHistory = []
    this._ownedCryptocurrencies = []
  }

  public static get followedCryptocurrencies () {
    return this._followedCryptocurrencyList
  }

  public static get balance () {
    return this._balance
  }

  public static get transactionHistory () {
    return this._transactionHistory
  }

  public static get ownedCryptocurrencies () {
    return this._ownedCryptocurrencies
  }

  public static get ownedCurrencies () {
    return this._ownedCurrencies
  }
}
