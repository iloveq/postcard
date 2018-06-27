// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* jshint esversion: 6 */
//import Vue from 'vue';
//import 'element-ui/lib/theme-chalk/index.css';
//import ElementUI from 'element-ui';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
import store from './store/index';

Vue.config.productionTip = false;

//Vue.use(ElementUI);
Vue.use(VueResource);


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
