import * as components from './components';
import install from './install';
import store, { ACTIONS } from './store';
import load from './watcher';
import Account from './account';

export default {
  install,
  store,
  components,
  ACTIONS,
  init: options => {
    if (options.networks) {
      store.dispatch(ACTIONS.NETWORKS, options.networks, false);
    }
    if (options.requireAccount) {
      store.dispatch(ACTIONS.REQUIRE_ACCOUNT, options.requireAccount, false);
    }
    if (options.fallback) {
      store.dispatch(ACTIONS.FALLBACK, options.fallback, false);
    }
    load(options.Web3);
  },
  access: () => {
    store.dispatch(ACTIONS.REQUIRE_ACCOUNT, true, false);
    return Account.access();
  }
};
