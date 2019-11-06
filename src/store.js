import createStore from './createStore';

export const ACTIONS = {
  WEB3: 'web3',
  NETWORKS: 'networks',
  UPD_NETWORK_ID: 'networkId',
  UPD_ACCOUNT: 'account',
  REQUIRE_ACCOUNT: 'requireAccount',
  FALLBACK: 'fallback',
  ERROR: 'error'
};

function reducer(state, action, data) {
  switch (action) {
    case ACTIONS.WEB3: {
      return {
        web3: data,
        error:
          state.error !== null && state.error.type === 'web3'
            ? null
            : state.error
      };
    }
    case ACTIONS.NETWORKS: {
      return {
        networks: data
      };
    }
    case ACTIONS.REQUIRE_ACCOUNT: {
      return {
        requireAccount: data
      };
    }
    case ACTIONS.FALLBACK: {
      return {
        fallback: data
      };
    }
    case ACTIONS.UPD_NETWORK_ID: {
      return {
        networkId: data.id,
        error:
          state.error !== null && state.error.type !== 'network'
            ? state.error
            : data.error !== null
            ? {
                type: 'network',
                message: data.error
              }
            : null
      };
    }
    case ACTIONS.UPD_ACCOUNT: {
      return {
        account: data,
        error:
          state.error !== null && state.error.type !== 'account'
            ? state.error
            : null
      };
    }
    case ACTIONS.ERROR: {
      return {
        error: {
          type: data.type,
          message: data.message
        }
      };
    }
    default: {
      return {};
    }
  }
}

const store = createStore(
  {
    web3: null,
    networks: [],
    networkId: null,
    account: null,
    requireAccount: false,
    fallback: null,
    error: null
  },
  reducer
);

let load = false;
store.on('update', ({ state }) => {
  if (load === false) {
    if (state.new.requireAccount === false) {
      if (state.new.networkId !== null && state.new.error === null) {
        store._event.emit('load', state.new);
        load = true;
      }
    } else {
      if (
        state.new.networkId !== null &&
        state.new.account !== null &&
        state.new.error === null
      ) {
        store._event.emit('load', state.new);
        load = true;
      }
    }
  }
});

export default store;
