<script setup lang="ts">
import { Button } from '@/components/ui/button'
import type { IQuestion } from '@/types/test'
import { useTestStore } from '@/stores/test'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import QuestionActions from './QuestionActions.vue'

const props = defineProps<{ question: IQuestion }>()
const route = useRoute()
const store = useTestStore()

const questionText = ref(props.question.question)

function deleteQuestion() {
  store.deleteQuestion(+route.params.id, props.question.id)
}

function editQuestion(text: string) {
  questionText.value = text
}
</script>

<template>
  <div
    class="p-6 bg-blue-500 shadow-lg shadow-blue-500/50 rounded-lg text-white max-w-5xl w-full flex justify-between items-center"
  >
    <h3>
      {{ questionText }}
    </h3>
    <div class="flex gap-6 items-center">
      <span>Answers: {{ props.question.answers.length }}</span>

      <QuestionActions
        type="update"
        :question="props.question"
        @edit-question="editQuestion"
      />
      <Button variant="destructive" @click="deleteQuestion">Delete</Button>
    </div>
  </div>
</template>
