<template>
  <div class="balanceInfo">
    <b-card no-body class="mx-auto shadow" style="max-width: 540px; background: #E2E2E2">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-body title="Saldo">
            <b-card-text>{{this.balance.toFixed(2)}}</b-card-text>
            <b-button sm="2" v-b-modal="'transferMoney'" variant="outline-primary">Zasil portfel</b-button>
          </b-card-body>
        </b-col>
        <b-col md="6">
          <b-card-body title="Zysk">
            <b-card-text>{{this.profit.toFixed(2)}}</b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
    <b-card no-body class="mx-auto shadow" style="max-width: 540px; background: #E2E2E2">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-body title="Zainwestowane pięniądze">
            <b-card-text>{{this.investedMoney.toFixed(2)}}</b-card-text>
          </b-card-body>
        </b-col>
        <b-col md="6">
          <b-card-body title="Dochód lub utrata">
            <b-card-text>{{this.incomeOrLoss.toFixed(2)}}</b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
    <br>

    <b-modal v-bind:id="'transferMoney'"
             title="Jaką kwotą chcesz zasilić portfel?"
             @ok="handleTransferMoney">

      <form ref="form" @submit.stop.prevent="submitTransferMoney">
        <b-form-group
          label="Ilość"
          label-for="amount-input"
          invalid-feedback="Nie podano wartości!"
        >
          <b-form-input
            id="amount-input"
            v-model="amount"
            required
          ></b-form-input>
        </b-form-group>
      </form>

      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button size="sm" variant="success" @click="ok()">Zasil</b-button>
        <b-button size="sm" variant="danger" @click="cancel()">Anuluj</b-button>
      </template>
    </b-modal>

    <b-container v-if="ownedCryptocurrencies && ownedCryptocurrencies.length !== 0" class="ownedCryptocurrenciesContainer" style="position: relative">
    <h4><b>Posiadane kryptowaluty:</b></h4>
      <b-row cols="1" cols-sm="1" cols-md="1" cols-lg="1">
        <b-col>
          <b-table striped hover :items="this.ownedCryptocurrencies" >
          </b-table>
        </b-col>
      </b-row>
    </b-container>
    <br>
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
  amount = 0;

  constructor () {
    super()
    this.balance = StorageService.balance
    this.investedMoney = StorageService.calculateInvestedMoney()
    this.profit = StorageService.calculateProfit()
    this.incomeOrLoss = StorageService.calculateTotalIncomeOrLoss()
    this.ownedCryptocurrencies = StorageService.ownedCryptocurrencies
  }

  handleTransferMoney (bvModalEvent: Event) {
    this.submitTransferMoney()
  }

  submitTransferMoney () {
    if (!isNaN(this.amount)) {
      StorageService.topUpBalance(this.amount)
      this.balance = StorageService.balance
    } else {
      alert('Podana ilość nie jest liczbą')
    }
  }

  restart () {
    StorageService.reset()
  }

  transferMoney () {
    console.log('aa')
  }
}

</script>

<style scoped>
.ownedCryptocurrenciesContainer {
  padding: 5px;
  background-color: #E2E2E2;
}
</style>
