import { CryptocurrencyTickerModel } from '@/models/CryptocurrencyTickerModel'

export interface CryptocurrencyDetailsModel {
  cryptocurrency: string;
  tickerModel: CryptocurrencyTickerModel;
}
