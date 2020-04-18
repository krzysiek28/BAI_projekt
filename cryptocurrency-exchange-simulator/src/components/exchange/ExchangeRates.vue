<template>
  <div class="exchangeRates">
    <!--<p>{{currenciesList}}</p>-->
    <b-container class="bv-example-row">
      <b-row cols="1" cols-sm="1" cols-md="1" cols-lg="1">
        <b-col>
          <b-table striped hover :items="rates"  >
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
      rates: []
    }
  },
  created () {
    const asyncIntervals = []

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

    const clearAsyncInterval = (intervalIndex) => {
      if (asyncIntervals[intervalIndex]) {
        asyncIntervals[intervalIndex] = false
      }
    }
    setAsyncInterval(async () => {
      const promise = new Promise((resolve) => {
        setTimeout(resolve(this.fetchData()), 5000)
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
