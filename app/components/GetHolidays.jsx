import React, { useEffect, useState } from 'react';
import CalendarService from '../services/CalendarService';

const getHolidays = ({ currentYear }) => {

    const [holidays, setHolidays] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getCountryAndCity(latitude, longitude) {
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

    async function getHolidays() {
        try {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Определить страну и город
                const { country, city } = await getCountryAndCity(latitude, longitude);

                // Получить данные о праздниках с использованием полученных данных
                const response = await CalendarService.getHolidays(currentYear, country, city);
                setHolidays(response);
                setLoading(false);
            }, (error) => {
                // Обработать ошибку получения местоположения
                setError(new Error("Failed to get location: " + error.message));
                setLoading(false);
            });
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getHolidays();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {holidays.map((holiday, index) => (
                <li key={index}>{holiday.name}</li>
            ))}
        </div>
    );
};

export default getHolidays;