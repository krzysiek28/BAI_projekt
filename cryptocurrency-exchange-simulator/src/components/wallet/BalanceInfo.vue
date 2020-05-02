<template>
  <div m-5 class="balanceInfo">
    <b-card no-body class="mx-auto shadow my-3" style="max-width: 540px; background: #E2E2E2">
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
    <b-card no-body class="mx-auto shadow my-3" style="max-width: 540px; background: #E2E2E2">
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

    <b-card no-body class="mx-auto shadow my-3" style="max-width: 540px; background: #E2E2E2">
      <b-button v-on:click="restart()" variant="secondary">Restartuj</b-button>
    </b-card>

    <b-card no-body class="mx-auto shadow my-3" style="max-width: 540px; background: #E2E2E2">
      <b-container class="ownedCurrenciesContainer" style="position: relative">
        <h4><b>Posiadane waluty:</b></h4>
        <b-row cols="1" cols-sm="1" cols-md="1" cols-lg="1">
          <b-col>
            <b-table striped hover :fields="this.ownedCurrenciesLabels" :items="this.ownedCurrencies"></b-table>
            <b-button v-b-modal="'buySellCurrency'" variant="secondary">Kup/Sprzedaj</b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-card>

    <b-modal v-bind:id="'buySellCurrency'"
             title="Wymiana walut"
             @ok="handleCurrencyExchange">

      <form ref="form" @submit.stop.prevent="handleCurrencyExchange"
            label-for="amount-input"
            invalid-feedback="Nie podano wartości!">
        <b-form-group label-for="amount-input">
          <b-container class="cryptoContainer">
            <b-row align-h="center">
              <b-col><b-table striped hover :fields="currencyRatesLabels" :items="this.currencyRates"></b-table></b-col>
            </b-row>
            <b-row align-h="center">
              <b-col><b-form-select class="mx-auto" style="width: 100px;" v-model="currenciesToExchange.selected" :options="currenciesToExchange.options" required></b-form-select></b-col>
              <b-col><b-form-input
                id="amount-input"
                v-model="currencyAmount"
                required
              ></b-form-input></b-col>
              <b-col>
                <b-form-radio v-model="buyOrSell" value="BUY">Kup</b-form-radio>
                <b-form-radio v-model="buyOrSell" value="SELL">Sprzedaj</b-form-radio>
              </b-col>
            </b-row>
          </b-container>
        </b-form-group>
      </form>
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button size="sm" variant="success" @click="ok()">Wymień</b-button>
        <b-button size="sm" variant="danger" @click="cancel()">Anuluj</b-button>
      </template>
    </b-modal>

    <b-card no-body class="mx-auto shadow my-3" style="max-width: 540px; background: #E2E2E2">
      <b-container v-if="ownedCryptocurrencies && ownedCryptocurrencies.length !== 0" class="ownedCryptocurrenciesContainer" style="position: relative">
        <h4><b>Posiadane kryptowaluty:</b></h4>
        <b-row cols="1" cols-sm="1" cols-md="1" cols-lg="1">
          <b-col>
            <b-table striped hover :fields="this.ownedCryptoccurenciesLabels" :items="this.ownedCryptocurrencies"></b-table>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { StorageService } from '../../services/storage.service'
import { CurrencyAmountModel } from '@/models/CurrencyAmountModel'
import { EventBus } from '@/constants/EventBus'
import { CryptocurrencyConsts } from '@/constants/cryptocurrency.constants'
import { ApiService } from '@/services/api.service'
import { NBPRateModel } from '@/models/NBPRateModel'

@Component
export default class BalanceInfo extends Vue {
  balance!: number;
  investedMoney!: number;
  profit!: number;
  incomeOrLoss!: number;
  ownedCryptocurrencies!: Array<CurrencyAmountModel>;
  ownedCryptoccurenciesLabels = [
    { key: 'currency', label: 'Kryptowaluta' },
    { key: 'amount', label: 'Ilość' }
  ];

  ownedCurrencies!: Array<CurrencyAmountModel>;
  ownedCurrenciesLabels = [
    { key: 'currency', label: 'Waluta' },
    { key: 'amount', label: 'Ilość' }
  ];

