import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message
} from 'element-ui'
// 插件注册
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Message)
// 全局挂载
Vue.prototype.$message = Message