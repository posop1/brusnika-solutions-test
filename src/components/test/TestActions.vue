<script setup lang="ts">
import { ref } from 'vue'
import { useTestStore } from '@/stores/test'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useTestStore()

const title = ref<string>('')

//Нормальную валидацию не стал делать из-за нехватки времени(((
function onSubmit() {
  if (!title.value.split(' ').join('')) {
    return
  }

  store.createTest(title.value.split(' ').join(' '))
  title.value = ''

  router.push(`/settings/${store.tests[store.tests.length - 1].id}`)
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="default"> Add Test </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Test</DialogTitle>
        <DialogDescription>
          Fill in the title field. Click add when you're done.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="title" class="text-right"> Title </Label>
          <Input id="title" v-model="title" class="col-span-3" />
        </div>
      </div>

      <DialogFooter>
        <DialogClose as-child>
          <Button type="submit" @click="onSubmit"> Save changes </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
