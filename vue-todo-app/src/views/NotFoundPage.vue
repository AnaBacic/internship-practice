<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 bg-blue-100 text-center">
    <div class="animate-bounce mb-6">
      <LucideGhost class="w-20 h-20 text-blue-300" />
    </div>
    <h1 class="text-6xl font-bold text-blue-900">404</h1>
    <p class="text-gray-700 text-lg mt-2">Oops! Page not found</p>

    <RouterLink
      to="/"
      class="mt-6 inline-flex items-center px-6 py-3 bg-blue-900 text-white rounded hover:bg-blue-700 transition cursor-pointer"
    >
      Go to Homepage
    </RouterLink>
  </div>
</template>

<script setup>
import { LucideGhost } from 'lucide-vue-next'
</script>