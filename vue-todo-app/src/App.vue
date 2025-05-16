<template>
  <div class="flex flex-col min-h-screen bg-gray-100 w-full">
    <header class="bg-blue-300 text-blue-900 p-4 shadow-md sticky top-0 z-10">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">My Todo App</h1>
        <nav class="space-x-4">
          <RouterLink to="/" class="text-gray-700 hover:text-blue-100">Home</RouterLink>
          <RouterLink to="/todos" class="text-gray-700 hover:text-blue-100">Todo list</RouterLink>

          <template v-if="!user">
            <RouterLink to="/login">
              <button
                class="bg-blue-300 border-2 border-blue-900 px-4 py-2 rounded-md hover:bg-blue-100 cursor-pointer"
              >
                Login
              </button>
            </RouterLink>
          </template>

          <template v-else>
            <button
              @click="logout"
              class="bg-blue-300 border-2 border-blue-900 px-4 py-2 rounded-md hover:bg-blue-100 cursor-pointer"
            >
              Logout
            </button>
          </template>
        </nav>
      </div>
    </header>

    <main class="flex-grow px-6 py-8 bg-gray-50">
      <RouterView />
    </main>

    <footer class="bg-gray-800 text-white p-4 w-full text-center">
      © 2025 My app. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import supabase from '@/supabase'

const router = useRouter()
const { user } = useAuth()

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/')
}
</script>

