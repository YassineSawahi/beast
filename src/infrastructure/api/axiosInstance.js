import axios from 'axios';
import { environment } from '../../config/environment';

const axiosInstance = axios.create({
    baseURL: `${environment.apiBasePath}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        console.error("API Error: ", error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
