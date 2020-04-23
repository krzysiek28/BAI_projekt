<template>
  <div class="managementPanel">
    <div id="nav">

      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">NavBar</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item>
              <router-link to="/">Home</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/exchange">Exchange</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/walletManagement">Wallet management</router-link>
            </b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <button v-on:click="addBalance">Add Balance</button>
            <b-nav-text>
              SALDO: {{availableBalance}} $
            </b-nav-text>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import { StorageService } from '@/services/storage.service'

export default {
  name: 'ManagementPanel',
  data () {
    return {
      availableBalance: 0,
      investedMoney: 0,
      profit: 0
    }
  },
  created () {
    this.getBalance()
  },
  methods: {
    getBalance () {
      this.availableBalance = StorageService.balance
    },

    addBalance () {
      StorageService.addToBalance()
      this.availableBalance = StorageService.balance
    }
  }
}
</script>

<style lang="css">

</style>
