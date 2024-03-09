import React, { useEffect, useState } from 'react';
import CalendarService from '../services/CalendarService';

const GetEvents = ({ currentYear, id }) => {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);


    async function getEvents() {
        try {

            const response = await CalendarService.getEvents(currentYear, id);
            setEvents(response);
            setLoading(false);
        } catch (error) {
            console.error("Error getting events:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getEvents();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {events.map((event, index) => (
                <li key={index}>{event.title}</li>
            ))}
        </div>
    );
};

export default GetEvents;