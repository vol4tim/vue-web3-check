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
import Vue from 'vue'
import * as Web3Check from 'vue-web3-check'

Vue.use(Web3Check);
```

```html
// App.vue
<template>
  <web3-check :networks="[1]">
    <template slot="load">
      load
    </template>
    <template slot="notWeb3">
      notWeb3
    </template>
    <template slot="depNetwork">
      depNetwork
    </template>
    <template slot="NotAccounts">
      NotAccounts
    </template>
    <router-view />
  </web3-check>
</template>
```
