import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    component: login
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    component: Home
  }
 
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const tokenString=window.sessionStorage.getItem('token')

  if (!tokenString) {
    return next('/login')
  }
  next()
})

export default router