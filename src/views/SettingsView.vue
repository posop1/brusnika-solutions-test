<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTestStore } from '@/stores/test'
import type { ITest } from '@/types/test'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EditIcon from '@/components/icons/EditIcon.vue'
import CheckIcon from '@/components/icons/CheckIcon.vue'
import TrashIcon from '@/components/icons/TrashIcon.vue'
import QuestionsList from '@/components/question/QuestionsList.vue'
import QuestionActions from '@/components/question/QuestionActions.vue'

const route = useRoute()
const router = useRouter()
const store = useTestStore()

const test = ref<ITest>()

const updatedTitle = ref<string>('')

const isUpdate = ref<boolean>(false)

function updateTest() {
  if (!updatedTitle.value.split(' ').join('')) {
    return
  }

  store.updateTest(updatedTitle.value.split(' ').join(' '), +route.params.id)
  isUpdate.value = false
}

function deleteTest() {
  store.deleteTest(+route.params.id)
  router.push('/')
}

onMounted(() => {
  test.value = store.getTest(+route.params.id)
  updatedTitle.value = test.value.title
})
</script>

<template>
  <div class="w-full flex flex-col items-center p-10">
    <RouterLink to="/">
      <Button variant="default"> Back </Button>
    </RouterLink>
    <div v-if="test" class="w-full flex flex-row pt-10 items-start">
      <div class="w-full flex items-center justify-between">
        <Input
          v-model="updatedTitle"
          placeholder="Title"
          v-if="isUpdate"
          class="max-w-xs text-3xl"
        />
        <h1 class="text-3xl" v-else>
          {{ updatedTitle }}
        </h1>
        <div class="flex px-10 gap-6">
          <Button @click="() => (isUpdate = true)" v-if="!isUpdate">
            <EditIcon />
          </Button>
          <Button @click="updateTest" v-else>
            <CheckIcon />
          </Button>
          <Button variant="destructive" @click="deleteTest">
            <TrashIcon />
          </Button>
        </div>
      </div>
      <div class="w-full">
        <div class="flex flex-row gap-6 items-center">
          <h3 class="text-3xl">Questions List</h3>
          <QuestionActions type="create" />
        </div>
        <QuestionsList :questions="test.questions" />
      </div>
    </div>
  </div>
</template>
