import { defineStore } from "pinia";
import AuthRepositoryImpl from "../../infrastructure/api/AuthRepositoryImpl";
import Auth from '../../domain/models/Auth';
import { environment } from '../../config/environment';

const repository = new AuthRepositoryImpl();


export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
    }),
    actions: {
        async login() {
            const { username, password } = environment;
            try {
                const response = await repository.login(username, password);
                this.token = response.access_token;
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        },
        logout() {
            this.token = null;
        },
    }
});

