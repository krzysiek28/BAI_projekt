<template>
  <div class="exchangeRates">
    <b-container class="bv-example-row">
      <b-row cols="1" cols-sm="1" cols-md="1" cols-lg="1">
        <b-col>
          <b-table striped hover :fields="currencyTableLabels" :items="rates"  >
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { ApiService } from '../../services/api.service'

export default {
  name: 'ExchangeRates',
  data () {
    return {
      currenciesList: [],
      currencyTableLabels: [
        { key: 'currency', label: 'Waluta' },
        { key: 'code', label: 'Kod' },
        { key: 'bid', label: 'Kupno' },
        { key: 'ask', label: 'Sprzedaż' }
      ],
      rates: []
    }
  },
  created () {
    const asyncIntervals = []

    const intervalId = window.setInterval(() => { return 0 }, 9999)
    for (let i = 1; i < intervalId; i++) { window.clearInterval(i) }
    const clearAsyncInterval = (intervalIndex) => {
      if (asyncIntervals[intervalIndex]) {
        asyncIntervals[intervalIndex] = false
      }
    }

    const runAsyncInterval = async (cb, interval, intervalIndex) => {
      await cb()
      if (asyncIntervals[intervalIndex]) {
        setTimeout(() => runAsyncInterval(cb, interval, intervalIndex), interval)
      }
    }

    const setAsyncInterval = (cb, interval) => {
      if (cb && typeof cb === 'function') {
        const intervalIndex = asyncIntervals.length
        asyncIntervals.push(true)
        runAsyncInterval(cb, interval, intervalIndex)
        return intervalIndex
      } else {
        throw new Error('Callback must be a function')
      }
    }

    setAsyncInterval(async () => {
      const promise = new Promise((resolve) => {
        setTimeout(resolve(this.fetchData()), 1000)
      })
      await promise
    }, 5000)
  },
  methods: {
    async fetchData () {
      this.currenciesList = await ApiService.getCurrenciesInfo()
      this.rates = this.currenciesList[0].rates
    }
  }
}
</script>

<style scoped>

</style>
