import { create } from "zustand"

interface MenuStoreTypes {
    isMenu: boolean
    setIsMenu: (value: boolean) => void
}

export const useMenuStore = create<MenuStoreTypes>((set) => ({
    isMenu: false,
    setIsMenu: (value: boolean) => {
        set({isMenu: value})
    }
}))