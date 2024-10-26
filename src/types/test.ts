export interface ITest {
  id: number
  title: string
  createDate: Date
  questions: IQuestion[]
}

export interface IQuestion {
  id: number
  question: string
  answers: IAnswer[]
}

export interface IAnswer {
  answer: string
  isCorrect: boolean
}
