import store, { ACTIONS } from './store';

export default {
  async access() {
    try {
      await window.ethereum.enable();
      if (store.state.web3.eth.accounts.length > 0) {
        return true;
      } else {
        store.dispatch(ACTIONS.ERROR, {
          type: 'account',
          message: 'not account'
        });
        return false;
      }
    } catch (e) {
      store.dispatch(ACTIONS.ERROR, { type: 'account', message: 'no access' });
      return false;
    }
  },
  upd() {
    return new Promise(resolve => {
      store.state.web3.eth.getAccounts((e, accounts) => {
        if (accounts.length > 0) {
          const account = accounts[0].toString();
          if (account !== store.state.account) {
            store.dispatch(ACTIONS.UPD_ACCOUNT, account);
          }
        } else {
          store.dispatch(ACTIONS.ERROR, {
            type: 'account',
            message: 'not account'
          });
        }
        resolve();
      });
    });
  }
};
