<template>
    <div class="cryptocurrencyDetails">
      <div>Data for CryptoBuyGraph: {{this.buyGraphData}}</div>
      <div>Data for CryptoSellGraph: {{this.sellGraphData}}</div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ApiService, OperationType } from '@/services/api.service'
import { CryptocurrencyConsts } from '@/constants/cryptocurrency.constants'
import { CryptoGraphModel } from '@/models/CryptoGraphModel'

@Component
export default class CryptocurrencyDetails extends Vue {
@Prop()
cryptocurrency!: string;

private buyGraphData: Array<CryptoGraphModel> = [];
private sellGraphData: Array<CryptoGraphModel> = [];

constructor () {
  super()
  this.fetchCryptocurrenciesDataForGraph(this.cryptocurrency)
  // this.sortGraphData(this.graphData)
}

// get data from prop and api
async fetchCryptocurrenciesDataForGraph (cryptoCurrency: string) {
  const graphData = await ApiService.getCryptocurrencyInfo(cryptoCurrency.toUpperCase(), CryptocurrencyConsts.CURRENCIES.PLN, OperationType.TRADES)
  console.log(graphData)
  this.sortGraphData(graphData)
  console.log(this.buyGraphData)
  console.log(this.sellGraphData)
}

sortGraphData (cryptoData: Array<CryptoGraphModel>) {
  cryptoData.forEach(element => {
    if (element.type === 'buy') this.buyGraphData.push(element)
    else if (element.type === 'sell') this.sellGraphData.push(element)
  })
}
}
</script>

<style scoped>

</style>
