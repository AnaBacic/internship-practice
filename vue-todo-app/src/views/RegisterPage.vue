<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div class="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-center text-blue-800">Sign up</h2>
  
        <form @submit.prevent="handleRegister" class="space-y-4">
          <input v-model="email" type="email" placeholder="Email" class="w-full px-4 py-2 border rounded" required />
          <input v-model="password" type="password" placeholder="Password" class="w-full px-4 py-2 border rounded" required />
          <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-100 hover:text-blue-900">Sign up</button>
        </form>
  
        <p class="text-sm text-center mt-4">
          Have an account?
          <RouterLink to="/login" class="text-blue-600 hover:underline">Sign in</RouterLink>
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
  
  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email: email.value, password: password.value })
    if (error) {
      alert('Error with sign up: ' + error.message)
    } else {
      alert('Sign up success! Check your Email.')
      router.push('/login')
    }
  }
  </script>
  