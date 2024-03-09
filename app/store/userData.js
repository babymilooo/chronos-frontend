import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';
import Router from 'next/router';

class UserStore {
    user = {
        username: '',
        id: '',
        image: '',
        bio: '',
    };
    isLoading = true;

    constructor(user) {
        makeAutoObservable(this);
        this.user = user || this.user;
    }


    // Метод для установки данных пользователя
    setUser(user) {
        this.user = user;
    }

    // Метод для обновления данных пользователя
    updateUser(newUser) {
        this.user = { ...this.user, ...newUser };
    }

    // Метод для установки авторизации

    setIsLoading(isLoading) {
        this.isLoading = isLoading;
    }


    getUserId() {
        return this.user.id;
    }

    async checkAuth() {
        try {
            const response = await AuthService.chechAuth();
            localStorage.setItem('accesstoken', response.data.accessToken);
            this.setUser(response.data.user);
            this.setIsLoading(false);
        } catch (e) {
            if (e.response.status === 401) {
                await Router.push('/login');
            }
            console.error(e.response?.data?.message);
        }
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            console.log('login');
            this.setUser(response.data.user);
            this.setIsLoading(false);
            localStorage.setItem('accesstoken', response.data.accessToken);

            return true;
        }
        catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    async registration(email, password) {
        try {
            const response = await AuthService.register(email, password);
            this.setUser(response.data.user);
            localStorage.setItem('accesstoken', response.data.accessToken);
        }
        catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            this.setUser({ username: '', id: '', image: '', bio: '', isLoading: false });
            localStorage.clear('accesstoken');
        }
        catch (e) {
            console.error(e.response?.data?.message);
        }
    }
}

const userStore = new UserStore();
export default userStore;