  amount = 0;
  currencyAmount = 0;
  currenciesToExchange: any;
  buyOrSell = 'BUY';
  currencyRates: Array<NBPRateModel> = [];
  currencyRatesLabels = [
    { key: 'currency', label: 'Waluta' },
    { key: 'code', label: 'Kod' },
    { key: 'bid', label: 'Cena Kupna' },
    { key: 'ask', label: 'Cena Sprzedaży' }
  ];

  constructor () {
    super()
    this.balance = StorageService.balance
    this.investedMoney = StorageService.calculateInvestedMoney()
    this.profit = StorageService.calculateProfit()
    this.incomeOrLoss = StorageService.calculateTotalIncomeOrLoss()
    this.ownedCryptocurrencies = StorageService.ownedCryptocurrencies
    this.ownedCurrencies = StorageService.ownedCurrencies
    this.currenciesToExchange = {
      selected: 'EUR',
      options: [CryptocurrencyConsts.CURRENCIES.EUR, CryptocurrencyConsts.CURRENCIES.USD, CryptocurrencyConsts.CURRENCIES.GBP]
    }
  }

  async mounted () {
    const currenciesInfo = await ApiService.getCurrenciesInfo()
    currenciesInfo[0].rates.forEach(element => {
      if (element.code === CryptocurrencyConsts.CURRENCIES.EUR || element.code === CryptocurrencyConsts.CURRENCIES.USD || element.code === CryptocurrencyConsts.CURRENCIES.GBP) {
        this.currencyRates.push(element)
      }
    })
  }

  handleTransferMoney (bvModalEvent: Event) {
    this.submitTransferMoney()
  }

  submitTransferMoney () {
    if (!isNaN(this.amount)) {
      StorageService.topUpBalance(this.amount)
      this.balance = StorageService.balance
      EventBus.$emit('balance-change')
    } else {
      alert('Podana ilość nie jest liczbą')
    }
  }

  restart () {
    StorageService.reset()
    this.balance = StorageService.balance
    this.investedMoney = StorageService.calculateInvestedMoney()
    this.profit = StorageService.calculateProfit()
    this.incomeOrLoss = StorageService.calculateTotalIncomeOrLoss()
    this.ownedCryptocurrencies = StorageService.ownedCryptocurrencies
    this.ownedCurrencies = StorageService.ownedCurrencies
    EventBus.$emit('balance-change')
    EventBus.$emit('reset')
  }

  async handleCurrencyExchange () {
    if (!isNaN(this.currencyAmount)) {
      if (this.buyOrSell === 'BUY') {
        const buyingRate = this.getCurrencyRateModel().bid
        if (this.balance < buyingRate * this.currencyAmount) {
          alert('Nie masz wystarczająco środków')
        } else {
          StorageService.buyCurrency(this.currenciesToExchange.selected, this.currencyAmount, buyingRate)
          this.balance = StorageService.balance
          this.ownedCurrencies = StorageService.ownedCurrencies
        }
      } else if (this.buyOrSell === 'SELL') {
        const cryptoCurrencyTemp = StorageService.getCurrencyAmount(this.currenciesToExchange.selected)
        const sellingRate = this.getCurrencyRateModel().ask
        if (cryptoCurrencyTemp < this.currencyAmount) {
          alert('Nie posiadasz tyle ' + this.currenciesToExchange.selected)
        } else {
          StorageService.sellCurrency(this.currenciesToExchange.selected, this.currencyAmount, sellingRate)
          this.balance = StorageService.balance
          this.ownedCurrencies = StorageService.ownedCurrencies
        }
      }
      EventBus.$emit('balance-change')
    } else {
      alert('Podana ilość nie jest liczbą')
    }
  }

  private getCurrencyRateModel (): NBPRateModel {
    const currencyModel = this.currencyRates.find(element => element.code === this.currenciesToExchange.selected)
    if (currencyModel === undefined) {
      throw new Error('Currency not found')
    } else {
      return currencyModel
    }
  }
}

</script>

<style scoped>
.ownedCryptocurrenciesContainer {
  padding: 5px;
  background-color: #E2E2E2;
}
</style>
