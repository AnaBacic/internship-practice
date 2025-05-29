<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div class="bg-white p-8 rounded-xl shadow w-full max-w-md text-center">
        <h2 class="text-2xl font-bold mb-6 text-blue-800">Forgot Password</h2>
  
        <form @submit.prevent="handleReset">
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full px-4 py-2 border rounded mb-4"
            required
          />
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            :disabled="loading"
          >
            {{ loading ? 'Sending...' : 'Send Reset Link' }}
          </button>
        </form>
  
        <p v-if="message" class="text-green-600 mt-4">{{ message }}</p>
        <p v-if="errorMessage" class="text-red-600 mt-4">{{ errorMessage }}</p>
  
        <RouterLink to="/login" class="text-sm text-blue-600 hover:underline mt-4 inline-block">
          Back to Login
        </RouterLink>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import supabase from '@/supabase'
  
  const email = ref('')
  const loading = ref(false)
  const message = ref('')
  const errorMessage = ref('')
  
  const redirectTo =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3000/reset-password'
      : 'https://internship-practice.vercel.app/reset-password'
  
  const handleReset = async () => {
    message.value = ''
    errorMessage.value = ''
    loading.value = true
  
    const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo,
    })
  
    loading.value = false
  
    if (error) {
      errorMessage.value = error.message || 'Something went wrong. Please try again.'
    } else {
      message.value = 'Check your email for the reset link.'
    }
  }
  </script>
  