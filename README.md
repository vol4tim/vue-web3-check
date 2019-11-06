# Quick Start

## Install

```bash
yarn add vue-web3-check
or
npm install vue-web3-check --save
```

## Use the library

```javascript
// main.js
import Vue from 'vue';
import * as Web3Check from 'vue-web3-check';

Vue.use(Web3Check, {
  Web3: typeof Web3 !== 'undefined' ? Web3 : null,
  networks: [1],
  requireAccount: true
});
```

```html
// App.vue
<template>
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
</template>
```
