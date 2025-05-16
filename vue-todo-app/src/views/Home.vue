<template>
  <div class="min-h-screen flex items-center justify-center bg-blue-100">
    <div class="bg-white p-8 rounded-xl shadow text-center w-full max-w-md">
      <h2 class="text-2xl font-bold text-blue-900 mb-6">Welcome to my app!</h2>

      <div v-if="user">
        <p class="text-blue-900 mb-4">You're logged in as: <strong>{{ user.email }}</strong></p>
      </div>

      <div v-else>
        <p class="text-blue-900 mb-6">You're not logged in.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'
import supabase from '@/supabase'
import { useAuth } from '@/composables/useAuth'

const { user } = useAuth()
const router = useRouter()

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}
</script>
