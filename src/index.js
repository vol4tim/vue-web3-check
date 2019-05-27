import * as components from './components';
import install from './install';
import store, { ACTIONS } from './store';
import load from './watcher';
import Account from './account';

export { components, ACTIONS };

export default {
  install: install,
  init: options => {
    if (options.networks) {
      store.dispatch(ACTIONS.NETWORKS, options.networks, false);
    }
    if (options.requireAccount) {
      store.dispatch(ACTIONS.REQUIRE_ACCOUNT, options.requireAccount, false);
    }
    load(options.Web3);
  },
  store: store,
  access: () => {
    store.dispatch(ACTIONS.REQUIRE_ACCOUNT, true, false);
    return Account.access();
  }
};
