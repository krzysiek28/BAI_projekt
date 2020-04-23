<template>
  <div class="cryptocurrencyList">
    <b-container class="bv-example-row">
      <b-row v-for="dataItem in this.cryptocurrencyDataList" :key="dataItem.cryptocurrency">
        <cryptocurrency-row :cryptocurrencyDetailsModel="dataItem"/>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ApiService, OperationType } from '@/services/api.service'
import { CryptocurrencyConsts } from '@/constants/cryptocurrency.constants'
import CryptocurrencyRow from '@/components/cryptocurrency/CryptocurrencyRow.vue'
import { StorageService } from '@/services/storage.service'
import { CryptocurrencyDetailsModel } from '@/models/CryptocurrencyDetailsModel'

@Component({
  components: {
    CryptocurrencyRow
  }
})
export default class CryptocurrencyList extends Vue {
  cryptocurrencyDataList: Array<CryptocurrencyDetailsModel> = [];

  followedList: Array<string>;

  constructor () {
    super()
    this.followedList = StorageService.followedCryptocurrencies
    this.fetchCryptocurrenciesData(this.followedList)
  }

  async fetchCryptocurrenciesData (cryptocurrencyFollowedList: Array<string>) {
    let cryptocurrenciesDataList = []
    for (const cryptocurrency of cryptocurrencyFollowedList) {
      const cryptocurrencyDetails = await ApiService.getCryptocurrencyInfo(cryptocurrency.toUpperCase(), CryptocurrencyConsts.CURRENCIES.PLN, OperationType.TICKER)
      cryptocurrenciesDataList.push({ cryptocurrency: cryptocurrency, tickerModel: cryptocurrencyDetails })
    }
    this.cryptocurrencyDataList = cryptocurrenciesDataList
  }
}
</script>

<style scoped>

</style>
