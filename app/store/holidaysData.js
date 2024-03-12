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
            console.log("getHolidays");
            const response = await HolidaysFunc.getHolidays(currentYear);
            console.log(response);
            runInAction(() => {
                this.setHolidays(response); // Установите данные о праздниках
                console.log(this.holidays);
                this.isLoading = false;
            });
        } catch (error) {
            console.error("Error getting holidays:", error);
            this.isLoading = false;
        }
    }
}

export default HolidaysStore;
