<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useTestStore } from '@/stores/test'
import type { ITest } from '@/types/test'

const props = defineProps<{ test: ITest }>()
const store = useTestStore()

function deleteTest() {
  store.deleteTest(props.test.id)
}
</script>

<template>
  <div
    class="p-6 bg-blue-500 shadow-lg shadow-blue-500/50 rounded-lg text-white max-w-5xl w-full flex justify-between items-center"
  >
    <span>
      {{ props.test.id }}.
      {{ props.test.title }}
    </span>
    <div class="flex gap-6">
      <RouterLink :to="`/settings/${props.test.id}`">
        <Button>Settings</Button>
      </RouterLink>
      <Button @click="deleteTest" variant="destructive">Delete</Button>
    </div>
  </div>
</template>
