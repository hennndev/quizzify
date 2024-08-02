import { create } from "zustand"
import { persist } from "zustand/middleware"

interface QuestionsTypes {
    questions: null | QuestionsTypes
    setQuestions: (data: null | QuestionsTypes) => void
}

export const useQuestionsStore = create(
    persist<QuestionsTypes>(
        (set) => ({
            questions: null,
            setQuestions: (data: null | QuestionsTypes) => {
                set({questions: data})
            },
        }),
        {
            name: 'questions'
        }
    )
)