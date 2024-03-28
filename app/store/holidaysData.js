import HolidaysFunc from './../utils/holidays-utils';
import { runInAction, makeAutoObservable } from 'mobx';

class HolidaysStore {

    holidays = [];
    isLoading = true;
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    setHolidays(data) {
        this.holidays = data; // Установите данные о праздниках в holidays
    }

    addItem(item) {
        this.holidays.push(item);
    }

    // Метод для удаления элемента из массива
    removeItem(index) {
        this.holidays.splice(index, 1);
    }

    async getHolidays(currentYear) {
        try {
            const response = await HolidaysFunc.getHolidays(currentYear);
            runInAction(() => {
                this.setHolidays(response); // Установите данные о праздниках
                this.isLoading = false;
            });
        } catch (error) {
            console.error("Error getting holidays:", error);
            this.isLoading = false;
        }
    }

    async clearHolidays() {
        this.holidays = [];
        this.isLoading = true;
    }

}

export default HolidaysStore;
