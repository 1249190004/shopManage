import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('../components/content/Login'),
  },
  {
    path: '/home',
    component: () => import('../views/Home'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: () => import('../components/content/main/Welcome')
      },
      {
        path: '/users',
        component: () => import('../views/users/Users')
      },
      {
        path: '/roles',
        component: () => import('../views/roles/Roles')
      },
      {
        path: '/rights',
        component: () => import('../views/roles/Rights')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})
export default router
