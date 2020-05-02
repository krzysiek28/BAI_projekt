import { CryptocurrencyTickerModel } from '@/models/CryptocurrencyTickerModel'

export interface CryptocurrencyDetailsModel {
  cryptocurrency: string;
  ownedAmount: number;
  tickerModel: CryptocurrencyTickerModel;
}
