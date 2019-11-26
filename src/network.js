import store, { ACTIONS } from "./store";

export default {
  check(network) {
    const check = store.state.networks.find(item => {
      if (Number(item) === network) {
        return true;
      } else {
        return false;
      }
    });
    return Boolean(check);
  },
  upd() {
    return store.state.web3.eth.net.getId().then(r => {
      if (Number(r) !== store.state.networkId) {
        if (this.check(Number(r))) {
          store.dispatch(ACTIONS.UPD_NETWORK_ID, {
            id: Number(r),
            error: null
          });
        } else {
          store.dispatch(ACTIONS.UPD_NETWORK_ID, {
            id: Number(r),
            error: "dep network"
          });
        }
      }
    });
  }
};
