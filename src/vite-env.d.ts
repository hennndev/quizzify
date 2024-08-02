/// <reference types="vite/client" />

interface CourseTypes {
    id: string
    title: string
    image: string
    category: number
}


interface QuizDataTypes{
    quizTitle: string
    quizDifficulty: string
    quizCategory: number
}

type AnswersTypes = Array<AnswerTypes>
interface AnswerTypes {
    questNumber: number
    questAnswer: string | null
}

type QuestionsTypes = Array<QuestionTypes>
interface QuestionTypes {
    type: 'multiple' | 'boolean'
    difficulty: string
    category: string
    question: string
    correct_answer: string
    incorrect_answers: Array<string>
}