<template>
    <div class="flex items-center justify-between p-3 bg-white rounded shadow">
      <div class="flex items-center gap-3">
        <input
          type="checkbox"
          :checked="todo.is_complete"
          @change="toggleComplete"
          class="w-5 h-5 text-blue-500"
        />
  
        <div v-if="isEditing">
          <input
            v-model="editedText"
            class="border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <p
          v-else
          :class="{'line-through text-gray-400': todo.is_complete}"
        >
          {{ todo.text }}
        </p>
      </div>
  
      <div class="flex gap-2">
        <button
          v-if="isEditing"
          @click="saveEdit"
          class="text-green-600 text-sm hover:underline"
        >
          Save
        </button>
        <button
          v-else
          @click="startEdit"
          class="text-blue-600 text-sm hover:underline"
        >
          Edit
        </button>
  
        <button
          @click="deleteTodo"
          class="text-red-500 text-sm hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import supabase from '@/supabase'
  
  const props = defineProps({
    todo: Object
  })
  
  const emit = defineEmits(['updated', 'deleted'])
  
  const isEditing = ref(false)
  const editedText = ref(props.todo.text)
  
  const startEdit = () => {
    isEditing.value = true
    editedText.value = props.todo.text
  }
  
  const saveEdit = async () => {
    const { error } = await supabase
      .from('todos')
      .update({ text: editedText.value })
      .eq('id', props.todo.id)
  
    if (!error) {
      isEditing.value = false
      emit('updated')
    } else {
      console.error(error)
    }
  }
  
  const deleteTodo = async () => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', props.todo.id)
  
    if (!error) {
      emit('deleted')
    } else {
      console.error(error)
    }
  }
  
  const toggleComplete = async () => {
    const { error } = await supabase
      .from('todos')
      .update({ is_complete: !props.todo.is_complete })
      .eq('id', props.todo.id)
  
    if (!error) {
      emit('updated')
    } else {
      console.error(error)
    }
  }
  </script>
  