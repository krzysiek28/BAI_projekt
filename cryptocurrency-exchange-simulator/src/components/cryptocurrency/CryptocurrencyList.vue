<template>
  <div class="cryptocurrencyList" >
    <div class="listContent" v-if="this.cryptocurrencyDataList.length > 0">
      <b-container class="bv-example-row">
        <b-row v-for="dataItem in this.cryptocurrencyDataList" :key="dataItem.cryptocurrency">
          <cryptocurrency-row @removedCryptocurrency="removeCryptocurrencyFromFollowedList" :cryptocurrencyDetailsModel="dataItem"/>
        </b-row>
      </b-container><br>
    </div>
    <div v-if="dataLoaded">
      <a><b>Dodatkowa kryptowaluta do śledzenia: </b></a>
      <b-form-select class="mx-auto" style="width: 100px;" v-model="availableCryptocurrenciesToFollow.selected" :options="availableCryptocurrenciesToFollow.options"></b-form-select>
      <p><b-button v-on:click="addCryptocurrencyToFollowed">Dodaj</b-button></p>
    </div>
    <div class="loader" v-if="!dataLoaded"></div>
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

  dataLoaded: boolean;

  constructor () {
    super()
    this.availableCryptocurrenciesToFollow = {
      selected: null,
      options: this.createSelectableData()
    }
    this.dataLoaded = StorageService.followedCryptocurrencies.length === 0
  }

  async mounted () {
    this.cryptocurrencyDataList = await this.fetchCryptocurrenciesData(StorageService.followedCryptocurrencies)
    this.dataLoaded = true
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

  async removeCryptocurrencyFromFollowedList (cryptocurrency: string) {
    StorageService.unfollowCryptocurrency(cryptocurrency)
    this.availableCryptocurrenciesToFollow = {
      selected: null,
      options: this.createSelectableData()
    }
    this.cryptocurrencyDataList = await this.fetchCryptocurrenciesData(StorageService.followedCryptocurrencies)
  }
}
</script>

<style scoped>
.loader {
  position: absolute;
  left: 50%;
  top: 30%;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
