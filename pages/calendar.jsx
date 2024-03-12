import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Router from 'next/router';
import HolidaysFunc from '@/app/utils/holidays-utils';
import CalendarService from '@/app/services/CalendarService';
import { RootStoreContext } from '@/app/provider/rootStoreProvider';

const calendar = () => {
    const rootStore = useContext(RootStoreContext);
    const { userStore, holidaysStore } = rootStore;
    const [currentYear, setCurrentYear] = useState((new Date()).getFullYear());
    const [currentMonth, setCurrentMonth] = useState((new Date()).getMonth() + 1); // Month is zero-based, so add 1
    const [loading, setLoading] = useState(true);
    const [calendar, setCalendar] = useState([]);
    const [events, setEvents] = useState([]);

    const getDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    };
    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month - 1, 1).getDay(); // Month is zero-based, so subtract 1
    };

    async function getHolidays() {
        try {
            const response = await HolidaysFunc.getHolidays(currentYear);
            if (response) {
                return response; // Return the response if it's valid
            } else {
                return []; // Return an empty array if response is falsy
            }
        } catch (error) {
            console.error("Error getting holidays:", error);
            setLoading(false);
        }
    }

    async function getEvents(id) {
        try {
            const response = await CalendarService.getEvents(currentYear, id);
            if (response) {
                return response; // Return the response if it's valid
            } else {
                return []; // Return an empty array if response is falsy
            }
        } catch (error) {
            console.error("Error getting events:", error);
            setLoading(false);
        }
    }
    useEffect(() => {
        async function fetchData() {
            try {
                // Only fetch data if isLoading is false and calendar is empty
                if (!userStore.isLoading && calendar.length === 0) {
                    const holidaysData = holidaysStore.holidays.map(holiday => ({ ...holiday }));

                    const eventsData = await getEvents(userStore.user.id);
                    // Merge events and holidays into one array
                    const eventsDataWithDateTime = eventsData.map(event => {
                        const startTime = new Date(event.startTime);
                        const date = startTime.toLocaleDateString();
                        const [day, month, year] = date.split('.');

                        // Create a new Date object with the provided day, month, and year
                        const dateObject = new Date(`${year}-${month}-${day}`);

                        // Format the date to "YYYY-MM-DD"
                        const formattedDate = dateObject.toISOString().split('T')[0];

                        return {
                            ...event,
                            date: formattedDate,
                            time: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            name: event.title
                        };
                    });

                    // Merge events and holidays into one array
                    const mergedCalendar = [...holidaysData, ...eventsDataWithDateTime];

                    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
                    const firstDayOfWeek = getFirstDayOfMonth(currentYear, currentMonth);
                    const calendarGrid = Array.from({ length: daysInMonth }, (_, index) => {
                        const day = index + 1;
                        const data = mergedCalendar.find(item => {
                            const date = new Date(item.date);
                            return date.getDate() === day && date.getMonth() + 1 === currentMonth;
                        }); // Get data for this day from mergedCalendar
                        return { day, data };
                    });

                    // Add empty cells for days before the first day of the month
                    for (let i = 0; i < firstDayOfWeek; i++) {
                        calendarGrid.unshift({ day: '', data: null });
                    }

                    setCalendar(calendarGrid);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        }
        fetchData();
    }, [userStore.isLoading]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="grid grid-cols-7 gap-4">
                {/* Calendar header */}
                <div className="col-span-7 flex justify-center py-4 bg-gray-200">
                    <span className="font-bold">{currentYear}</span>
                </div>

                {/* Days of the week */}
                <div className="col-span-1 flex justify-center items-center font-bold">Sun</div>
                <div className="col-span-1 flex justify-center items-center font-bold">Mon</div>
                <div className="col-span-1 flex justify-center items-center font-bold">Tue</div>
                <div className="col-span-1 flex justify-center items-center font-bold">Wed</div>
                <div className="col-span-1 flex justify-center items-center font-bold">Thu</div>
                <div className="col-span-1 flex justify-center items-center font-bold">Fri</div>
                <div className="col-span-1 flex justify-center items-center font-bold">Sat</div>

                {/* Calendar cells */}
                {calendar.map((item, index) => (
                    <div key={index} className="flex justify-center items-center border border-gray-300 p-2">
                        {item.day && `${item.day}${item.data ? ` - ${item.data.name}` : ''}`} {/* Display day and data */}
                    </div>
                ))}
            </div>

            {/* <ul>
                {calendar.map((item, index) => (
                    <li key={index}>{item.name} - {item.date}</li>
                    // Adjust rendering according to your data structure
                ))}
            </ul> */}
            <button onClick={() => { Router.push('/calendar/createNewEvent') }} className="border-2 border-black">create new</button>
            <button onClick={() => { Router.push('/users') }} className="border-2 border-black">users</button>
            <button onClick={() => { Router.push('/users/friends') }} className="border-2 border-black">friends</button>
        </div >
    );
};

export default observer(calendar);
