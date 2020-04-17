<template>
  <div class="managementPanel">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ManagementPanel'
}
</script>

<style lang="css">
 managementPanel {
   background-color: #2c3e50;
   padding: 10px;
 }
</style>
