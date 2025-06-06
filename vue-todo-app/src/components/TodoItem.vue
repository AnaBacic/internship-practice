<template>
  <div
    :class="[
      'p-4 rounded-lg shadow-sm flex items-center justify-between border transition',
      localTodo.is_complete
        ? 'bg-blue-900 border-2 border-blue-300'
        : 'bg-blue-300 border-2 border-blue-900 hover:bg-blue-100 cursor-default'
    ]"
  >
    <label class="flex items-center cursor-pointer w-full">
      <input
        type="checkbox"
        v-model="localTodo.is_complete"
        @change="updateTodo"
        class="form-checkbox h-5 w-5 text-blue-200 mr-4"
        :aria-label="`Mark task '${localTodo.title}' as complete`"
      />
      <div class="flex-1">
        <span
          class="block font-semibold text-lg"
          :class="{
            'line-through text-blue-100': localTodo.is_complete,
            'text-blue-900': !localTodo.is_complete
          }"
        >
          {{ localTodo.title }}
        </span>
        <p
          class="text-sm"
          :class="{
            'line-through text-blue-100': localTodo.is_complete,
            'text-blue-900': !localTodo.is_complete
          }"
        >
          {{ localTodo.description }}
        </p>
      </div>
    </label>

    <div class="flex items-center gap-2 ml-4">
      <button
        @click="emit('edit', localTodo)"
        class="text-white hover:text-yellow-300 cursor-pointer"
        aria-label="Edit task"
      >
        <PencilIcon class="w-5 h-5" />
      </button>
      <button
        @click="requestDelete"
        class="text-white hover:text-red-300 cursor-pointer"
        aria-label="Delete task"
      >
        <TrashIcon class="w-5 h-5" />
      </button>
    </div>

    <DeleteConfirmDialog
      :open="showConfirm"
      @confirm="confirmDelete"
      @cancel="showConfirm = false"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { updateTodoInDb, deleteTodoFromDb } from '@/composables/useTodos'
import { TrashIcon, PencilIcon } from '@heroicons/vue/24/solid'
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog.vue'

const props = defineProps({
  todo: Object,
})

const emit = defineEmits(['updated', 'deleted', 'edit'])

const localTodo = ref({ ...props.todo })
const showConfirm = ref(false)

watch(
  () => props.todo,
  (newVal) => {
    localTodo.value = { ...newVal }
  }
)

const updateTodo = async () => {
  await updateTodoInDb(localTodo.value)
  emit('updated')
}

const requestDelete = () => {
  showConfirm.value = true
}

const confirmDelete = async () => {
  await deleteTodoFromDb(localTodo.value.id)
  emit('deleted')
  showConfirm.value = false
}
</script>
