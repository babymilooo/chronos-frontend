import $api from '../https/axios';
import { API_URL } from '../https/axios';

export default class UserService {
    static async getUser(id) {
        try {
            const response = await $api.get(`${API_URL}/users/${id}`);
            return response.data;
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async getUsers() {
        try {
            const response = await $api.get(`${API_URL}/users`);
            return response.data;
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }
}
