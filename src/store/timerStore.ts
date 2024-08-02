import { create } from "zustand"
import { persist } from "zustand/middleware"

interface TimerStoreTypes {
    timer: null | number
    setTimer: (value: null | number) => void
}

export const useTimerStore = create(
    persist<TimerStoreTypes>(
        (set) => ({
            timer: null,
            setTimer: (value: null | number) => {
                set({timer: value})
            }
        }),
        {
            name: 'timer'
        }
    )
)