<template>
    <div class="flex items-center justify-center min-h-screen">
      <div class="text-center p-8 border border-gray-300 rounded-md shadow-md bg-white w-full max-w-sm">
        <h2 class="text-2xl font-bold mb-6 text-blue-900">Login</h2>
  
        <div class="mb-4">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="border p-2 rounded w-full"
          />
        </div>
  
        <div class="mb-4">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="border p-2 rounded w-full"
          />
        </div>
  
        <button
          @click="signIn"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Login
        </button>
  
        <p v-if="errorMsg" class="text-red-600 mt-4">{{ errorMsg }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import supabase from '@/supabase' 
  
  const email = ref('')
  const password = ref('')
  const errorMsg = ref('')
  const router = useRouter()
  
  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
  
    if (error) {
      errorMsg.value = error.message
    } else {
      router.push('/')
    }
  }
  </script>
  
  <style scoped>
  </style>
  