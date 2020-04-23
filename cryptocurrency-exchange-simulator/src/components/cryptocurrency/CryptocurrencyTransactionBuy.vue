<template>
  <div class="cryptocurrencyTransactionBuy">
    <b-input-group prepend="Ilość" class="mt-3">
      <b-form-input :v-model="amount"></b-form-input>
      <b-input-group-append>
        <b-button variant="info">Button</b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { CryptocurrencyInfo } from '@/models/CryptocurrencyInfo'
import { StorageService } from '@/services/storage.service'
import { TransactionModel, TransactionStatus } from '@/models/TransactionModel'
import { CryptocurrencyDetailsModel } from '@/models/CryptocurrencyDetailsModel'

@Component
export default class CryptocurrencyTransactionBuy extends Vue {
  @Prop() private cryptocurrencyDetailsModel!: CryptocurrencyDetailsModel;

  amount?: number;
  buyCryptocurrency () {
    // StorageService.buyCryptocurrency(<TransactionModel> {
    //   price: 11,
    //   date: new Date(),
    //   rate: 11,
    //   amount: 1,
    //   bidPrice: +this.cryptocurrencyInfo.bidPrice,
    //   askPrice: +this.cryptocurrencyInfo.askPrice,
    //   status: TransactionStatus.BOUGHT,
    //   cryptocurrency: this.cryptocurrencyInfo.cryptocurrency
    // });
  }
}
</script>

<style scoped>

</style>
