import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserStoreTypes {
    username: string | null
    setUsername: (usernameVal: string | null) => void
    getUsername: () => void
}

export const useUserStore = create(
    persist<UserStoreTypes>(
        (set) => ({
            username: null,
            setUsername: (usernameVal: string | null) => {
                if(usernameVal) {
                    set({username: usernameVal})
                } else {
                    localStorage.removeItem('username')
                }
            },
            getUsername: () => {
                const username = localStorage.getItem('username')
                if(username) {
                    set({username: username})
                }
            }
        }),
        {
            name: 'username'
        }
    )
)