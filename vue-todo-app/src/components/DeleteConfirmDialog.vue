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
        <Button type="button" @click="emit('cancel')" class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer">Cancel</Button>
        <Button variant="destructive" @click="emit('confirm')" class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">Delete</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

defineProps({
  open: Boolean,
})

const emit = defineEmits(['confirm', 'cancel'])
</script>
