<template>
    <div class="cryptocurrencyDetails">
       <line v-bind:chartdata="buyChartData"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Line } from 'vue-chartjs'
import { ApiService, OperationType } from '@/services/api.service'
import { CryptocurrencyConsts } from '@/constants/cryptocurrency.constants'
import { CryptoGraphModel, CryptoGraphModelView, ChartModel } from '@/models/CryptoGraphModel'
// import CryptoChart  from '/components/cryptocurrency/CryptoGraph.js'

@Component({
})

export default class CryptocurrencyDetails extends Vue {
@Prop()
cryptocurrency!: string;

buyLoaded = false

buyChartData!: any;
sellChartData!: any;

buyChartOptions!: {
  responsive: true;
  maintainAspectRatio: false;
}

// beforeCreate () {
//   this.fetchCryptocurrenciesDataForGraph(this.cryptocurrency)
// }

constructor () {
  super()
  this.fetchCryptocurrenciesDataForGraph(this.cryptocurrency)
}

async fetchCryptocurrenciesDataForGraph (cryptoCurrency: string) {
  const graphData = await ApiService.getCryptocurrencyInfo(cryptoCurrency.toUpperCase(), CryptocurrencyConsts.CURRENCIES.PLN, OperationType.TRADES)
  this.sortGraphData(graphData)
  this.buyLoaded = true
  console.log(this.buyLoaded)
}

sortGraphData (cryptoData: Array<any>) {
  this.buyChartData = {
    labels: [],
    datasets: [
      {
        label: 'Buy',
        backgroundColor: '#f87979',
        data: []
      }
    ]
  }

  this.sellChartData = {
    labels: [],
    datasets: [
      {
        label: 'Sell',
        backgroundColor: '#f87979',
        data: []
      }
    ]
  }

  cryptoData.forEach(element => {
    if (element.type === 'buy') {
      this.buyChartData.labels.push(element.date)
      this.buyChartData.datasets[0].data.push(element.price)
      // this.buyGraphData.push([element.date, element.price, element.amount])
    }
    else if (element.type === 'sell') {
      this.sellChartData.labels.push(element.date)
      this.sellChartData.datasets[0].data.push(element.price)
      // this.sellGraphData.push([element.date, element.price, element.amount])
    }
  })
  console.log(this.buyChartData)
  console.log(this.sellChartData)
}
}
</script>

<style scoped>

</style>
