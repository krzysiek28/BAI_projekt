<template>
  <div class="home">
    <H1>STRONA GŁÓWNA</H1>
    <cryptocurrency-list></cryptocurrency-list>

  </div>
</template>

<script>
import CryptocurrencyList from '@/components/cryptocurrency/CryptocurrencyList'

export default {
  name: 'Home',
  components: {
    CryptocurrencyList
  }
}
</script>
