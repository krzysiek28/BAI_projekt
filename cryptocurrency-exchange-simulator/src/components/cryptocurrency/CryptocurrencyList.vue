<template>
  <div class="cryptocurrencyList">

    <b-container class="bv-example-row">
      <b-row cols="1" cols-sm="1" cols-md="1" cols-lg="1">
        <b-col>
          <b-table striped hover :items="currency" ></b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CryptocurrencyList extends Vue {
  data () {
    return {
      currency: [
        { cryptocurrency: 'BitCoin', exchange: 150, buy: 'KUP', sell: 'SPRZEDAJ', details: 'Szczegóły' },
        { cryptocurrency: 'BitCoin2', exchange: 155, buy: 'KUP', sell: 'SPRZEDAJ', details: 'Szczegóły' },
        { cryptocurrency: 'BitCoin3', exchange: 151, buy: 'KUP', sell: 'SPRZEDAJ', details: 'Szczegóły' },
        { cryptocurrency: 'BitCoin4', exchange: 152, buy: 'KUP', sell: 'SPRZEDAJ', details: 'Szczegóły' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
