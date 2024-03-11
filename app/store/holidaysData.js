import HolidaysFunc from './../utils/holidays-utils';
import { runInAction, makeAutoObservable } from 'mobx';

class HolidaysStore {

    holidays = [];
    isLoading = true;
    constructor(holidays) {
        makeAutoObservable(this);
        this.holidays = holidays || this.holidays;
    }

    async getHolidays(currentYear) {
        try {
            const response = await HolidaysFunc.getHolidays(currentYear);
            runInAction(() => {
                this.holidays = response;
                this.isLoading = false;
            });
        } catch (error) {
            console.error("Error getting holidays:", error);
            setLoading(false);
        }
    }
}

const holidaysStore = new HolidaysStore();
export default holidaysStore;
