<template>
  <div class="TransactionHistory">
    <h4><b>Historia zakupionych kryptowalut:</b></h4>
    <b-container class="bv-example-row">
      <b-row cols="1" cols-sm="1" cols-md="1" cols-lg="1">
        <b-col>
          <b-table striped hover :fields="fields" :items="this.transactionHistory" >
            <template v-slot:head(date)="data">
              <span class="text-info">{{ data.label.toUpperCase() }}</span>
            </template>
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

  data () {
    return {
      fields: [
        { key: 'date', label: 'Data' },
        { key: 'amount', label: 'Wartość' },
        { key: 'price', label: 'Cena' },
        { key: 'bidPrice', label: 'Sprzedaż' },
        { key: 'askPrice', label: 'Kupno' },
        { key: 'status', label: 'Status' },
        { key: 'cryptocurrency', label: 'Kryptowaluta' }
      ]
    }
  }
}
</script>

<style scoped>
</style>
