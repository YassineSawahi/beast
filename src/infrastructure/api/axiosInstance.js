import axios from 'axios';
import { environment } from '../../config/environment';
import { useAuthStore } from '../../application/stores/AuthStore';

const axiosInstance = axios.create({
    baseURL: `${environment.apiBasePath}`,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();
        const token = authStore.token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("API Error: ", error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const authStore = useAuthStore();
            try {
                await authStore.login();
                return axiosInstance(originalRequest);
            } catch (loginError) {
                console.error('Re-login failed:', loginError);
                return Promise.reject(loginError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
