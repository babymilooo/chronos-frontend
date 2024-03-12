import UserStore from './userData';
import HolidaysStore from './holidaysData';
import { createContext, useContext } from 'react';
import { makeAutoObservable } from 'mobx';
class RootStore {
    userStore;
    holidaysStore;
    
    constructor() {
        this.userStore = new UserStore(this);
        this.holidaysStore = new HolidaysStore(this);
        makeAutoObservable(this);

    }
}

export default RootStore;