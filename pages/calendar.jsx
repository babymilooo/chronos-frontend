import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Router from 'next/router';
import HolidaysFunc from '@/app/utils/holidays-utils';
import CalendarService from '@/app/services/CalendarService';
import { RootStoreContext } from '@/app/provider/rootStoreProvider';
import EventsUtils from './../app/utils/events-utils';
import CalendarUtils from './../app/utils/calendar-utils';
import { Button } from '@nextui-org/react';
import MyNavbar from '@/app/components/Navbar';

const calendar = () => {
    const rootStore = useContext(RootStoreContext);
    const { userStore, holidaysStore } = rootStore;
    const [currentYear, setCurrentYear] = useState((new Date()).getFullYear());
    const [currentMonth, setCurrentMonth] = useState((new Date()).getMonth() + 1); // Month is zero-based, so add 1
    const [loading, setLoading] = useState(true);
    const [calendar, setCalendar] = useState([]);
    const [events, setEvents] = useState([]);

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
                    const eventsDataWithDateTime = await EventsUtils.eventsDataWithDateTime(eventsData);

                    // Merge events and holidays into one array
                    const mergedCalendar = [...holidaysData, ...eventsDataWithDateTime];

                    // Get the calendar grid
                    const calendarGrid = CalendarUtils.getCalendarGrid(currentYear, currentMonth, mergedCalendar);

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


    const handleClick = () => {
        const year = '2025';
        const country = 'Ukraine';
        const type = 'major_holidays';

        // Dynamically generate the URL with parameters
        Router.push({
            pathname: `/calendar/${year}`,
            query: { country, type }
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-bkg text-content">
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

            <button onClick={() => { Router.push('/calendar/createNewEvent') }} className="border-2 border-black">create new</button>
            <button onClick={() => { Router.push('/users') }} className="border-2 border-black">users</button>
            <button onClick={() => { Router.push('/users/friends') }} className="border-2 border-black">friends</button>
            <button onClick={handleClick}>Navigate to My Page</button>
            <Button onClick={() => { Router.push('/calendar/createNewEvent') }}>Create New</Button>
        </div >
    );
};

export default observer(calendar);
