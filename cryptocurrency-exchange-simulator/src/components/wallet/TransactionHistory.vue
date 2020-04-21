<template>
  <div class="TransactionHistory">
    <b-container fluid>
      <b-row v-for="type in types" :key="type">
        <b-col sm="3">
          <label :for="`type-${type}`">Type <code>{{ type }}</code>:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input :id="`type-${type}`" :type="type"></b-form-input>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class TransactionHistory extends Vue {
  data () {
    return {
      types: [
        'text',
        'number',
        'email',
        'password',
        'search',
        'url',
        'tel',
        'date',
        'time',
        'range',
        'color'
      ]
    }
  }
}
</script>
<style scoped>

</style>
