<template>
    <div class="min-h-screen flex items-center justify-center bg-blue-100">
      <div class="bg-white p-8 rounded-xl shadow text-center w-full max-w-md">
        <h2 class="text-2xl font-bold text-blue-900 mb-6">Welcome to my app!</h2>
        <p class="text-blue-900 mb-6">Place for content.</p>
        <Button class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-100 hover:text-blue-900">Test button</Button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Button } from '@/components/ui/button'
  </script>
  
  <style scoped>
  </style>
  