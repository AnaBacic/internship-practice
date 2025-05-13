<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <div class="bg-white p-8 rounded-xl shadow w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-blue-800">Login</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <input v-model="email" type="email" placeholder="Email" class="w-full px-4 py-2 border rounded" required />
        <input v-model="password" type="password" placeholder="Password" class="w-full px-4 py-2 border rounded" required />
        <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-100 hover:text-blue-900">Login</button>
      </form>

      <div class="text-center my-4 text-sm text-gray-500">or</div>

      <button @click="signInWithGoogle" class="w-full border py-2 rounded hover:bg-gray-100">Login with Google</button>

      <p class="text-sm text-center mt-4">
        Don't have an account?
        <RouterLink to="/register" class="text-blue-600 hover:underline">Sign up</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import supabase from '@/supabase'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  const { error } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value })
  if (error) {
    alert('Error with login: ' + error.message)
  } else {
    router.push('/')
  }
}

const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
  if (error) alert('Error with Google login: ' + error.message)
}
</script>
