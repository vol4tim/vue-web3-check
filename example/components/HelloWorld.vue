<template>
  <div class="hello">
    <h1>HelloWorld</h1>
    <web3Check>
      <template slot="load">
        <div>loader</div>
      </template>
      <template v-slot:error="props">
        <div>
          <p>{{props.error.type}}</p>
          <p>{{props.message}}</p>
        </div>
      </template>
      <div>web3 work</div>
    </web3Check>
  </div>
</template>

<script>
import Web3Check from "../../src";

export default {
  name: "HelloWorld",
  mounted() {
    Web3Check.store.on("load", state => {
      console.log(state);
    });
  }
};
</script>
