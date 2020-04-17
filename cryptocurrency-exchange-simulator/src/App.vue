<template>
  <div id="app">
    <management-panel></management-panel>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<script>
import ManagementPanel from '@/components/ManagementPanel'
export default {
  components: {
    ManagementPanel
  }
}
</script>
