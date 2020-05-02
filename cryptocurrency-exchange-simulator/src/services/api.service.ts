import { NBPResponseModel } from '@/models/NBPResponseModel'

const NBP_URL = 'http://api.nbp.pl/api/'
const BIT_BAY_URL = 'https://bitbay.net/API/Public/'

export class ApiService {
  public static getCurrenciesInfo (): Promise<Array<NBPResponseModel>> {
    return fetch(NBP_URL + 'exchangerates/tables/C/')
      .then(response => response.json())
      .then(data => {
        return (data)
      }).catch(() => {
        console.log('cannot fetch data from nbp api')
        return []
      })
  }

  public static getCryptocurrencyInfo (cryptocurrency: string, currency: string, operationType: OperationType) {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const targetUrl = BIT_BAY_URL + cryptocurrency + currency + '/' + operationType + '.json'
    return fetch(proxyUrl + targetUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        return (data)
      }).catch(() => {
        console.log('cannot fetch data from bit_bay api')
        return []
      })
  }
}

export enum OperationType {
  TRADES = 'trades',
  ORDERBOOK = 'orderbook',
  MARKET = 'market',
  TICKER = 'ticker',
  ALL = 'all'
}
