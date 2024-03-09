import axios from 'axios';
import $api from '../https/axios';
import { API_URL } from '../https/axios';

export default class UserService {
    static async getUser(id) {
        try {
            const response = await $api.get(`${API_URL}/users/${id}`);
            return response;
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }
}
