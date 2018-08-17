<template>
  <div>
    <slot name="load" v-if="status == 'Load'"><Load /></slot>
    <slot name="notWeb3" v-else-if="status == 'NotWeb3'"><NotWeb3 /></slot>
    <slot name="depNetwork" v-else-if="status == 'DepNetwork'"><DepNetwork /></slot>
    <slot name="notAccounts" v-else-if="status == 'NotAccounts'"><NotAccounts /></slot>
    <slot v-else></slot>
  </div>
</template>

<script>
import NotWeb3 from './NotWeb3.vue'
import DepNetwork from './DepNetwork.vue'
import NotAccounts from './NotAccounts.vue'
import Load from './Load.vue'

export default {
  name: 'Main',
  components: {
    NotWeb3,
    DepNetwork,
    NotAccounts,
    Load
  },
  props: ['networks'],
  data () {
    return {
      status: 'Load'
    }
  },
  created () {
    this.load()
  },
  methods: {
    canNetwork () {
      web3.version.getNetwork((e, r) => {
        const check = this.networks.find((item) => {
          if (Number(item) === Number(r)) {
            return true
          } else {
            return false
          }
        })
        if (check) {
          this.status = ''
        } else {
          this.status = 'DepNetwork'
        }
      })
    },
    listeningChangeAccount () {
      let [account] = web3.eth.accounts
      const accountInterval = () => {
        if (web3.eth.accounts.length <= 0) {
          this.status = 'NotAccounts'
        } else if (web3.eth.accounts[0] !== account) {
          [account] = web3.eth.accounts
          this.canNetwork()
        }
        setTimeout(() => {
          accountInterval()
        }, 1000)
      }
      accountInterval()
    },
    load () {
      window.addEventListener('load', () => {
        if (typeof web3 !== 'undefined') {
          if (web3.eth.accounts.length > 0) {
            this.canNetwork()
          } else if (web3.eth.accounts.length <= 0) {
            this.status = 'NotAccounts'
          }
          this.listeningChangeAccount()
        } else {
          this.status = 'NotWeb3'
        }
      })
    }
  }
}
</script>
