import {TransactionStatus} from "@/models/TransactionModel";
<script src="../../models/TransactionModel.ts"></script>
<template>
  <div class="cryptocurrencyRow">
    <b-col>{{ cryptocurrencyDetailsModel.cryptocurrency }}</b-col>
    <b-col>{{ cryptocurrencyDetailsModel.tickerModel.bid }}</b-col>
    <b-col>{{ cryptocurrencyDetailsModel.tickerModel.ask }}</b-col>
    <b-col>
      <b-button v-b-modal="this.cryptocurrencyDetailsModel.cryptocurrency + 'buy-modal'" variant="success">Kup</b-button>
    </b-col>
    <b-col>
      <b-button v-b-modal="this.cryptocurrencyDetailsModel.cryptocurrency + 'sell-modal'" variant="danger">Sprzedaj</b-button>
    </b-col>
    <b-col>
      <b-button v-b-modal="this.cryptocurrencyDetailsModel.cryptocurrency + 'details-modal'" variant="outline-primary">Szczegóły</b-button>
    </b-col>

    <b-modal v-bind:id="this.cryptocurrencyDetailsModel.cryptocurrency + 'buy-modal'"
             title="Kupno kryptowaluty"
             @ok="handleBuyCryptocurrency">

      <p>kryptowaluta: {{this.cryptocurrencyDetailsModel.cryptocurrency}}</p>
      <p>cena kupna: {{this.cryptocurrencyDetailsModel.tickerModel.bid}}

      <form ref="form" @submit.stop.prevent="submitBuyingCryptocurrency">
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
        <b-button size="sm" variant="success" @click="ok()">Kup</b-button>
        <b-button size="sm" variant="danger" @click="cancel()">Anuluj</b-button>
      </template>
<!--      <cryptocurrency-transaction-buy></cryptocurrency-transaction-buy>-->
    </b-modal>
    <b-modal v-bind:id="this.cryptocurrencyDetailsModel.cryptocurrency + 'sell-modal'" title="Sprzedaj">
      <cryptocurrency-transaction-sell></cryptocurrency-transaction-sell>
    </b-modal>
    <b-modal v-bind:id="this.cryptocurrencyDetailsModel.cryptocurrency + 'details-modal'" title="Szczegóły">
      <cryptocurrency-details></cryptocurrency-details>
    </b-modal>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'
  import {StorageService} from '@/services/storage.service'
  import {TransactionStatus} from '@/models/TransactionModel'
  import CryptocurrencyTransactionBuy from '@/components/cryptocurrency/CryptocurrencyTransactionBuy.vue'
  import CryptocurrencyDetails from '@/components/cryptocurrency/CryptocurrencyDetails.vue'
  import CryptocurrencyTransactionSell from '@/components/cryptocurrency/CryptocurrencyTransactionSell.vue'
  import { CryptocurrencyDetailsModel } from '@/models/CryptocurrencyDetailsModel'

  @Component({
  components: { CryptocurrencyTransactionSell, CryptocurrencyDetails, CryptocurrencyTransactionBuy }
})
export default class CryptocurrencyRow extends Vue {
  @Prop() private cryptocurrencyDetailsModel!: CryptocurrencyDetailsModel;
  amount: number = 0;

  handleBuyCryptocurrency (bvModalEvent: Event) {
    bvModalEvent.preventDefault()
    this.submitBuyingCryptocurrency()
  }

  submitBuyingCryptocurrency () {
    // validate + check available balance StorageService.balance > bid_price * amount

    // execute Action
    this.buyCryptocurrency()
    // Hide the modal manually
    // this.$nextTick(() => {
    //   this.$bvModal.hide('modal-prevent-closing')
    // })
  }

  buyCryptocurrency () {
    StorageService.buyCryptocurrency({
      date: new Date(),
      amount: this.amount,
      bidPrice: this.cryptocurrencyDetailsModel.tickerModel.bid,
      askPrice: this.cryptocurrencyDetailsModel.tickerModel.ask,
      status: TransactionStatus.BOUGHT, cryptocurrency:
      this.cryptocurrencyDetailsModel.cryptocurrency
    })
  }
}
</script>

<style scoped>

</style>
