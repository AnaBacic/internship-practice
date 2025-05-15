<template>
    <div class="p-4 max-w-xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Your ToDos</h1>
  
      <TodoForm @added="fetchTodos" />
      <div v-if="todos.length === 0" class="text-gray-500 mt-4">No tasks yet.</div>
  
      <div v-else class="space-y-2 mt-4">
        <TodoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @updated="fetchTodos"
          @deleted="fetchTodos"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { getTodos } from '@/composables/useTodos'
  import TodoItem from '@/components/TodoItem.vue'
  import TodoForm from '@/components/TodoForm.vue'
  
  const todos = ref([])
  
  const fetchTodos = async () => {
    todos.value = await getTodos()
  }
  
  onMounted(fetchTodos)
  </script>
  