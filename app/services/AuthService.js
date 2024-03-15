import axios from 'axios';
import $api from '../https/axios';
import { API_URL } from '../https/axios';

export default class AuthService {
    static async login(email, password) {
        try {
            const response = await $api.post(`${API_URL}/auth/login`, { email, password });

            return response;
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async register(email, password) {
        try {
            const response = await $api.post(`${API_URL}/auth/registration`, { email, password });

            return response;
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async chechAuth() {
        try {
            const response = axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
            return response;
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async logout() {
        try {
            const response = await $api.post(`${API_URL}/auth/logout`);
            localStorage.clear('accesstoken');
            return response;
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async activateAccount(email, activationPassword) {
        try {
            const response = await $api.post(`${API_URL}/auth/activate`, { email, activationPassword });
            localStorage.clear('emailForActivation');
            console.log(response);
            return response;
        } catch (e) {
            console.error(e.response?.data?.message);
            return e;
        }
    }
}
