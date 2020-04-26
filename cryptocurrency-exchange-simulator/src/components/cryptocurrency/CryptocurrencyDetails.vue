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
    const labels: string[] = []
    const data: number[] = []
    const buyChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Kupno',
          backgroundColor: '#f87979',
          data: data
        }
      ]
    }

    const sellChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Sprzedaż',
          backgroundColor: '#f87979',
          data: data
        }
      ]
    }

    trades.forEach(trade => {
      if (trade.type === 'buy') {
        buyChartData.labels.push(this.parseDate(trade.date))
        buyChartData.datasets[0].data.push(trade.price)
      } else if (trade.type === 'sell') {
        sellChartData.labels.push(this.parseDate(trade.date))
        sellChartData.datasets[0].data.push(trade.price)
      }
    })

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
