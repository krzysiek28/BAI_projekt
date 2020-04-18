<template>
  <div class="cryptocurrencyList">
    <b-container class="bv-example-row">
      <b-row cols="1" cols-sm="2" cols-md="4" cols-lg="4">
        <b-col>Kryptowaluta</b-col>
        <b-col>Kurs</b-col>
        <b-col>Kupno</b-col>
        <b-col>Sprzedaż</b-col>
      </b-row>
      <b-row cols="1" cols-sm="2" cols-md="4" cols-lg="4">
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CryptocurrencyList extends Vue {

}
</script>

<style scoped>

</style>
