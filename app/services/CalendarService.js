import $api from '../https/axios';
import { API_URL } from '../https/axios';

export default class CalendarService {

    static async getHolidays(year, country, type) {
        try {
            const response = await $api.get(`${API_URL}/holidays`, { params: { country, year, type } });
            return response.data;
        } catch (error) {
            console.error("Error getting holidays:", error);
            return [];
        }
    }

    static async getEvents(currentYear, id) {
        try {
            const response = await $api.get(`${API_URL}/events`, { params: { year: currentYear, id } });
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return []; // Обрабатываем случай, когда календари не найдены
            } else {
                console.error('Произошла ошибка при получении данных о календарях:', error);
            }
        }
    }

    static async createEvent(title, startDate, endDate, startTime, endTime, eventType, repeat, priority, coOwners = [], attendees = [], description, user) {
        try {
            await $api.post(`${API_URL}/events`, { title, startDate, endDate, startTime, endTime, eventType, repeat, priority, coOwners, attendees, description, user });
            return true;
        } catch (error) {
            console.error('Произошла ошибка при создании события:', error);
            return false;
        }
    }

    static async getEventsAndHolidays(year, country, type, id) {
        try {

            const holidays = await this.getHolidays(year, country, type);
            const events = await this.getEvents(year, id);
            return { holidays, events };
        } catch (error) {
            console.error('Произошла ошибка при получении данных о календарях и праздниках:', error);
            return { holidays: [], events: [] };
        }
    }
}