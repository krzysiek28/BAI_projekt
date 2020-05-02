<template>
  <div class="exchange">
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
