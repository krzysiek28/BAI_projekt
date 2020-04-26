import {TransactionStatus} from "@/models/TransactionModel";
<script src="../../models/TransactionModel.ts"></script>
<template>
  <b-container class="cryptoContainer">
    <b-row align-h="center">
      <b-col cols="6" sm="2" md="1">Nazwa:</b-col><b-col cols="6" sm="2" md="1"><b> {{ cryptocurrencyDetailsModel.cryptocurrency }} </b></b-col>
      <b-col cols="6" sm="2" md="1">BID:</b-col><b-col cols="6" sm="2" md="1"><b> {{ cryptocurrencyDetailsModel.tickerModel.bid }} </b></b-col>
      <b-col cols="6" sm="2" md="1">ASK:</b-col><b-col cols="6" sm="2" md="1"><b> {{ cryptocurrencyDetailsModel.tickerModel.ask }} </b></b-col>
      <b-col cols="6" sm="2" md="1">Posiadana kwota</b-col><b-col cols="6" sm="2" md="1"><b> {{ cryptocurrencyDetailsModel.ownedAmount }} </b></b-col>
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
      <p>cena kupna: {{this.cryptocurrencyDetailsModel.tickerModel.bid}}</p>

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
    <b-modal v-bind:id="this.cryptocurrencyDetailsModel.cryptocurrency + 'sell-modal'"
           title="Kupno kryptowaluty"
           @ok="handleSellCryptocurrency">

    <p>kryptowaluta: {{this.cryptocurrencyDetailsModel.cryptocurrency}}</p>
    <p>cena sprzedaży: {{this.cryptocurrencyDetailsModel.tickerModel.ask}}</p>
    <p>posiadana ilość: {{this.cryptocurrencyDetailsModel.ownedAmount}}</p>
    <p></p>

    <form ref="form" @submit.stop.prevent="submitSellingCryptocurrency">
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
      <b-button size="sm" variant="success" @click="ok()">Sprzedaj</b-button>
      <b-button size="sm" variant="danger" @click="cancel()">Anuluj</b-button>
    </template>

<!--      <cryptocurrency-transaction-sell></cryptocurrency-transaction-sell>-->
    </b-modal>
      <b-modal v-bind:id="this.cryptocurrencyDetailsModel.cryptocurrency + 'details-modal'" v-bind:title="'Szczegóły dla '+cryptocurrencyDetailsModel.cryptocurrency">
      <cryptocurrency-details v-bind:cryptocurrency=this.cryptocurrencyDetailsModel.cryptocurrency></cryptocurrency-details>
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

  /*
      BUYING MODAL HANDLING
      Move to component if possible
  */

  handleBuyCryptocurrency (bvModalEvent: Event) {
    bvModalEvent.preventDefault()
    this.submitBuyingCryptocurrency()
  }

  submitBuyingCryptocurrency () {
    // validate + check available balance StorageService.balance > bid_price * amount

    // execute Action
    this.buyCryptocurrency()
    this.reloadData()
    // Hide the modal manually
    // this.$nextTick(() => {
    //   this.$bvModal.hide('modal-prevent-closing')
    // })
  }

  buyCryptocurrency () {
    StorageService.buyCryptocurrency({
      date: new Date(),
      amount: this.amount,
      price: -(+this.amount * +this.cryptocurrencyDetailsModel.tickerModel.ask),
      bidPrice: this.cryptocurrencyDetailsModel.tickerModel.bid,
      askPrice: this.cryptocurrencyDetailsModel.tickerModel.ask,
      status: TransactionStatus.BOUGHT,
      cryptocurrency: this.cryptocurrencyDetailsModel.cryptocurrency
    })
  }

  /*
      SELLING MODAL HANDLING
      Move to component if possible
  */
  handleSellCryptocurrency (bvModalEvent: Event) {
    bvModalEvent.preventDefault()
    this.submitSellingCryptocurrency()
  }

  submitSellingCryptocurrency () {
    // validate + check available balance StorageService.balance > bid_price * amount

    // execute Action
    this.sellCryptocurrency()
    this.reloadData()
    // Hide the modal manually
    // this.$nextTick(() => {
    //   this.$bvModal.hide('modal-prevent-closing')
    // })
  }

  sellCryptocurrency () {
    StorageService.sellCryptocurrency({
      date: new Date(),
      amount: this.amount,
      price: +this.amount * +this.cryptocurrencyDetailsModel.tickerModel.bid,
      bidPrice: this.cryptocurrencyDetailsModel.tickerModel.bid,
      askPrice: this.cryptocurrencyDetailsModel.tickerModel.ask,
      status: TransactionStatus.SOLD,
      cryptocurrency: this.cryptocurrencyDetailsModel.cryptocurrency
    })
  }

  reloadData () {
    this.cryptocurrencyDetailsModel.ownedAmount = StorageService.getCryptocurrencyAmount(this.cryptocurrencyDetailsModel.cryptocurrency)
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
