<template>
  <div class="exchange">
    <H1>EXCHANGE VIEW</H1>
    <exchange-rates></exchange-rates>
  </div>
</template>

<script>
import ExchangeRates from '../components/exchange/ExchangeRates'

export default {
  name: 'Exchange',
  components: {
    ExchangeRates
  }
}
</script>

<style scoped>
</style>
