<script setup lang="ts">
import QuestionItem from './QuestionItem.vue'
import type { IQuestion } from '@/types/test'

const props = defineProps<{ questions: IQuestion[] }>()
</script>

<template>
  <div class="flex flex-col gap-6 mt-5">
    <template
      v-for="question of props.questions"
      :key="question.id"
      v-if="props.questions.length > 0"
    >
      <QuestionItem :question="question" />
    </template>
    <div v-else class="w-full flex justify-center mt-10">
      <h3 class="text-2xl">Questions in empty</h3>
    </div>
  </div>
</template>
