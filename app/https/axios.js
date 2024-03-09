import axios from 'axios';

export const API_URL = 'http://localhost:5001/api'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})


$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accesstoken')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    console.log(error + "error");
    if (error.response.status === 401 && error.config && !error.config._iRetry) {
        const originalRequest = error.config;
        originalRequest._iRetry = true;
        try {
            const response = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
            console.log(response);
            localStorage.setItem('accesstoken', response.data.accessToken);
            return $api.request(originalRequest);
        }
        catch (e) {
            console.log("Non authorized");
        }
    }
    throw error;
});

export default $api;