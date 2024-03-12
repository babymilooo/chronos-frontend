import CalendarService from './../services/CalendarService';
class HolidaysFunc {

    static async getLatLongFromIP(ipAddress) {
        let apiUrl = `http://ip-api.com/json/${ipAddress}?fields=status,country,countryCode,lat,lon,timezone`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.status === 'success') {
                return { latitude: data.lat, longitude: data.lon, country: data.country, countryCode: data.countryCode, timezone: data.timezone };
            } else {
                throw new Error('Failed to fetch IP geolocation data.');
            }
        } catch (error) {
            console.error('Error fetching IP geolocation data:', error);
            throw error;
        }
    }

    static async getCountryAndCity(latitude, longitude) {
        try {
            console.log('getCountryAndCity', latitude, longitude);
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
        try {
            // Fetch IP-based geolocation data using Apify
            const response = await fetch('https://api.apify.com/v2/browser-info');
            const data = await response.json();

            const clientIp = data.clientIp;

            // Get latitude and longitude using IP-based geolocation data
            const { latitude, longitude, country, countryCode, timezone } = await this.getLatLongFromIP(clientIp);

            const locationData = {
                latitude,
                longitude,
                country,
                countryCode,
                timezone
            };

            // Get holiday data using geolocation information
            const holidaysResponse = await CalendarService.getHolidays(currentYear, country, 'major_holiday');
            return holidaysResponse;
        } catch (error) {
            console.error("Error getting holidays:", error);
            throw error;
        }
    }
}

export default HolidaysFunc;