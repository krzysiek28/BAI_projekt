<template>
    <div class="cryptocurrencyDetails">
<!--       <line v-bind:chartdata="buyChartData"/>-->
      <canvas id="cryptocurrency-buy-chart"></canvas>
      <canvas id="cryptocurrency-sell-chart"></canvas>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ApiService, OperationType } from '@/services/api.service'
import { CryptocurrencyConsts } from '@/constants/cryptocurrency.constants'

import Chart from 'chart.js'
import { CryptocurrencyTradeModel } from '@/models/CryptocurrencyTradeModel'

@Component({
})

export default class CryptocurrencyDetails extends Vue {
  @Prop()
  cryptocurrency!: string;

  async mounted () {
    const tradeData: Array<CryptocurrencyTradeModel> = await this.fetchTradeData()
    this.createBuyChartObject(tradeData)
  }

  async fetchTradeData (): Promise<Array<CryptocurrencyTradeModel>> {
    return await ApiService.getCryptocurrencyInfo(this.cryptocurrency.toUpperCase(), CryptocurrencyConsts.CURRENCIES.PLN, OperationType.TRADES)
  }

  async createBuyChartObject (trades: Array<CryptocurrencyTradeModel>) {
    const labels: Date[] = []
    const data: number[] = []
    const buyChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Buy',
          backgroundColor: '#f87979',
          data: data
        }
      ]
    }

    const sellChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Sell',
          backgroundColor: '#f87979',
          data: data
        }
      ]
    }

    trades.forEach(trade => {
      if (trade.type === 'buy') {
        buyChartData.labels.push(trade.date)
        buyChartData.datasets[0].data.push(trade.price)
        // this.buyGraphData.push([element.date, element.price, element.amount])
      } else if (trade.type === 'sell') {
        sellChartData.labels.push(trade.date)
        sellChartData.datasets[0].data.push(trade.price)
        // this.sellGraphData.push([element.date, element.price, element.amount])
      }
    })

    this.createChart('cryptocurrency-buy-chart', buyChartData)
    this.createChart('cryptocurrency-sell-chart', sellChartData)
  }

  createChart (chartId: string, chartData: any) {
    const ctx = document.getElementById(chartId) as HTMLCanvasElement
    const myChart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              padding: 25
            }
          }]
        }
      }
    })
  }
}
</script>

<style scoped>

</style>
