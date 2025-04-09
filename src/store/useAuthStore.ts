import { create } from 'zustand';

const CORRECT_USERNAME = 'admin';
const CORRECT_PASSWORD = 'password123';

const useAuthStore = create<any>((set) => ({
    isAuthenticated: false,
    errorMessage: '',

    login: (username: string, password: string) => {
        if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
            set({ isAuthenticated: true, errorMessage: '' });
            return true;
        } else {
            set({ isAuthenticated: false, errorMessage: 'Invalid username or password.' });
            return false;
        }
    },

    logout: () => {
        set({ isAuthenticated: false, errorMessage: '' });
    },
}));

export default useAuthStore;