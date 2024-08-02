import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AnswerStoreTypes {
    answers: [] | AnswersTypes
    setAnswers: (answers: [] | AnswersTypes) => void
    setAnswer: (questNumber: number, questAnswer: string) => void
}

export const useAnswerStore = create(
    persist<AnswerStoreTypes>(
        (set, get) => ({
            answers: [],
            setAnswers: (answers: [] | AnswersTypes) => {
                set({answers: answers})
            },
            setAnswer: (questNumber: number, questAnswer: string) => {
                const updatedAnswers = get().answers.map(answer => {
                    if(answer.questNumber === questNumber) {
                        return {
                            ...answer,
                            questAnswer
                        }
                    } else {
                        return answer
                    }
                })
                set({answers: updatedAnswers})
            },
        }),
        {
            name: 'answers',
        }
    )
)