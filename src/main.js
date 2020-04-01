import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入阿里图标库
import './assets/fonts/iconfont.css'
// 导入全局样式目录
import './assets/css/global.css'

import axios from 'axios'

Vue.prototype.$http = axios

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
axios.get