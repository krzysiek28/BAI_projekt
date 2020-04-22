<template>
  <div class="cryptocurrencyRow">
    <b-col>{{ cryptocurrencyInfo.cryptocurrency }}</b-col>
    <b-col>{{ cryptocurrencyInfo.bidPrice }}</b-col>
    <b-col>{{ cryptocurrencyInfo.askPrice }}</b-col>
    <b-col>Kup</b-col>
    <b-col>Sprzedaj</b-col>
    <b-col>Details > modal</b-col>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { CryptocurrencyInfo } from '@/models/CryptocurrencyInfo'

@Component
export default class CryptocurrencyRow extends Vue {
  @Prop() private cryptocurrencyInfo!: CryptocurrencyInfo;
}
</script>

<style scoped>

</style>
