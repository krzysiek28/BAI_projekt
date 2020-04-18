const NBP_URL = 'http://api.nbp.pl/api/'
const BIT_BAY_URL = 'https://bitbay.net/API/Public/'

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
}
