import { create } from "zustand"
import { persist } from "zustand/middleware"

interface QuizStoreTypes {
    quizData: null | QuizDataTypes
    setQuizData: (quizData: null | QuizDataTypes) => void
    getQuizData: () => void
}

export const useQuizStore = create(
    persist<QuizStoreTypes>(
        (set) => ({
            quizData: null,
            setQuizData: (quizData: null | QuizDataTypes) => {
                set({quizData: quizData})
            },
            getQuizData: () => {
                const quizData = JSON.parse(localStorage.getItem('quizData') as string)
                if(quizData) {
                    set({quizData: quizData})
                }
            }
        }),
        {
            name: 'quizData'
        }
    )
)