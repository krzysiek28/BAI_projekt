<template>
  <div class="exchangeRates">
    <p>{{currenciesList}}</p>
  </div>
</template>

<script>
import { ApiService } from '../../services/api.service'

export default {
  name: 'ExchangeRates',
  data () {
    return {
      currenciesList: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      this.currenciesList = await ApiService.getCurrenciesInfo()
    }
  }
}
</script>

<style scoped>

</style>
