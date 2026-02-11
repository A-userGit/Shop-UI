import axios, {type InternalAxiosRequestConfig} from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URI;
const REQUEST_TIMEOUT = 1000

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT
});

apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        config.headers['Content-Type'] = `application/json`;
        const accessToken = localStorage.getItem('ROCP_token');
        if (accessToken && config.headers) {
            const cleanToken = accessToken.replace(/['"]+/g, '');
            if(cleanToken) {
                config.headers['authorization'] = `Bearer ${cleanToken}`;
            }
        }
        return config;
    });
export default apiClient