<template>
  <div class="TransactionHistory">
    <b-card no-body class="mx-auto shadow" style="max-width: 540px; background: #E2E2E2">
    <b-container v-if="transactionHistory && transactionHistory.length !== 0" class="transactionHistoryContainer">
      <h4><b>Historia zakupionych kryptowalut:</b></h4>
      <b-row cols="1" cols-sm="1" cols-md="1" cols-lg="1">
        <b-col>
          <b-table striped hover :fields="this.transactionHistoryLabels" :items="this.transactionHistory" >
          </b-table>
        </b-col>
      </b-row>
    </b-container>
    </b-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { TransactionModel } from '../../models/TransactionModel'
import { StorageService } from '../../services/storage.service'

@Component
export default class TransactionHistory extends Vue {
  private transactionHistory!: Array<TransactionModel>;

  private transactionHistoryLabels = [
    { key: 'date', label: 'Data' },
    { key: 'amount', label: 'Ilość' },
    { key: 'price', label: 'Bilans' },
    { key: 'bidPrice', label: 'Kupno' },
    { key: 'askPrice', label: 'Sprzedaż' },
    { key: 'status', label: 'Status' },
    { key: 'cryptocurrency', label: 'Kryptowaluta' }
  ]

  constructor () {
    super()
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
