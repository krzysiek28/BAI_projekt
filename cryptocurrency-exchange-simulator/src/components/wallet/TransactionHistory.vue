<template>
  <div class="TransactionHistory">
    <b-container v-if="transactionHistory && transactionHistory.length !== 0" class="transactionHistoryContainer">
      <h4><b>Historia zakupionych kryptowalut:</b></h4>
      <b-row cols="1" cols-sm="1" cols-md="1" cols-lg="1">
        <b-col>
          <b-table striped hover :items="this.transactionHistory" >
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { TransactionModel } from '../../models/TransactionModel'
import { StorageService } from '../../services/storage.service'

@Component
export default class TransactionHistory extends Vue {
  private transactionHistory!: Array<TransactionModel>;

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
