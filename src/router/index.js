import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/Login.vue'
import Home from '../components/Home.vue'
import welcome from '../components/welcome.vue'
import user from '../views/user.vue'

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
    component: Home,
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      component: welcome
    },
    {
      path:'/users',
      component: user
    }
  ]
  }

]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const tokenString = window.sessionStorage.getItem('token')

  if (!tokenString) {
    return next('/login')
  }
  next()
})

export default router