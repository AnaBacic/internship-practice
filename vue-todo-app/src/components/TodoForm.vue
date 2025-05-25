<template>
  <form @submit.prevent="handleSubmit" class="space-y-2">
    <input
      v-model="title"
      class="border px-4 py-2 rounded w-full"
      placeholder="Title"
    />
    <textarea
      v-model="description"
      class="border px-4 py-2 rounded w-full"
      placeholder="Description"
    />
    <button
      class="bg-blue-300 border-2 border-blue-900 hover:bg-blue-100 text-blue-900 px-4 py-2 rounded cursor-pointer flex items-center justify-center gap-2 w-full"
      type="submit"
      :disabled="loading"
    >
      <Loader2Icon v-if="loading" class="h-4 w-4 animate-spin" />
      <span v-if="!loading">Add</span>
      <span v-else>Adding...</span>
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { addTodo } from '@/composables/useTodos'
import { Loader2Icon } from 'lucide-vue-next'

const emit = defineEmits(['added'])
const title = ref('')
const description = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  if (!title.value.trim()) return
  loading.value = true
  await addTodo(title.value, description.value)
  loading.value = false
  title.value = ''
  description.value = ''
  emit('added')
}
</script>
