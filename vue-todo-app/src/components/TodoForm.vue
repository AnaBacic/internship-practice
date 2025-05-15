<template>
    <form @submit.prevent="handleSubmit" class="flex gap-2">
      <input
        v-model="newTodo"
        class="border px-4 py-2 rounded w-full"
        placeholder="Add a new task"
      />
      <button class="bg-blue-300 border-2 border-blue-900 hover:bg-blue-100 text-blue-900 px-4 py-2 rounded cursor-pointer" type="submit">Add</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { addTodo } from '@/composables/useTodos'
  
  const emit = defineEmits(['added'])
  const newTodo = ref('')
  
  const handleSubmit = async () => {
    if (!newTodo.value.trim()) return
    await addTodo(newTodo.value)
    newTodo.value = ''
    emit('added')
  }
  </script>
  