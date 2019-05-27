<template>
  <div>
    <slot
      name="error"
      v-if="state.error !== null && (state.error.type !== 'account' || account === true)"
      v-bind:state="state"
      v-bind:error="state.error"
      v-bind:message="state.error.message"
    >
      <Error :message="state.error.message"/>
    </slot>
    <slot
      name="load"
      v-else-if="state.networkId === null || (state.requireAccount === true && account === true && state.account === null)"
    >
      <Load/>
    </slot>
    <slot v-else v-bind:web3-check="state"></slot>
  </div>
</template>

<script>
import Load from "./Load.vue";
import Error from "./Error.vue";
import store from "../store";

export default {
  name: "Web3Check",
  props: {
    account: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Error,
    Load
  },
  data() {
    return {
      state: store.state
    };
  }
};
</script>
