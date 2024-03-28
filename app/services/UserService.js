import $api from '../https/axios';
import { API_URL } from '../https/axios';
import ToastService from './ToastService';

export default class UserService {
    static async getUser(id) {
        try {
            const response = await $api.get(`${API_URL}/users/${id}`);
            return response.data;
        } catch (e) {
            console.error(e.response?.data?.message);
            ToastService(e, 300);
        }
    }

    static async getUsers(id) {
        try {
            const response = await $api.get(`${API_URL}/users`, { id: id });
            return response.data;
        } catch (e) {
            console.error(e.response?.data?.message);
            ToastService(e, 300);
        }
    }

    static async addFriend(id) {
        try {
            return await $api.post(`${API_URL}/users/add-friend/${id}`);
        } catch (e) {
            console.error(e.response?.data?.message);
            ToastService(e, 300);
        }
    }

    static async removeFriend(id) {
        try {
            await $api.delete(`${API_URL}/users/remove-friend/${id}`);
        } catch (e) {
            console.error(e.response?.data?.message);
            ToastService(e, 300);
        }
    }

    static async getFriends(id) {
        try {
            const response = await $api.get(`${API_URL}/users/${id}/friends`);
            return response.data;
        } catch (e) {
            console.error(e.response?.data?.message);
            ToastService(e, 300);
        }
    }

    static async getPotentialFriends() {
        try {
            const response = await $api.get(`${API_URL}/users/potential-friends`);
            return response.data.users;
        } catch (e) {
            console.error(e.response?.data?.message);
            ToastService(e, 300);
        }
    }

    static async isFriend(id) {
        try {
            const response = await $api.get(`${API_URL}/users/${id}/isfriend`);
            return response.data.isFriend;
        } catch (e) {
            console.error(e.response?.data?.message);
            ToastService(e, 300);
        }
    }

    static async updateUser(formData) {
        try {
            const response = await $api.put(`${API_URL}/users/update`, formData);
            return response.data;
        } catch (e) {
            console.error(e.response?.data?.message);
            ToastService(e, 300);
        }
    }
}