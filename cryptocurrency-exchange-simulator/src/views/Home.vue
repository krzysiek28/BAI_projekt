<template>
  <div class="home">
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
