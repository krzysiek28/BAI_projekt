<template>
  <div class="walletManagement">
    <b-container>
      <b-row>
        <b-col>
          <balance-info></balance-info>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <transaction-history></transaction-history>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TransactionHistory from '../components/wallet/TransactionHistory'
import BalanceInfo from '../components/wallet/BalanceInfo'

export default {
  name: 'WalletManagement',
  components: { BalanceInfo, TransactionHistory }
}
</script>

<style scoped>
</style>
