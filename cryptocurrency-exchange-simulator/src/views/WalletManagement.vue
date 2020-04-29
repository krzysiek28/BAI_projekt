<template>
  <div class="walletManagement">
    <balance-info></balance-info>
    <transaction-history></transaction-history>
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
