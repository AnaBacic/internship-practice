<template>
    <div
      :class="[
        'p-4 rounded-lg shadow-sm flex items-center justify-between border transition',
        localTodo.is_complete
          ? 'bg-blue-900 border-2 border-blue-300'
          : 'bg-blue-300 border-2 border-blue-900 hover:bg-blue-100 cursor-default'
      ]"
    >
      <input
        type="checkbox"
        v-model="localTodo.is_complete"
        @change="updateTodo"
        class="form-checkbox h-5 w-5 text-blue-200 mr-4 cursor-pointer"
      />
  
      <div class="flex-1" @dblclick="startEdit">
        <template v-if="isEditing">
          <input
            v-model="editedText"
            @keyup.enter="saveEdit"
            @blur="cancelEdit"
            class="border-b border-blue-300 focus:outline-none w-full bg-transparent text-blue-900"
            type="text"
            autofocus
          />
        </template>
        <template v-else>
          <span
            :class="{
              'line-through text-blue-100': localTodo.is_complete,
              'text-blue-900': !localTodo.is_complete,
            }"
          >
            {{ localTodo.text }}
          </span>
        </template>
      </div>
  
      <button
  @click="deleteTodo"
  class="ml-4 text-white hover:text-red-300 cursor-pointer"
  aria-label="Delete task"
>
  <TrashIcon class="w-5 h-5" />
</button>

    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { updateTodoInDb, deleteTodoFromDb } from '@/composables/useTodos'
  import { TrashIcon } from '@heroicons/vue/24/solid'

  
  const props = defineProps({
    todo: Object,
  })
  
  const emit = defineEmits(['updated', 'deleted'])
  
  const localTodo = ref({ ...props.todo })
  const isEditing = ref(false)
  const editedText = ref(localTodo.value.text)
  
  watch(
    () => props.todo,
    (newVal) => {
      localTodo.value = { ...newVal }
      editedText.value = newVal.text
    }
  )
  
  const updateTodo = async () => {
    await updateTodoInDb(localTodo.value)
    emit('updated')
  }
  
  const deleteTodo = async () => {
    await deleteTodoFromDb(localTodo.value.id)
    emit('deleted')
  }
  
  const startEdit = () => {
    if (localTodo.value.is_complete) return
    isEditing.value = true
    editedText.value = localTodo.value.text
  }
  
  const saveEdit = async () => {
    if (!editedText.value.trim()) {
      editedText.value = localTodo.value.text
      isEditing.value = false
      return
    }
    localTodo.value.text = editedText.value.trim()
    isEditing.value = false
    await updateTodo()
  }
  
  const cancelEdit = () => {
    isEditing.value = false
    editedText.value = localTodo.value.text
  }
  </script>
  