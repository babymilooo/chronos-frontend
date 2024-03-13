import { RootStoreContext } from "@/app/provider/rootStoreProvider";
import CalendarService from "@/app/services/CalendarService";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import EventsUtils from './../../app/utils/events-utils';
import CalendarUtils from "@/app/utils/calendar-utils";

const calendarByYear = () => {
    const rootStore = useContext(RootStoreContext);
    const { userStore } = rootStore;
    const { year, country, type } = Router.query;
    const [currentMonth, setCurrentMonth] = useState((new Date()).getMonth() + 1); // Month is zero-based, so add 1
    // const [holidays, setHolidays] = useState([]);
    // const [events, setEvents] = useState([]);
    const [calendar, setCalendar] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (!userStore.isLoading) {
                console.log(year)
                const { holidays, events } = await CalendarService.getEventsAndHolidays(year, country, type, userStore.user.id);

                console.log(holidays, events);

                const eventsDataWithDateTime = await EventsUtils.eventsDataWithDateTime(events);

                const mergedCalendar = [...holidays, ...eventsDataWithDateTime];

                const calendarGrid = CalendarUtils.getCalendarGrid(year, currentMonth, mergedCalendar);

                setCalendar(calendarGrid);
                setLoading(false);
            }
        }
        fetchData();
    }, [userStore.isLoading]);
    return (
        <div>
            {loading ? <div>Loading...</div> :
                <div className="grid grid-cols-7 gap-4">
                    {/* Calendar header */}
                    <div className="col-span-7 flex justify-center py-4 bg-gray-200">
                        <span className="font-bold">{year}</span>
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
            }
        </div>
    );
};

export default calendarByYear;