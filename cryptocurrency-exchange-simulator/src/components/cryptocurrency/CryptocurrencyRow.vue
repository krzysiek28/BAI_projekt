import {TransactionStatus} from "@/models/TransactionModel";
<script src="../../models/TransactionModel.ts"></script>
<template>
  <b-container class="cryptoContainer">
    <b-row align-h="center">
      <b-col cols="6" sm="2" md="1">Name:</b-col><b-col cols="6" sm="2" md="1"><b> {{ cryptocurrencyDetailsModel.cryptocurrency }} </b></b-col>
      <b-col cols="6" sm="2" md="1">BID:</b-col><b-col cols="6" sm="2" md="1"><b> {{ cryptocurrencyDetailsModel.tickerModel.bid }} </b></b-col>
      <b-col cols="6" sm="2" md="1">ASK:</b-col><b-col cols="6" sm="2" md="1"><b> {{ cryptocurrencyDetailsModel.tickerModel.ask }} </b></b-col>
      <b-col>
        <b-button cols="6" sm="4" md="2" v-b-modal="this.cryptocurrencyDetailsModel.cryptocurrency + 'buy-modal'" variant="success">Kup</b-button>
      </b-col>
      <b-col>
        <b-button cols="6" sm="4" md="2" v-b-modal="this.cryptocurrencyDetailsModel.cryptocurrency + 'sell-modal'" variant="danger">Sprzedaj</b-button>
      </b-col>
      <b-col>
        <b-button cols="12" sm="4" md="2" v-b-modal="this.cryptocurrencyDetailsModel.cryptocurrency + 'details-modal'" variant="outline-primary">Szczegóły</b-button>
      </b-col>
    </b-row>

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
  </b-container>
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

.cryptoContainer{
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);
}

.cryptoContainer div{
  padding: 5px;
}
.cryptoContainer div div{
  align-self:center
}

.cryptoContainer div div div{
  justify-content: start;
}

</style>
