import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'
import RegisterView from '@/views/RegisterView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/add-product',
    name: 'add-product',
    component: () => import('../views/FormProductView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/product/:id',
    name: 'detail-product',
    component: () => import('../views/ProductDetailView.vue'),
    meta: { requiresAuth: true },
  },
  { path: '/login', component: LoginView, meta: { guestOnly: true } },
  { path: '/register', component: RegisterView, meta: { guestOnly: true } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
    next('/login')
  } else if (to.meta.guestOnly && authStore.isAuthenticated()) {
    next('/')
  } else {
    next()
  }
})

export default router
