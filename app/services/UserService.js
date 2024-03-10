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

    static async getUsers(id) {
        try {
            const response = await $api.get(`${API_URL}/users`, { id: id });
            return response.data;
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async addToFriend(id) {
        try {
            const response = await $api.post(`${API_URL}/users/addtofriend/${id}`);
            return response.data;
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async getFriends(id) {
        try {
            const response = await $api.get(`${API_URL}/users/friends`, { id: id });
            return response.data;
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async isFriend(id) {
        try {
            const response = await $api.get(`${API_URL}/users/${id}/isfriend`);
            return response.data;
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }
}
