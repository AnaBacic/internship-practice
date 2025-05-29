<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div class="bg-white p-8 rounded-xl shadow w-full max-w-md text-center">
        <h2 class="text-2xl font-bold mb-6 text-blue-800">Reset Password</h2>
        <form @submit.prevent="handlePasswordReset">
          <input
            v-model="password"
            type="password"
            placeholder="New password"
            class="w-full px-4 py-2 border rounded mb-4"
            required
          />
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            :disabled="loading"
          >
            {{ loading ? 'Resetting...' : 'Set New Password' }}
          </button>
        </form>
        <p v-if="message" class="text-green-600 mt-4">{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import supabase from '@/supabase'
  
  const password = ref('')
  const loading = ref(false)
  const message = ref('')
  
  const handlePasswordReset = async () => {
    loading.value = true
    const { error } = await supabase.auth.updateUser({ password: password.value })
    loading.value = false
  
    message.value = error
      ? 'Something went wrong. Please try again.'
      : 'Password successfully updated! You can now log in.'
  }
  </script>
  