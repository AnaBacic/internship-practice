<template>
    <div class="fixed inset-0 bg-white/60 flex items-center justify-center z-50" @click.self="emit('close')">
      <div class="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Edit Task</h2>
  
        <form @submit.prevent="saveChanges" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <input
              v-model="editedTodo.title"
              class="mt-1 block w-full border rounded px-3 py-2"
              required
            />
          </div>
  
          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="editedTodo.description"
              class="mt-1 block w-full border rounded px-3 py-2"
              rows="3"
              required
            ></textarea>
          </div>
  
          <div class="flex justify-end gap-2">
            <button type="button" @click="emit('close')" class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { updateTodoInDb } from '@/composables/useTodos'
  
  const props = defineProps({
    todo: Object,
  })
  
  const emit = defineEmits(['close', 'updated'])
  
  const editedTodo = ref({ ...props.todo })
  
  watch(
    () => props.todo,
    (newVal) => {
      editedTodo.value = { ...newVal }
    }
  )
  
  const saveChanges = async () => {
    if (!editedTodo.value.title.trim() || !editedTodo.value.description.trim()) return
  
    await updateTodoInDb(editedTodo.value)
    emit('updated')
  }
  </script>
  