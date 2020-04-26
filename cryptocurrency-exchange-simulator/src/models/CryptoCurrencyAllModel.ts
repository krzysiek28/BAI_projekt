import { CryptocurrencyTickerModel } from '@/models/CryptocurrencyTickerModel'
import { CryptocurrencyOrderbookModel } from '@/models/CryptocurrencyOrderbookModel'
import { CryptocurrencyTradeModel } from '@/models/CryptocurrencyTradeModel'

export interface CryptocurrencyAllModel {
  ticker: CryptocurrencyTickerModel;
  bids: Array<CryptocurrencyOrderbookModel>;
  asks: Array<CryptocurrencyOrderbookModel>;
  transactions: Array<CryptocurrencyTradeModel>;
}
