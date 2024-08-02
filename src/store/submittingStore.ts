import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SubmittingQuizStoreTypes {
    isSubmitQuiz: boolean
    setSubmitQuiz: (value: boolean) => void
}

export const useSubmittingStore = create(
    persist<SubmittingQuizStoreTypes>(
        (set) => ({
            isSubmitQuiz: false,
            setSubmitQuiz: (value: boolean) => {
                set({isSubmitQuiz: value})
            }
        }),
        {
            name: 'isSubmittingQuiz',
        }
    )
)