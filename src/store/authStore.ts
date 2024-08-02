import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthStore {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

export const useAuthStore = create(
    persist<AuthStore>(
        (set) => ({
            isLoggedIn: false,
            login: () => {
                const userLocalStorage = localStorage.getItem('userLoginStatus');
                if (userLocalStorage) {
                    set({ isLoggedIn: true });
                }
            },
            logout: () => {
                set({ isLoggedIn: false });
                localStorage.removeItem('userLoginStatus')
            },
        }),
        {
            name: 'userLoginStatus',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);

