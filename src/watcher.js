import store, { ACTIONS } from './store';
import Network from './network';
import Account from './account';

const Watcher = {
  isWacher: false,
  check: false,
  watch(isNewVersion = true) {
    if (this.isWacher === true) {
      return;
    }
    this.isWacher = true;
    const interval = () => {
      Network.upd()
        .then(() => {
          if (
            store.state.requireAccount &&
            (store.state.error === null || store.state.error.type !== 'network')
          ) {
            if (!isNewVersion || store.state.web3.eth.accounts.length > 0) {
              return Account.upd();
            } else if (this.check === false) {
              return Account.access().then(access => {
                this.check = true;
                if (access) {
                  return Account.upd();
                }
              });
            }
          }
        })
        .then(() => {
          setTimeout(() => {
            interval();
          }, 1000);
        });
    };
    interval();
  }
};

const checkWeb3 = Web3 => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    store.dispatch(ACTIONS.WEB3, new Web3(window.ethereum));
    Watcher.watch(true);
  } else if (window.web3) {
    store.dispatch(ACTIONS.WEB3, new Web3(window.web3.currentProvider));
    Watcher.watch(false);
  } else {
    store.dispatch(ACTIONS.ERROR, { type: 'web3', message: 'not web3' });
  }
};

export default Web3 => {
  if (document.readyState !== 'complete') {
    window.addEventListener('load', () => {
      checkWeb3(Web3);
    });
  } else {
    checkWeb3(Web3);
  }
};
