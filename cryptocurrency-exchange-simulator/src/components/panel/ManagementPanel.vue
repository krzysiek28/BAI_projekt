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
            <button v-on:click="refresh()">Refresh</button>
            <b-nav-text :key="availableBalance">
              SALDO: {{availableBalance.toFixed(2)}} $
            </b-nav-text>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { StorageService } from '@/services/storage.service'

@Component
export default class ManagementPanel extends Vue {
  availableBalance: number;
  // investedMoney: number;
  // profit: number;

  constructor () {
    super()
    this.availableBalance = StorageService.balance
  }

  refresh () {
    this.availableBalance = StorageService.balance
  }
}
</script>

<style lang="css">

</style>
