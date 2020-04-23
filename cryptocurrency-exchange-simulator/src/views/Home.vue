<template>
  <div class="home">
    <H1>HOME VIEW</H1>
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
