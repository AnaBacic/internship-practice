<template>
  <Dialog :open="open" @update:open="emit('cancel')">
    <DialogContent class="sm:max-w-md bg-white">
      <DialogHeader>
        <DialogTitle>Delete Task</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        Are you sure you want to delete this task?
      </DialogDescription>
      <DialogFooter class="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          @click="emit('cancel')"
          class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
          :disabled="loading"
        >
          Cancel
        </Button>

        <Button
          variant="destructive"
          @click="handleDelete"
          class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer flex items-center gap-2"
          :disabled="loading"
        >
          <Loader2Icon v-if="loading" class="w-4 h-4 animate-spin" />
          <span>{{ loading ? 'Deleting...' : 'Delete' }}</span>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-vue-next'

defineProps({
  open: Boolean,
})

const emit = defineEmits(['confirm', 'cancel'])
const loading = ref(false)

const handleDelete = () => {
  loading.value = true
  setTimeout(() => {
    emit('confirm')
    loading.value = false
  }, 500)
}
</script>
