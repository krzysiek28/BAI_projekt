<template>
  <div class="managementPanel">
    <div id="nav">

      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">KryptoGra</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item>
              <router-link to="/" class="text-info">Strona główna</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/exchange" class="text-info">Kursy walut</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/walletManagement" class="text-info">Zarządzanie portfelem</router-link>
            </b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-text :key="availableBalance" class="pt-0-mr-4">
              Saldo: {{availableBalance.toFixed(2)}} $
            </b-nav-text>
          </b-navbar-nav>
          <b-button v-on:click="refresh()" variant="secondary">Odśwież</b-button>
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
