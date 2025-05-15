<template>
    <form @submit.prevent="handleSubmit" class="flex gap-2">
      <input
        v-model="newTodo"
        class="border px-4 py-2 rounded w-full"
        placeholder="Add a new task"
      />
      <button class="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Add</button>
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
  