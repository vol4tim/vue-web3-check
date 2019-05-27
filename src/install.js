import Web3Check from './components/Web3-check.vue';
import Plugin from './index';

const install = (Vue, options = {}) => {
  Plugin.init({ ...options });
  const key = options.prefix ? options.prefix + 'Web3Check' : 'Web3Check';
  Vue.component(key, Web3Check);
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default install;
