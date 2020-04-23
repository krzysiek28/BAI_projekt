<template>
  <div class="cryptocurrencyTransactionSell">
     need to display info about owned cryptocurrency
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { CryptocurrencyInfo } from '@/models/CryptocurrencyInfo'
import { StorageService } from '@/services/storage.service'
import { TransactionModel, TransactionStatus } from '@/models/TransactionModel'

@Component
export default class CryptocurrencyTransactionSell extends Vue {
  @Prop() private cryptocurrencyInfo!: CryptocurrencyInfo;

  sellCryptocurrency () {
    // showModal
    // StorageService.sellCryptocurrency(<TransactionModel> {
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
