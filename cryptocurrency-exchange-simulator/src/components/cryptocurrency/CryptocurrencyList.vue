<template>
  <div class="cryptocurrencyList">
    <b-container class="bv-example-row">
      <b-row v-for="dataItem in this.cryptocurrencyDataList" :key="dataItem.cryptocurrency">
        <cryptocurrency-row :cryptocurrencyDetailsModel="dataItem"/>
      </b-row>
    </b-container><br>
    <a><b>Dodatkowa kryptowaluta do śledzenia: </b></a>
    <b-form-select class="mx-auto" style="width: 100px;" v-model="availableCryptocurrenciesToFollow.selected" :options="availableCryptocurrenciesToFollow.options"></b-form-select>
    <p><b-button v-on:click="addCryptocurrencyToFollowed">Dodaj</b-button></p>
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

  availableCryptocurrenciesToFollow: any;

  constructor () {
    super()
    this.availableCryptocurrenciesToFollow = {
      selected: null,
      options: this.createSelectableData()
    }
  }

  async mounted () {
    this.cryptocurrencyDataList = await this.fetchCryptocurrenciesData(StorageService.followedCryptocurrencies)
  }

  createSelectableData () {
    return StorageService.getAvailableCurrenciesToFollow()
  }

  async fetchCryptocurrenciesData (cryptocurrencyFollowedList: Array<string>) {
    const cryptocurrenciesDataList = []
    for (const cryptocurrency of cryptocurrencyFollowedList) {
      const cryptocurrencyDetails = await ApiService.getCryptocurrencyInfo(cryptocurrency.toUpperCase(), CryptocurrencyConsts.CURRENCIES.PLN, OperationType.TICKER)
      const ownedAmount = StorageService.getCryptocurrencyAmount(cryptocurrency)
      cryptocurrenciesDataList.push({ cryptocurrency: cryptocurrency, ownedAmount: ownedAmount, tickerModel: cryptocurrencyDetails })
    }
    return cryptocurrenciesDataList
  }

  async addCryptocurrencyToFollowed () {
    StorageService.addCryptocurrencyToFollowedList(this.availableCryptocurrenciesToFollow.selected)
    this.availableCryptocurrenciesToFollow = {
      selected: null,
      options: this.createSelectableData()
    }
    this.cryptocurrencyDataList = await this.fetchCryptocurrenciesData(StorageService.followedCryptocurrencies)
  }
}
</script>

<style scoped>

</style>
