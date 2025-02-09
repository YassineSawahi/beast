import { defineStore } from "pinia";
import AuthRepositoryImpl from "../../infrastructure/api/AuthRepositoryImpl";
import Auth from '../../domain/models/Auth';
import { environment } from '../../config/environment';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: Auth.getToken(),
    }),
    actions: {
        async login() {
            const { username, password } = environment;
            try {
                const response = await AuthRepositoryImpl.login(username, password);
                this.token = response.token;
                Auth.setToken(response.token);
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        },
        logout() {
            Auth.clearToken();
            this.token = null;
        },
        loadToken() {
            this.token = Auth.getToken();
        }
    }
});

