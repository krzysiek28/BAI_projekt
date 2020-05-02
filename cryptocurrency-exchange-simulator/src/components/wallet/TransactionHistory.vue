<template>
  <div class="TransactionHistory">
    <b-card no-body class="mx-auto shadow my-3" style="max-width: 540px; background: #E2E2E2">
    <b-container v-if="transactionHistory && transactionHistory.length !== 0" class="transactionHistoryContainer">
      <h4><b>Historia zakupionych kryptowalut:</b></h4>
      <b-row cols="1" cols-sm="1" cols-md="1" cols-lg="1">
        <b-col>
          <b-table striped hover :fields="this.transactionHistoryLabels" :items="this.shortTransactionHistory" >
          </b-table>
        </b-col>
      </b-row>
    </b-container>
    </b-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { TransactionModel, ShortTransactionModel } from '../../models/TransactionModel'
import { StorageService } from '../../services/storage.service'
import { EventBus } from '@/constants/EventBus'

@Component
export default class TransactionHistory extends Vue {
  private transactionHistory!: Array<TransactionModel>;
  private shortTransactionHistory!: Array<ShortTransactionModel>;

  private transactionHistoryLabels = [
    { key: 'date', label: 'Data' },
    { key: 'amount', label: 'Ilość' },
    { key: 'price', label: 'Bilans' },
    { key: 'status', label: 'Status' },
    { key: 'cryptocurrency', label: 'Kryptowaluta' }
  ]

  constructor () {
    super()
    this.transactionHistory = StorageService.transactionHistory
    this.shortTransactionHistory = []
    this.transactionHistory.forEach(x => {
      this.shortTransactionHistory.push({
        date: x.date,
        amount: x.amount,
        price: (x.price).toFixed(3),
        status: x.status,
        cryptocurrency: x.cryptocurrency
      } as ShortTransactionModel)
    })
  }

  mounted () {
    EventBus.$on('reset', this.refreshTransactionHistory)
  }

  destroyed () {
    EventBus.$off('reset', this.refreshTransactionHistory)
  }

  refreshTransactionHistory () {
    this.transactionHistory = StorageService.transactionHistory
  }
}
</script>

<style scoped>
.transactionHistoryContainer {
  padding: 10px;
  background-color: #E2E2E2;
}
</style>
