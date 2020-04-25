<template>
  <div class="balanceInfo">
    <b-card no-body class="overflow-hidden" style="max-width: 540px;">
      <b-row no-gutters>
        <b-col md="4">
          <b-card-body title="Balance">
            <b-card-text>{{this.balance}}</b-card-text>
          </b-card-body>
        </b-col>
        <b-col md="4">
          <b-card-body title="Profit">
            <b-card-text>{{this.profit}}</b-card-text>
          </b-card-body>
        </b-col>
        <b-col md="4">
          <b-card-body title="Invested money">
            <b-card-text>{{this.investedMoney}}</b-card-text>
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

    <h4>Kupione kryptowaluty:</h4>
    <b-container class="bv-example-row">
      <b-row cols="1" cols-sm="1" cols-md="1" cols-lg="1">
        <b-col>
          <b-table striped hover :items="this.boughtCryptocurrencies" >
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { StorageService } from '../../services/storage.service'
import { TransactionModel, TransactionStatus } from '@/models/TransactionModel'
import { CryptocurrencyAmountModel } from '@/models/CryptocurrencyAmountModel'

@Component
export default class BalanceInfo extends Vue {
  balance!: number;
  investedMoney!: number;
  profit!: number;
  boughtCryptocurrencies!: Array<TransactionModel>;
  ownedCryptocurrencies!: Array<CryptocurrencyAmountModel>;

  constructor () {
    super()
    this.balance = StorageService.balance
    this.investedMoney = StorageService.investedMoney
    this.profit = StorageService.profit
    this.ownedCryptocurrencies = StorageService.ownedCryptocurrencies
    this.boughtCryptocurrencies = StorageService.transactionHistory.filter(element => element.status === TransactionStatus.BOUGHT)
  }
}

</script>

<style scoped>

</style>
