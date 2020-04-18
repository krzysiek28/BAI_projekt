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
    this.fetchData()
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
