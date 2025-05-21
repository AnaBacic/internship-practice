<template>
  <div class="p-4 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Your ToDos</h1>

    <TodoForm @added="fetchTodos" />

    <div v-if="todos.length === 0" class="text-gray-500 mt-4">No tasks yet.</div>

    <div v-else>
      <h2 class="text-xl font-semibold mt-6 mb-2">
        Active Tasks ({{ activeTodos.length }})
      </h2>
      <div v-if="activeTodos.length === 0" class="text-gray-500">No active tasks</div>
      <div class="space-y-2">
        <TodoItem
          v-for="todo in activeTodos"
          :key="todo.id"
          :todo="todo"
          @updated="fetchTodos"
          @deleted="fetchTodos"
          @edit="openEditModal"
        />
      </div>

      <h2 class="text-xl font-semibold mt-6 mb-2">
        Completed Tasks ({{ completedTodos.length }})
      </h2>
      <div v-if="completedTodos.length === 0" class="text-gray-500">No completed tasks</div>
      <div class="space-y-2">
        <TodoItem
          v-for="todo in completedTodos"
          :key="todo.id"
          :todo="todo"
          @updated="fetchTodos"
          @deleted="fetchTodos"
          @edit="openEditModal"
        />
      </div>
    </div>

    <EditTodoModal
      v-if="selectedTodo"
      :todo="selectedTodo"
      @close="selectedTodo = null"
      @updated="handleUpdated"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getTodos } from '@/composables/useTodos'
import TodoItem from '@/components/TodoItem.vue'
import TodoForm from '@/components/TodoForm.vue'
import EditTodoModal from '@/components/EditTodoModal.vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { user } = useAuth()
const todos = ref([])
const selectedTodo = ref(null)
const loading = ref(true)

const fetchTodos = async () => {
  todos.value = await getTodos()
}

const openEditModal = (todo) => {
  selectedTodo.value = { ...todo }
}

const handleUpdated = () => {
  selectedTodo.value = null
  fetchTodos()
}

onMounted(async () => {
  if (!user.value) {
    router.push('/login')
    return
  }

  await fetchTodos()
  loading.value = false
})

const activeTodos = computed(() => todos.value.filter(todo => !todo.is_complete))
const completedTodos = computed(() => todos.value.filter(todo => todo.is_complete))
</script>
