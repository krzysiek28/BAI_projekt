<template>
  <div class="cryptocurrencyList">
    <b-container class="bv-example-row">
      <b-row v-for="dataItem in cryptocurrecyDetails" :key="dataItem.cryptocurrency">
        <cryptocurrency-row :cryptocurrencyInfo="dataItem"/>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { CryptocurrencyInfo } from '@/models/CryptocurrencyInfo'
import { ApiService, OperationType } from '@/services/api.service'
import { CryptocurrencyConsts } from '@/constants/cryptocurrency.constants'
import CryptocurrencyRow from '@/components/cryptocurrency/CryptocurrencyRow'

@Component({
  components: {
    CryptocurrencyRow
  }
})
export default class CryptocurrencyList extends Vue {
  cryptocurrecyDetails = [
    { cryptocurrency: 'BTC', bidPrice: 10, askPrice: 11 },
    { cryptocurrency: 'BAT', bidPrice: 34, askPrice: 114 },
    { cryptocurrency: 'DASH', bidPrice: 54, askPrice: 123 },
    { cryptocurrency: 'RAT', bidPrice: 44, askPrice: 54 }
  ];

  apiData = [];

  constructor (props) {
    super(props)
    this.fetchData()
  }

  fetchData () {
    this.apiData = ApiService.getCryptocurrencyInfo(CryptocurrencyConsts.CRYPTOCURRENCIES.BTC, CryptocurrencyConsts.CURRENCIES.PLN, OperationType.MARKET)
  }
}
</script>

<style scoped>

</style>
