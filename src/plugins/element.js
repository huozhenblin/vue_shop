import Vue from 'vue'
import { Button } from 'element-ui'
import { Form,FormItem } from 'element-ui'
import { Input } from 'element-ui'
import {message} from 'element-ui'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(message)
Vue.prototype.$message=message

