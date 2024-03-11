import CalendarService from './../services/CalendarService';
class HolidaysFunc {

    static async getCountryAndCity(latitude, longitude) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`);
            const data = await response.json();

            const country = data.address.country;
            const city = data.address.city || data.address.town || data.address.village || data.address.hamlet;

            return { country, city };
        } catch (error) {
            console.error("Error getting country and city:", error);
            return { country: null, city: null };
        }
    }

    static async getHolidays(currentYear) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(async (position) => {
                try {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    // Определить страну и город
                    const { country, city } = await this.getCountryAndCity(latitude, longitude);

                    // Получить данные о праздниках с использованием полученных данных
                    const response = await CalendarService.getHolidays(currentYear, country, city);
                    resolve(response);
                } catch (error) {
                    reject(error);
                }
            }, (error) => {
                // Обработать ошибку получения местоположения
                reject(new Error("Failed to get location: " + error.message));
            });
        });
    }
}

export default HolidaysFunc;