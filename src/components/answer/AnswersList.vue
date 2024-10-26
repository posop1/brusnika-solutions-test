<script setup lang="ts">
import type { IAnswer } from '@/types/test'
import AnswersItem from './AnswersItem.vue'

const props = defineProps<{ answers: IAnswer[] }>()
</script>

<template>
  <div class="flex flex-col gap-3">
    <template v-for="answer of props.answers" :key="answer.answer">
      <AnswersItem :answer="answer" />
    </template>
  </div>
</template>
