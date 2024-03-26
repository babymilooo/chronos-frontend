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

    static async addFriend(id) {
        try {
            console.log('addFriend', id);
            const response = await $api.post(`${API_URL}/users/add-friend/${id}`);
            return response.data;
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async removeFriend(id) {
        try {
            console.log('removeFriend', id);
            const response = await $api.delete(`${API_URL}/users/remove-friend/${id}`);
            return response.data;
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async getFriends(id) {
        try {
            const response = await $api.get(`${API_URL}/users/${id}/friends`);
            return response.data;
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async isFriend(id) {
        try {
            const response = await $api.get(`${API_URL}/users/${id}/isfriend`);
            return response.data.isFriend;
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async updateUser(id, formData) {
        try {
            const response = await $api.put(`${API_URL}/users/${id}/update`, formData);
            return response.data;
        } catch (e) {
            ToastService(e.response?.data?.message);
        }
    }    
}