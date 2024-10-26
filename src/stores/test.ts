import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IAnswer, IQuestion, ITest } from '@/types/test'

export const useTestStore = defineStore('test', () => {
  const tests = ref<ITest[]>([])

  function createTest(title: string) {
    const newTest: ITest = {
      id: tests.value[tests.value.length - 1]
        ? tests.value[tests.value.length - 1].id + 1
        : 1,
      title,
      questions: [],
      createDate: new Date(),
    }

    tests.value.push(newTest)
  }

  function getTest(testId: number) {
    const testIndex = tests.value.findIndex(test => test.id === testId)

    return tests.value[testIndex]
  }

  function updateTest(title: string, testId: number) {
    const testIndex = tests.value.findIndex(test => test.id === testId)

    tests.value[testIndex] = {
      id: tests.value[testIndex].id,
      title,
      createDate: tests.value[testIndex].createDate,
      questions: tests.value[testIndex].questions,
    }
  }

  function deleteTest(testId: number) {
    const testIndex = tests.value.findIndex(test => test.id === testId)

    tests.value.splice(testIndex, 1)
  }

  function createQuestion(
    testId: number,
    question: string,
    answers: IAnswer[],
  ) {
    const testIndex = tests.value.findIndex(test => test.id === testId)

    const correctTest = tests.value[testIndex]

    const newQuestion: IQuestion = {
      id: correctTest.questions[correctTest.questions.length - 1]
        ? correctTest.questions[correctTest.questions.length - 1].id + 1
        : 1,
      question,
      answers,
    }

    correctTest.questions.push(newQuestion)
  }

  function deleteQuestion(testId: number, questionId: number) {
    const testIndex = tests.value.findIndex(test => test.id === testId)

    const correctTest = tests.value[testIndex]

    const questionIndex = correctTest.questions.findIndex(
      question => question.id === questionId,
    )

    correctTest.questions.splice(questionIndex, 1)
  }

  function updateQuestion(testId: number, questionParam: IQuestion) {
    const testIndex = tests.value.findIndex(test => test.id === testId)

    const correctTest = tests.value[testIndex]

    const questionIndex = correctTest.questions.findIndex(
      question => question.id === questionParam.id,
    )

    correctTest.questions[questionIndex] = questionParam
  }

  return {
    tests,
    createTest,
    getTest,
    updateTest,
    deleteTest,
    createQuestion,
    deleteQuestion,
    updateQuestion,
  }
})
