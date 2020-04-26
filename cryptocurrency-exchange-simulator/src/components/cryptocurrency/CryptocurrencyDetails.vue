<template>
    <div class="cryptocurrencyDetails">
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
import { CryptocurrencyAllModel } from '@/models/CryptocurrencyAllModel'

@Component({
})

export default class CryptocurrencyDetails extends Vue {
  @Prop()
  cryptocurrency!: string;

  async mounted () {
    const tradeData: CryptocurrencyAllModel = await this.fetchTradeData()
    this.createBuyChartObject(tradeData.transactions)
  }

  async fetchTradeData (): Promise<CryptocurrencyAllModel> {
    const x = await  ApiService.getCryptocurrencyInfo(this.cryptocurrency.toUpperCase(), CryptocurrencyConsts.CURRENCIES.PLN, OperationType.ALL)
    console.log(x.transactions)
    return x
  }

  async createBuyChartObject (trades: Array<CryptocurrencyTradeModel>) {
    const buyLabels: string[] = []
    const buyData: number[] = []
    const sellLabels: string[] = []
    const sellData: number[] = []
    const buyChartData = {
      labels: buyLabels,
      datasets: [
        {
          label: 'Kupno',
          backgroundColor: '#2E8B57',
          data: buyData
        }
      ]
    }

    const sellChartData = {
      labels: sellLabels,
      datasets: [
        {
          label: 'Sprzedaż',
          backgroundColor: '#f87979',
          data: sellData
        }
      ]
    }

    trades.forEach(trade => {
      console.log(trade.type)
      if (trade.type === 'buy') {
        buyLabels.push(this.parseDate(trade.date))
        buyData.push(trade.price)
      } else if (trade.type === 'sell') {
        sellLabels.push(this.parseDate(trade.date))
        sellData.push(trade.price)
      }
    })
    // console.log(buyChartData)
    // console.log(sellChartData)

    this.createChart('cryptocurrency-buy-chart', buyChartData)
    this.createChart('cryptocurrency-sell-chart', sellChartData)
  }

  parseDate (date: number) {
    const d = new Date(date * 1000)
    const temp = this.praseZero(d.getDate()) + '.' + this.praseZero(d.getMonth()) + '.' + this.praseZero(d.getFullYear())
    return temp
  }

  praseZero (x: number) {
    if (x < 10) {
      return '0' + x
    }
    else {
      return x
    }
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
              beginAtZero: false,
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
