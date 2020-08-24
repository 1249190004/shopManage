import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.less'
import {Form, FormItem, Input, Button, Message, MessageBox} from 'element-ui'
import './assets/fonts/iconfont.css'
import axios from "axios";

axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

axios.interceptors.response.use(config => {
  return config
})

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Input)
// Vue.use(Button)
Vue.prototype.$message = Message

Vue.prototype.$confirm = MessageBox.confirm

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
