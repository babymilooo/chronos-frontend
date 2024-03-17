import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Router from 'next/router';
import CalendarService from '@/app/services/CalendarService';
import { RootStoreContext } from '@/app/provider/rootStoreProvider';
import EventsUtils from './../app/utils/events-utils';
import CalendarUtils from './../app/utils/calendar-utils';
import { Button, ButtonGroup } from '@nextui-org/react';
import MyNavbar from '@/app/components/Navbar';

const calendar = () => {
    const rootStore = useContext(RootStoreContext);
    const { userStore, holidaysStore } = rootStore;
    const [currentYear, setCurrentYear] = useState((new Date()).getFullYear());
    const [currentMonth, setCurrentMonth] = useState((new Date()).getMonth() + 1); // Month is zero-based, so add 1
    const [loading, setLoading] = useState(true);
    const [calendar, setCalendar] = useState([]);
    const [events, setEvents] = useState([]);
    const [active, setActive] = useState('month');

    const monthNames = ["December", "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November"];

    // Get the name of the current month using the currentMonth state
    const currentMonthName = monthNames[currentMonth];

    async function getEvents(id) {
        try {
            const response = await CalendarService.getEvents(currentYear, id);
            return response || []; // Return the response or an empty array if it's falsy
        } catch (error) {
            console.error("Error getting events:", error);
            return []; // Return an empty array in case of an error
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                console.log("userStore.isLoading", userStore.isLoading);
                // Only fetch data if isLoading is false and calendar is empty
                if (!userStore.isLoading && calendar.length === 0) {
                    const holidaysData = holidaysStore.holidays.map(holiday => ({ ...holiday }));
                    console.log("holidaysData", holidaysData);
                    const eventsData = await getEvents(userStore.user.id);
                    console.log("eventsData", eventsData);
                    // Merge events and holidays into one array
                    const eventsDataWithDateTime = await EventsUtils.eventsDataWithDateTime(eventsData);

                    // Merge events and holidays into one array
                    const mergedCalendar = [...holidaysData, ...eventsDataWithDateTime];

                    // Get the calendar grid
                    const calendarGrid = CalendarUtils.getCalendarGrid(currentYear, currentMonth, mergedCalendar);

                    setCalendar(calendarGrid);
                    console.log("calendar", calendarGrid);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        }
        if (userStore.user?.id) {
            fetchData(); // Call fetchData if there is a user ID
        }
    }, [userStore.isLoading]);


    // const handleClick = () => {
    //     const year = '2025';
    //     const country = 'Ukraine';
    //     const type = 'major_holidays';

    //     // Dynamically generate the URL with parameters
    //     Router.push({
    //         pathname: `/calendar/${year}`,
    //         query: { country, type }
    //     });
    // };

    if (loading) {
        console.log("Loading...");
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col h-screen">
            <MyNavbar />

            {/* The rest of the content will flex to take up the remaining space */}
            <div className="flex flex-grow overflow-hidden">
                <div className="w-1/6 border-r-2 p-4 bg-gray-100"> {/* Sidebar */}
                    <p>Events</p>
                </div>
                <div className="w-5/6 overflow-auto p-4"> {/* Main content */}
                    {/* Calendar header */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-red-500">
                            <span className="font-bold text-xl">{currentMonthName}</span>
                            <span className="text-xl pl-1">{currentYear}</span>
                        </div>
                        <div className="">
                            <ButtonGroup>
                                <Button
                                    size='sm'
                                    onClick={() => setActive('day')}
                                    variant="light"
                                    style={{ backgroundColor: active === 'day' ? '#e5e5e5' : '' }}
                                    className="text-red-500"
                                >
                                    Day
                                </Button>
                                <Button
                                    size='sm'
                                    onClick={() => setActive('week')}
                                    variant="light"
                                    style={{ backgroundColor: active === 'week' ? '#e5e5e5' : '' }}
                                    className="text-red-500"
                                >
                                    Week
                                </Button>
                                <Button
                                    size='sm'
                                    onClick={() => setActive('month')}
                                    variant="light"
                                    style={{ backgroundColor: active === 'month' ? '#e5e5e5' : '' }}
                                    className="text-red-500"
                                >
                                    Month
                                </Button>
                            </ButtonGroup>
                        </div>

                        <div className="flex justify-between items-center mr-10">
                            <Button size='sm' isIconOnly variant="light" aria-label="Like">
                                <img src="images/chevrons/chevron-left.svg" className="p-2" />
                            </Button>
                            <Button size='sm' variant="light" aria-label="Like" className="text-red-500">
                                Today
                            </Button>

                            <Button size='sm' variant="light" isIconOnly aria-label="Take a photo">
                                <img src="images/chevrons/chevron-right.svg" className="p-2" />

                            </Button>
                        </div>
                    </div>
                    <div className="flex-grow">
                        <div className="grid grid-cols-7 gap-1 w-full">
                            <div className="col-span-1 flex justify-center items-center font-bold">Sun</div>
                            <div className="col-span-1 flex justify-center items-center font-bold">Mon</div>
                            <div className="col-span-1 flex justify-center items-center font-bold">Tue</div>
                            <div className="col-span-1 flex justify-center items-center font-bold">Wed</div>
                            <div className="col-span-1 flex justify-center items-center font-bold">Thu</div>
                            <div className="col-span-1 flex justify-center items-center font-bold">Fri</div>
                            <div className="col-span-1 flex justify-center items-center font-bold">Sat</div>
                        </div>
                        <div className="grid grid-cols-7 gap-1 w-full flex-grow  min-h-[75vh]">
                            {/* Calendar cells */}
                            {calendar.map((item, index) => (
                                <div key={index} className="flex justify-center items-center border-t-1 p-2">
                                    {item.day && `${item.day}${item.data ? ` - ${item.data.name}` : ''}`} {/* Display day and data */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div >
        </div >

    );
};

export default observer(calendar);
