import Vue from 'vue';
import App from './App.vue';
import Web3Check from '../src';

Vue.config.productionTip = false;

Web3Check.store.on('update', data => {
  if (
    (data.state.old.account !== null &&
      data.action.type === Web3Check.ACTIONS.UPD_ACCOUNT) ||
    (data.state.old.networkId !== null &&
      data.action.type === Web3Check.ACTIONS.UPD_NETWORK_ID)
  ) {
    window.location.reload(false);
  }
});

Vue.use(Web3Check, {
  Web3: typeof Web3 !== 'undefined' ? Web3 : null,
  networks: [1],
  requireAccount: true
});

new Vue({
  render: h => h(App)
}).$mount('#app');
