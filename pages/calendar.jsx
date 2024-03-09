import { useContext, useEffect, useState } from 'react';
import $api from '../app/https/axios';
import { API_URL } from './../app/https/axios';
import { Context } from './_app';
import { userStore } from '@/app/store/userData';
import { observer } from 'mobx-react-lite';
import users from './users';

const calendar = () => {
    // Проверяем, что holidays является массивом перед вызовом метода map

    const [holidays, setHolidays] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userStore } = useContext(Context);

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

    useEffect(() => {
        const fetchData = async () => {

            if (userStore.isLoading) {
                return;
            }

            const currentYear = (new Date()).getFullYear();
            try {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    // Определить страну и город
                    const { country, city } = await getCountryAndCity(latitude, longitude);

                    // Получить данные о праздниках с использованием полученных данных
                    const res = await $api.get(`${API_URL}/holidays`, { params: { country, city, year: currentYear } });
                    setHolidays(res.data);

                }, (error) => {
                    // Обработать ошибку получения местоположения
                    setError(new Error("Failed to get location: " + error.message));
                    setLoading(false);
                });
            } catch (error) {
                setError(error);
                setLoading(false);
            }
            try {
                const response = await $api.get(`${API_URL}/events`, { params: { year: currentYear, id: userStore.user.id } });
                console.log(response.data);
                setEvents(response.data);
                setLoading(false);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setEvents([]); // Обрабатываем случай, когда календари не найдены
                    setLoading(false);
                } else {
                    console.error('Произошла ошибка при получении данных о календарях:', error);
                    setLoading(false);
                    // Обрабатываем другие возможные ошибки
                }
            }
        };

        if (!userStore.isLoading) {
            fetchData();
        }

    }, [userStore.isLoading]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    return (
        <div>
            <h1>Календарь</h1>
            <ul>
                {holidays.map((holiday, index) => (
                    <li key={index}>{holiday.name}</li>
                ))}
                {events.map((event, index) => (
                    <li key={index}>{event.title}</li>
                ))}
                <p>{userStore.user.username}</p>
            </ul>
        </div>
    );
};

export default observer(calendar);
