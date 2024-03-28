import { makeAutoObservable, runInAction } from 'mobx';
import AuthService from '../services/AuthService';
import Router from 'next/router';
import UserService from '../services/UserService';

class UserStore {
    user = {
        username: null,
        id: null,
        image: null,
        bio: null,
        email: null,
    };
    isLoading = true;
    currentYear = (new Date()).getFullYear();

    friends = [];

    constructor(user, rootStore) {
        this.rootStore = rootStore;
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

    setFriends(friends) {
        this.friends = friends;
    }

    addToFriends(friend) {
        this.friends = [...this.friends, friend];
    }

    async checkAuth() {
        try {
            const response = await AuthService.chechAuth();
            runInAction(() => {
                this.setUser(response.data.user);
            });
            // const friends = await UserService.getFriends(response.data.user.id);
            const friends = await UserService.getFriends(response.data.user.id);
            this.setFriends(friends);
            this.setIsLoading(false);
            localStorage.setItem('accesstoken', response.data.accessToken);
        } catch (e) {
            if (e?.response?.status === 401) { // Use optional chaining to access properties
                await Router.push('/login');
            }
            console.error(e.response?.data?.message);
        }
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            runInAction(() => {
                this.setUser(response.data.user);
                this.setIsLoading(false);
                localStorage.setItem('accesstoken', response.data.accessToken);
            });
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

            return true;
        }
        catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            this.setUser({ username: null, id: null, image: null, bio: null });
            localStorage.clear('accesstoken');
            Router.push('/login');
            this.isLoading = true;
        }
        catch (e) {
            console.error(e.response?.data?.message);
        }
    }
}

export default UserStore;
