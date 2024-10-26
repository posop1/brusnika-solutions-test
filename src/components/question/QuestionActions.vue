<script setup lang="ts">
import { useTestStore } from '@/stores/test'
import type { IAnswer, IQuestion } from '@/types/test'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { onMounted } from 'vue'
import AnswersList from '../answer/AnswersList.vue'

const props = defineProps<{ type: 'create' | 'update'; question?: IQuestion }>()
const emits = defineEmits(['editQuestion'])

const route = useRoute()
const store = useTestStore()

const questionText = ref<string>('')
const answers = ref<IAnswer[]>([])

const answerText = ref<string>('')
const isAnswerCorrect = ref<boolean>(false)

function addQuestions() {
  if (!questionText.value.split(' ').join('')) {
    return
  }
  store.createQuestion(
    +route.params.id,
    questionText.value.split(' ').join(' '),
    answers.value,
  )

  questionText.value = ''
  answers.value = []
}

function updateQuestion() {
  if (!questionText.value.split(' ').join('')) {
    return
  }

  if (props.question) {
    const updatedQuestion: IQuestion = {
      id: props.question.id,
      answers: answers.value,
      question: questionText.value,
    }

    store.updateQuestion(+route.params.id, updatedQuestion)
    emits('editQuestion', questionText.value)
  }
}

function addAnswer() {
  if (!answerText.value.split(' ').join('')) {
    return
  }

  const newAnswer: IAnswer = {
    answer: answerText.value.split(' ').join(' '),
    isCorrect: isAnswerCorrect.value,
  }

  answers.value.push(newAnswer)

  answerText.value = ''
  isAnswerCorrect.value = false
}

onMounted(() => {
  if (props.question && props.type === 'update') {
    questionText.value = props.question.question
    answers.value = props.question.answers
  }
})
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="default" v-if="props.type === 'create'">
        Add Question
      </Button>
      <Button variant="default" v-else> Setting </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle v-if="props.type === 'create'">Add Question</DialogTitle>
        <DialogTitle v-else>Edit Question</DialogTitle>
      </DialogHeader>
      <div class="flex flex-col gap-6">
        <div>
          <Label for="Question" class="text-right"> Question text </Label>
          <Input
            id="Question"
            v-model="questionText"
            class="col-span-3"
            placeholder="Text"
          />
        </div>

        <div class="flex flex-col gap-4">
          <span class="font-semibold">Answer List</span>
          <div class="flex gap-3">
            <Input
              v-model="answerText"
              class="col-span-3"
              placeholder="Answer Text"
            />
            <Button @click="addAnswer">Add</Button>
          </div>
          <div>
            <Checkbox id="isCorrect" v-model:checked="isAnswerCorrect" />
            <label
              for="terms"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Is correct Answer?
            </label>
          </div>
          <div>
            <AnswersList :answers="answers" />
          </div>
        </div>
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button
            type="submit"
            @click="addQuestions"
            v-if="props.type === 'create'"
          >
            Save changes
          </Button>
          <Button type="submit" @click="updateQuestion" v-else>
            Save changes
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
