<template>
  <div>
    <slot name="load" v-if="status == 'Load'"><Load /></slot>
    <slot name="notWeb3" v-else-if="status == 'NotWeb3'"><NotWeb3 /></slot>
    <slot name="depNetwork" v-else-if="status == 'DepNetwork'"><DepNetwork /></slot>
    <slot name="notAccounts" v-else-if="status == 'NotAccounts'"><NotAccounts /></slot>
    <slot name="noAccess" v-else-if="status == 'NoAccess'"><NoAccess @requestAccess="requestAccess" /></slot>
    <slot v-else></slot>
  </div>
</template>

<script>
import NotWeb3 from './NotWeb3.vue'
import DepNetwork from './DepNetwork.vue'
import NotAccounts from './NotAccounts.vue'
import NoAccess from './NoAccess.vue'
import Load from './Load.vue'

export default {
  name: 'Main',
  components: {
    NotWeb3,
    DepNetwork,
    NotAccounts,
    NoAccess,
    Load
  },
  props: {
    networks: {
      type: Array,
      default: [1]
    },
    access: {
      type: Boolean,
      default: true
    }
  },
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
    checkAccount () {
      setTimeout(() => {
        if (window.web3.eth.accounts.length > 0) {
          this.canNetwork()
        } else if (window.web3.eth.accounts.length <= 0) {
          this.status = 'NotAccounts'
        }
        this.listeningChangeAccount()
      }, 500)
    },
    async requestAccess () {
      try {
        await window.ethereum.enable()
        this.checkAccount()
      } catch (error) {
        console.log(error)
        this.status = 'NoAccess'
      }
    },
    load () {
      window.addEventListener('load', () => {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          if (this.access) {
            this.requestAccess()
          } else {
            this.canNetwork()
          }
        } else if (window.web3) {
          window.web3 = new Web3(web3.currentProvider)
          if (this.access) {
            this.checkAccount()
          } else {
            this.canNetwork()
          }
        } else {
          this.status = 'NotWeb3'
        }
      })
    }
  }
}
</script>
