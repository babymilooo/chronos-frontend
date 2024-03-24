import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import CalendarService from '@/app/services/CalendarService';
import { RootStoreContext } from '@/app/provider/rootStoreProvider';
import EventsUtils from './../app/utils/events-utils';
import CalendarUtils from './../app/utils/calendar-utils';
import CalendarNavigation from '@/components/CalendarNavigation';
import Navbar from '@/components/Navbar';
import MonthCalendarGrid from '@/components/calendarGrids/MonthCalendarGrid';
import WeekCalendarGrid from '@/components/calendarGrids/WeekCalenmdarGrid';

const calendar = () => {
    const rootStore = useContext(RootStoreContext);
    const { userStore, holidaysStore } = rootStore;
    const [currentYear, setCurrentYear] = useState((new Date()).getFullYear());
    const [currentMonth, setCurrentMonth] = useState((new Date()).getMonth() + 1); // Month is zero-based, so add 1
    const [loading, setLoading] = useState(true);
    const [monthCalendar, setMonthCalendar] = useState([]);
    const [week, setWeek] = useState([]);
    const [active, setActive] = useState('month');
    const [calendar, setCalendar] = useState([]);
    // Get the name of the current month using the currentMonth state

    // This is just a placeholder function to update the month's calendar grid.
    const updateMonthCalendar = (newCalendar) => {
        setMonthCalendar(newCalendar);
    };

    // This is just a placeholder function to update the week's calendar grid.
    const updateWeekCalendar = (newCalendar) => {
        setWeek(newCalendar);
    };

    const handleSetActive = (value) => {
        setActive(value);
    };

    async function getEvents(id) {
        try {
            const response = await CalendarService.getEvents(currentYear, id);
            return response || []; // Return the response or an empty array if it's falsy
        } catch (error) {
            console.error("Error getting events:", error);
            return []; // Return an empty array in case of an error
        }
    }

    async function createCalendarGrid(mergedCalendar, year, month) {
        // Get the month calendar grid
        const calendarGrid = CalendarUtils.getCalendarGrid(year, month, mergedCalendar);
        setMonthCalendar(calendarGrid);
        console.log("calendarGrid", calendarGrid);
        // Get the week calendar grid
        const weekNumber = CalendarUtils.getCurrentWeekNumber(currentYear, currentMonth);
        const weekCalendarGrid = CalendarUtils.getWeekCalendarGrid(calendarGrid, weekNumber);
        setWeek(weekCalendarGrid);
        console.log("weekCalendarGrid", weekCalendarGrid);

        return;
    }
    useEffect(() => {
        async function fetchData() {
            try {
                // Only fetch data if isLoading is false and calendar is empty
                if (!holidaysStore.isLoading && calendar.length === 0) {
                    const holidaysData = holidaysStore.holidays.map(holiday => ({ ...holiday }));
                    const eventsData = await getEvents(userStore.user.id);
                    const eventsDataWithDateTime = await EventsUtils.eventsDataWithDateTime(eventsData);
                    // Merge events and holidays into one array
                    const mergedCalendar = holidaysData.map(holiday => ({ data: { ...holiday }, type: 'holiday' }))
                        .concat(eventsDataWithDateTime.map(event => ({ data: { ...event }, type: 'event' })));
                    // Create the calendar grid
                    setCalendar(mergedCalendar);
                    await createCalendarGrid(mergedCalendar, currentYear, currentMonth);

                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        }
        fetchData();

    }, [userStore.isLoading, holidaysStore.holidays]);

    if (loading) {
        console.log("Loading...");
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col h-screen select-none bg-background text-foreground">
            <Navbar />
            {/* The rest of the content will flex to take up the remaining space */}
            <div className="flex flex-grow overflow-hidden">
                <div className="w-1/6 border-r border p-4 bg-background2"> {/* Sidebar */}
                    <p>Events</p>
                </div>
                <div className="w-5/6 overflow-auto p-4"> {/* Main content */}
                    <CalendarNavigation setMonthCalendar={updateMonthCalendar} setWeekCalendar={updateWeekCalendar} mergedCalendar={calendar} active={active} setActive={handleSetActive} />
                    {active === 'month' ? (
                        <MonthCalendarGrid calendar={monthCalendar} />
                    ) : active === 'week' ? (
                        <WeekCalendarGrid week={week} />
                    ) : active === 'day' ? (
                        <div className="grid grid-cols-7 gap-1">
                            {week.map((item, index) => (
                                <div key={index} className="flex justify-center items-center border p-2">
                                    {item.day} {/* Display the day number */}
                                    {item.data && <span> - {item.data.name}</span>} {/* Display the data if available */}
                                </div>
                            ))}
                        </div>)
                        : null
                    }
                </div>
            </div >
        </div >

    );
};

export default observer(calendar);

