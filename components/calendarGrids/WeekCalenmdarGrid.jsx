import { useContext, useEffect, useState } from 'react';

import EventsUtils from '@/app/utils/events-utils';

import { CreateNewEvent } from '../CreateNewEvent';
import { RootStoreContext } from '@/app/provider/rootStoreProvider';
import { ContentInEvents } from '../ContentInEvents';
import { observer } from 'mobx-react-lite';

const getCurrentTimeOffset = () => {
    const now = new Date();
    const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes() + 25;
    // Since each slot is 30 minutes and your slot height is 50px, the offset per minute is 50px / 30 minutes.
    const offsetPerMinute = 50 / 30;
    const topOffset = minutesSinceMidnight * offsetPerMinute;
    return topOffset;
};

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const WeekCalendarGrid = ({ week, handleUpdate }) => {
    const rootStore = useContext(RootStoreContext);
    const { userStore } = rootStore;
    const [currentTimeOffset, setCurrentTimeOffset] = useState(getCurrentTimeOffset());
    useEffect(() => {
        // Update the indicator's position every minute
        const intervalId = setInterval(() => {
            setCurrentTimeOffset(getCurrentTimeOffset());
        }, 60000); // 60,000 milliseconds = 1 minute

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    // This creates an array for the 24 hours broken into 15-minute slots
    const hoursInDay = 24;
    const slotsPerHour = 2; // 15-minute intervals
    const totalSlots = hoursInDay * slotsPerHour;
    const timeSlots = Array.from({ length: totalSlots }, (_, index) => {
        const hour = String(Math.floor(index / slotsPerHour)).padStart(2, '0');
        const minute = String((index % slotsPerHour) * 30).padStart(2, '0'); // adjust to 30 or 15 depending on your needs
        return { hour, minute }; // Return an object with hour and minute
    });

    const groupedEvents = EventsUtils.groupEventsByDate(week);
    const friends = userStore.friends.map((user) => {
        return {
            value: user.id,
            label: user.name,
            avatarUrl: user.image
        };
    });
    return (
        <div className="flex flex-col w-full">
            <div className="grid grid-cols-[50px_repeat(7,_1fr)]">
                {/* Empty cell for the time column */}
                <div className="p-2 text-center font-bold"></div>
                {groupedEvents.map((dayData, dayIndex) => {
                    return (
                        <div key={dayIndex} className="flex items-center justify-center p-2 text-center font-bold border-l">
                            {dayData.day} {weekDays[dayIndex]}
                        </div>
                    )
                })}
            </div>
            {/* <div className="grid grid-cols-[50px_repeat(7,_1fr)]">
                <div className="p-2 text-center font-bold col-span-1"></div>
                {groupedEvents.map((dayData, dayIndex) => {
                    const startColumn = EventsUtils.getColumnIndexFromDate(dayData.dateStr, startOfWeek);

                    return (
                        <div key={dayIndex} className="relative col-span-auto">
                            {
                                dayData.multiDayEvents?.map((event, eventIndex) => {
                                    // Вычисляем стиль для каждого события индивидуально
                                    const eventStyle = {
                                        gridColumnStart: startColumn,
                                        gridColumnEnd: `span ${event.data.gridColumnEnd}`,
                                        gridRowStart: 2,
                                    };
                                    const date = new Date(event.startTime);
                                    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
                                    const day = date.getDate();
                                    const startTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                                    const endTime = new Date(event.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                                    return (
                                        <div
                                            key={`${dayIndex}-${eventIndex}`}
                                            className="flex items-center justify-center p-2 text-center font-bold border-l border-b text-white bg-blue-600"
                                            style={eventStyle}
                                        >
                                            <ContentInEvents key={eventIndex} eventIndex={eventIndex} day={day} weekday={weekday} startTime={startTime} endTime={endTime} event={event} />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    )
                })}
            </div> */}

            <div className="grid grid-cols-[50px_repeat(7,_1fr)] w-full relative border-foreground2 border">
                {/* Time slots column */}
                < div className="col-span-1" >
                    {
                        timeSlots.map((time, index) => (
                            <div key={index} className="flex justify-end items-top h-[50px] font-bold pr-1">
                                {time.hour + ':' + time.minute}
                            </div>
                        ))
                    }
                </div>

                {/* Day columns */}

                {
                    groupedEvents.map((dayData, dayIndex) => {
                        return (
                            <div key={dayIndex} className="col-span-1 relative" style={{ zIndex: 2 }}>
                                {/* Empty slots for each 30-minute interval in a day */}
                                <div className="relative z-10">
                                    {timeSlots.map((time, timeIndex) => (
                                        <CreateNewEvent key={timeIndex} timeIndex={timeIndex} date={dayData.dateStr} time={time} id={userStore.user.id} handleUpdate={handleUpdate} friends={friends} />
                                    ))}
                                </div>

                                <div className="absolute top-0 left-0 w-[95%] z-20">
                                    {dayData.data?.map((event, eventIndex) => {
                                        const date = new Date(event.startTime);
                                        const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
                                        const day = date.getDate();
                                        const startTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                                        const endTime = new Date(event.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                                        return (
                                            <ContentInEvents key={eventIndex} eventIndex={eventIndex} day={day} weekday={weekday} startTime={startTime} endTime={endTime} event={event} />
                                        );
                                    })}

                                </div>
                            </div>
                        )
                    })
                }
                <div
                    className="absolute bg-red-500 h-[2px] w-full"
                    style={{ top: `${currentTimeOffset}px`, zIndex: 49 }}
                />
            </div >
        </div>
    );
};

export default observer(WeekCalendarGrid);


