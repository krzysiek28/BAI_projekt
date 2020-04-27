<template>
  <div class="exchange">
    <H1>KURSY WALUT</H1>
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
