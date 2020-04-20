import axios from 'axios'
const NBP_URL = 'http://api.nbp.pl/api/'
const BIT_BAY_URL_STATS = 'https://api.bitbay.net/rest/trading/stats/'
const BIT_BAY_URL = 'https://bitbay.net/API/Public/'
const BIT_BAY_URL_PEROID_STATS = 'https://api.bitbay.net/rest/trading/candle/history/'
const TIME_PEROID_FOR_STATS = '/900?from=1543410329000&to=1543410329000'
const CRYPTO_ARRAY_PLN: string[] = ['BTC-PLN', 'ETH-PLN', 'LSK-PLN', 'LTC-PLN', 'GAME-PLN', 'DASH-PLN', 'BCC-PLN', 'BTG-PLN', 'KZC-PLN', 'XIN-PLN', 'XRP-PLN', 'ZEC-PLN', 'GNT-PLN', 'OMG-PLN', 'FTO-PLN', 'ZRX-PLN', 'PAY-PLN', 'BAT-PLN', 'REP-PLN', 'NEU-PLN', 'TRX-PLN', 'AMLT-PLN', 'EXY-PLN', 'BOB-PLN', 'LML-PLN', 'BSV-PLN', 'BCP-PLN', 'XLM-PLN', 'ALG-PLN']
const CRYPTO_ARRAY_USD: string[] = ['BTC-USD', 'ETH-USD', 'LSK-USD', 'LTC-USD', 'GAME-USD', 'DASH-USD', 'BCC-USD', 'BTG-USD', 'KZC-USD', 'XIN-USD', 'XRP-USD', 'ZEC-USD', 'GNT-USD', 'OMG-USD', 'FTO-USD', 'ZRX-USD', 'PAY-USD', 'BAT-USD', 'REP-USD', 'NEU-USD', 'TRX-USD', 'AMLT-USD', 'EXY-USD', 'BOB-USD', 'LML-USD', 'BSV-USD', 'BCP-USD', 'XLM-USD', 'ALG-USD']
const CRYPTO_ARRAY_EUR: string[] = ['BTC-EUR', 'ETH-EUR', 'LSK-EUR', 'LTC-EUR', 'GAME-EUR', 'DASH-EUR', 'BCC-EUR', 'BTG-EUR', 'KZC-EUR', 'XIN-EUR', 'XRP-EUR', 'ZEC-EUR', 'GNT-EUR', 'OMG-EUR', 'FTO-EUR', 'ZRX-EUR', 'PAY-EUR', 'BAT-EUR', 'REP-EUR', 'NEU-EUR', 'TRX-EUR', 'AMLT-EUR', 'EXY-EUR', 'BOB-EUR', 'LML-EUR', 'BSV-EUR', 'BCP-EUR', 'XLM-EUR', 'ALG-EUR']

export class ApiService {
  public static getCurrenciesInfo () {
    return fetch(NBP_URL + 'exchangerates/tables/C/')
      .then(response => response.json())
      .then(data => {
        return (data)
      }).catch(() => {
        console.log('cannot fetch data from nbp api')
        return []
      })
  }

  public static getAllCurrenciesCryptoInfo (currency: string) {
    const results: string[] = []
    const CRYPTO_ARRAY = currency === 'PLN' ? CRYPTO_ARRAY_PLN : currency === 'USD' ? CRYPTO_ARRAY_USD : CRYPTO_ARRAY_EUR
    console.log(CRYPTO_ARRAY)
    for (let i = 0; i < CRYPTO_ARRAY.length; i++) {
      const temp = this.getSingleCurrencyCryptoInfo(CRYPTO_ARRAY[i])
      if (temp !== null) {
        results.push(temp)
      }
    }
    return results
  }

  public static getSingleCurrencyCryptoInfo (item: string): any {
    axios.get(`${BIT_BAY_URL_STATS}${item}`)
      .then(response => {
        console.log(response.data.stats)
        return response.data.stats
      })
      .catch(e => {
        console.log(`cannot fetch data from BIT BAY api ERROR:\n${e}`)
        return null
      })
  }

  public static getCryptoInfoForPeroid (currency: string) {
    const results: string[] = []
    const CRYPTO_ARRAY = currency === 'PLN' ? CRYPTO_ARRAY_PLN : currency === 'USD' ? CRYPTO_ARRAY_USD : CRYPTO_ARRAY_EUR
    for (let i = 0; i < CRYPTO_ARRAY.length; i++) {
      const temp = this.getSingleCryptoInfoForPeroid(CRYPTO_ARRAY[i])
      console.log(temp)
      if (temp !== null) {
        results.push(temp)
      }
    }
    return results
  }

  public static getSingleCryptoInfoForPeroid (item: string): any {
    axios.get(`${BIT_BAY_URL_PEROID_STATS}${item}${TIME_PEROID_FOR_STATS}`)
      .then(response => {
        return response.data.items
      })
      .catch(e => {
        console.log(`cannot fetch data from BIT BAY api ERROR:\n${e}`)
        return null
      })
  }
}
