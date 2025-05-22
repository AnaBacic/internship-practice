<template>
    <div class="fixed inset-0 bg-white/60 z-40" @click.self="emit('cancel')">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto mt-40 z-50">
        <h2 class="text-xl font-semibold mb-4">Are you sure you want to delete this task?</h2>
        <div class="flex justify-end gap-2">
          <button
            class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
            @click="emit('cancel')"
          >
            Cancel
          </button>
          <button
            class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
            @click="emit('confirm')"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const emit = defineEmits(['confirm', 'cancel'])
  </script>
  