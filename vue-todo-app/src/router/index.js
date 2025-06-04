import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import TodoPage from '@/views/TodoPage.vue'
import supabase from '@/supabase'
import NotFoundPage from '@/views/NotFoundPage.vue'
import ForgotPassword from '@/views/Forgotpassword.vue'
import ResetPassword from '@/views/ResetPassword.vue'


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
      path: '/todos',
      name: 'Todos',
      component: TodoPage,
      beforeEnter: async (to, from, next) => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundPage
    },
    {
      path: '/forgot-password',
      component: ForgotPassword
    },
    {
      path: '/reset-password',
      component: ResetPassword
    }
  ],
})

export default router