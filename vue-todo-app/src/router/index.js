import { createRouter, createWebHistory } from 'vue-router'
import TestPage from '../views/TestPage.vue'
import Home from '@/views/Home.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/test',
      name: 'test',
      component: TestPage
    },
  ],
})

export default router
