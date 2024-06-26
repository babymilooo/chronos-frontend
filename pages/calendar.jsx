import { SideBar } from '@/components/SideBar';
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
import DayCalendarGrid from '@/components/calendarGrids/DayCalendarGrid';

const calendar = () => {
    const rootStore = useContext(RootStoreContext);
    const { userStore, holidaysStore } = rootStore;
    const [date, setDate] = useState(new Date());
    const [currentYear, setCurrentYear] = useState(date.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(date.getMonth() + 1); // Month is zero-based, so add 1
    const [loading, setLoading] = useState(true);
    const [monthCalendar, setMonthCalendar] = useState([]);
    const [week, setWeek] = useState([]);
    const [day, setDay] = useState([]);
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

    const updateDayCalendar = (newCalendar) => {
        setDay(newCalendar);
    }

    const handleSetActive = (value) => {
        setActive(value);
    };

    async function getEvents() {
        try {
            const response = await CalendarService.getEvents(currentYear);
            return response || []; // Return the response or an empty array if it's falsy
        } catch (error) {
            console.error("Error getting events:", error);
            return []; // Return an empty array in case of an error
        }
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
                    await CalendarUtils.createCalendarGrid(mergedCalendar, currentYear, currentMonth, date, setMonthCalendar, setWeek, setDay);

                    setLoading(false);
                    console.log("data ready")
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        }
        fetchData();

    }, [userStore.isLoading, holidaysStore.holidays]);

    const handleUpdate = async () => {
        const holidaysData = holidaysStore.holidays.map(holiday => ({ ...holiday }));
        const eventsData = await getEvents(userStore.user.id);

        const eventsDataWithDateTime = await EventsUtils.eventsDataWithDateTime(eventsData);
        // Merge events and holidays into one array
        const mergedCalendar = holidaysData.map(holiday => ({ data: { ...holiday }, type: 'holiday' }))
            .concat(eventsDataWithDateTime.map(event => ({ data: { ...event }, type: 'event' })));
        // Create the calendar grid
        setCalendar(mergedCalendar);
        await CalendarUtils.updateCalendarGrid(date, mergedCalendar, updateMonthCalendar, updateWeekCalendar, updateDayCalendar);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col h-screen select-none bg-background text-foreground">
            <Navbar />
            {/* The rest of the content will flex to take up the remaining space */}
            <div className="flex flex-grow overflow-hidden">
                <SideBar day={day} />
                <div className="w-5/6 overflow-auto p-4"> {/* Main content */}
                    <CalendarNavigation setMonthCalendar={updateMonthCalendar} setWeekCalendar={updateWeekCalendar} setDayCalendar={updateDayCalendar} setDate={setDate} mergedCalendar={calendar} active={active} setActive={handleSetActive} />
                    {active === 'month' ? (
                        <MonthCalendarGrid calendar={monthCalendar} handleUpdate={handleUpdate} />
                    ) : active === 'week' ? (
                        <WeekCalendarGrid week={week} date={date} handleUpdate={handleUpdate} />
                    ) : active === 'day' ? (
                        <DayCalendarGrid day={day} date={date} handleUpdate={handleUpdate} />
                    ) : null
                    }
                </div>
            </div >
        </div >

    );
};

export default observer(calendar);

