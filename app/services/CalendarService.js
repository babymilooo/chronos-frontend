import $api from '../https/axios';
import { API_URL } from '../https/axios';

export default class CalendarService {

    static async getHolidays(year, country, city) {
        try {
            const response = await $api.get(`${API_URL}/holidays`, { params: { country, city, year } });
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

    static async createEvent(title, date, startTime, endTime, coOwners = [], attendees = [], user) {
        try {
            await $api.post(`${API_URL}/events`, { title, date, startTime, endTime, user, coOwners, attendees });
            return true;
        } catch (error) {
            console.error('Произошла ошибка при создании события:', error);
            return false;
        }
    }
}