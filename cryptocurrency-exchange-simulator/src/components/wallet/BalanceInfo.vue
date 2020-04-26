<template>
  <div class="balanceInfo">
    <b-card no-body class="overflow-hidden" style="max-width: 540px;">
      <b-row no-gutters>
        <b-col md="3">
          <b-card-body title="Balance">
            <b-card-text>{{this.balance.toFixed(2)}}</b-card-text>
          </b-card-body>
        </b-col>
        <b-col md="3">
          <b-card-body title="Profit">
            <b-card-text>{{this.profit.toFixed(2)}}</b-card-text>
          </b-card-body>
        </b-col>
        <b-col md="3">
          <b-card-body title="Invested money">
            <b-card-text>{{this.investedMoney.toFixed(2)}}</b-card-text>
          </b-card-body>
        </b-col>
        <b-col md="3">
          <b-card-body title="Income or loss">
            <b-card-text>{{this.incomeOrLoss.toFixed(2)}}</b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>

    <h4>Posiadane kryptowaluty:</h4>
    <b-container class="bv-example-row">
      <b-row cols="1" cols-sm="1" cols-md="1" cols-lg="1">
        <b-col>
          <b-table striped hover :items="this.ownedCryptocurrencies" >
          </b-table>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { StorageService } from '../../services/storage.service'
import { CryptocurrencyAmountModel } from '@/models/CryptocurrencyAmountModel'

@Component
export default class BalanceInfo extends Vue {
  balance!: number;
  investedMoney!: number;
  profit!: number;
  incomeOrLoss!: number;
  ownedCryptocurrencies!: Array<CryptocurrencyAmountModel>;

  constructor () {
    super()
    this.balance = StorageService.balance
    this.investedMoney = StorageService.calculateInvestedMoney()
    this.profit = StorageService.calculateProfit()
    this.incomeOrLoss = StorageService.calculateTotalIncomeOrLoss()
    this.ownedCryptocurrencies = StorageService.ownedCryptocurrencies
  }
}

</script>

<style scoped>

</style>
