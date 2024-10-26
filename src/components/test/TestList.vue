<script setup lang="ts">
import { useTestStore } from '@/stores/test'
import TestItem from './TestItem.vue'

const store = useTestStore()
</script>

<template>
  <div class="flex flex-col gap-16 w-full items-center mt-16">
    <template v-for="test of store.tests" :key="test.id">
      <TestItem :test="test" />
    </template>
  </div>
</template>
