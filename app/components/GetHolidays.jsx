import React, { useEffect, useState } from 'react';
import HolidaysFunc from '../utils/holidays-utils';

const getHolidays = ({ currentYear }) => {

    const [holidays, setHolidays] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getHolidays() {
        try {
            const response = await HolidaysFunc.getHolidays(currentYear);
            if (response) {
                setHolidays(response);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error getting holidays:", error);
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