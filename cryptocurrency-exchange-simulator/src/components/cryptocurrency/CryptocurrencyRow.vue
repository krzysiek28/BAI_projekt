<template>
  <div class="cryptocurrencyRow">
    <h1>{{ msg }}</h1>
    <b-col>{{ msg }}</b-col>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class CryptocurrencyRow extends Vue {
    @Prop() private msg!: string;
  }
</script>

<style scoped>


</style>
