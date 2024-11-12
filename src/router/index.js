import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      alias: '/login',
      meta: { requiresLogin: false }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { requiresLogin: false }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresLogin: true },
      children: [
        {
          path: '/',
          name: 'book',
          component: () => import('../views/subviews/BookView.vue'),
          alias: ['book', 'home'],
          meta: { requiresLogin: true, requiresRole: ['USER', 'ADMINISTRATOR', 'EMPLOYEE'] }
        },
        {
          path: 'publisher',
          name: 'publisher',
          component: () => import('../views/subviews/PublisherView.vue'),
          meta: { requiresLogin: true, requiresRole: ['ADMINISTRATOR', 'EMPLOYEE'] }
        },
        {
          path: 'reader',
          name: 'reader',
          component: () => import('../views/subviews/ReaderView.vue'),
          meta: { requiresLogin: true, requiresRole: ['ADMINISTRATOR', 'EMPLOYEE'] }
        },
        {
          path: 'employee',
          name: 'employee',
          component: () => import('../views/subviews/EmployeeView.vue'),
          meta: { requiresLogin: true, requiresRole: ['ADMINISTRATOR'] }
        },
        {
          path: 'account',
          name: 'account',
          component: () => import('../views/subviews/AccountView.vue'),
          meta: { requiresLogin: true, requiresRole: ['ADMINISTRATOR'] }
        },
        {
          path: 'tracking',
          name: 'tracking',
          component: () => import('../views/subviews/TrackingBookView.vue'),
          meta: { requiresLogin: true, requiresRole: ['USER', 'ADMINISTRATOR', 'EMPLOYEE'] }
        },
        {
          path: 'overview',
          name: 'overview',
          component: () => import('../views/subviews/OverviewView.vue'),

          meta: { requiresLogin: true, requiresRole: ['ADMINISTRATOR'] }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/ErrorView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const account = authStore.account
  const loaiTaiKhoan = account?.LoaiTaiKhoan

  if (to.meta.requiresLogin && !account) {
    return next({ name: 'login' })
  }

  if (to.meta.requiresRole) {
    const requiredRoles = to.meta.requiresRole

    if (!requiredRoles.includes(loaiTaiKhoan)) {
      return next({ name: 'NotFound' })
    }
  }

  next()
})

export default router
