<script setup lang="ts">
import type { IAnswer } from '@/types/test'

const props = defineProps<{ answer: IAnswer }>()
</script>

<template>
  <div
    class="py-2 px-3 bg-blue-500 shadow-lg shadow-blue-500/50 rounded-lg text-white max-w-5xl w-full flex justify-between items-center"
  >
    <p>
      {{ props.answer.answer }}
    </p>
    <span v-if="props.answer.isCorrect"> Correct </span>
    <span v-else>Not Correct</span>
  </div>
</template>
