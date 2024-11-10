import { useBookStore } from '@/stores/useBookStore'
import { usePublisherStore } from '@/stores/usePublisherStore'
import { useReaderStore } from '@/stores/useReaderStore'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      alias: '/login'
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),

      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/subviews/HomeView.vue'),
          alias: 'home'
        },
        {
          path: 'book',
          name: 'book',
          component: () => import('../views/subviews/BookView.vue')
        },
        {
          path: 'publisher',
          name: 'publisher',
          component: () => import('../views/subviews/PublisherView.vue')
        },
        {
          path: 'reader',
          name: 'reader',
          component: () => import('../views/subviews/ReaderView.vue')
        },
        {
          path: 'employee',
          name: 'employee',
          component: () => import('../views/subviews/EmployeeView.vue')
        },
        {
          path: 'account',
          name: 'account',
          component: () => import('../views/subviews/AccountView.vue')
        },
        {
          path: 'tracking',
          name: 'tracking',
          component: () => import('../views/subviews/TrackingBookView.vue')
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

export default router
