<template>
  <form @submit.prevent="handleSubmit" class="space-y-2">
    <input v-model="title" class="border px-4 py-2 rounded w-full" placeholder="Title" />
    <textarea v-model="description" class="border px-4 py-2 rounded w-full" placeholder="Description" />
    <button class="bg-blue-300 border-2 border-blue-900 hover:bg-blue-100 text-blue-900 px-4 py-2 rounded cursor-pointer" type="submit">
      Add
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { addTodo } from '@/composables/useTodos'

const emit = defineEmits(['added'])
const title = ref('')
const description = ref('')

const handleSubmit = async () => {
  if (!title.value.trim()) return
  await addTodo(title.value, description.value)
  title.value = ''
  description.value = ''
  emit('added')
}
</script>
