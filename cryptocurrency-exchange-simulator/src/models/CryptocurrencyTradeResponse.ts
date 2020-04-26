import { CryptocurrencyTradeModel } from '@/models/CryptocurrencyTradeModel'

export interface CryptocurrencyTradeResponse {
  trades: Array<CryptocurrencyTradeModel>
}
