// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import mock from './mock/mock'
import echarts from 'echarts'
import VueRouserce from 'vue-resource'
import layout from  './components/Layout.vue'
import axios from 'axios'
Vue.prototype.axios = axios

Vue.prototype.$echarts=echarts
Vue.config.productionTip = false
Vue.use(VueRouserce)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { layout },
  template: '<layout/>'
})
