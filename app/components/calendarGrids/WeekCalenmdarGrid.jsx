import React, { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/popover/popover';
import EventCard from '../EventCard';
const getCurrentTimeOffset = () => {
    const now = new Date();
    const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes() + 25;
    // Since each slot is 30 minutes and your slot height is 50px, the offset per minute is 50px / 30 minutes.
    const offsetPerMinute = 50 / 30;
    const topOffset = minutesSinceMidnight * offsetPerMinute;
    return topOffset;
};


const WeekCalendarGrid = ({ week }) => {
    const hoursInDay = 24;
    const slotsPerHour = 2; // 15-minute intervals
    const totalSlots = hoursInDay * slotsPerHour;
    const [currentTimeOffset, setCurrentTimeOffset] = useState(getCurrentTimeOffset());

    console.log(week);
    useEffect(() => {
        // Update the indicator's position every minute
        const intervalId = setInterval(() => {
            setCurrentTimeOffset(getCurrentTimeOffset());
        }, 60000); // 60,000 milliseconds = 1 minute

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    // This creates an array for the 24 hours broken into 15-minute slots
    const timeSlots = Array.from({ length: totalSlots }, (_, index) => {
        const hour = String(Math.floor(index / slotsPerHour)).padStart(2, '0');
        const minute = String((index % slotsPerHour) * 30).padStart(2, '0'); // adjust to 30 or 15 depending on your needs
        return { hour, minute }; // Return an object with hour and minute
    });

    return (
        <div className="grid grid-cols-[50px_repeat(7,_1fr)] w-full relative">
            {/* Time slots column */}
            <div className="col-span-1">
                <div className="flex justify-end items-center border-t border-l p-2 text-bkg border-content2">1</div>
                {timeSlots.map((time, index) => (
                    <div key={index} className="flex justify-end items-top h-[50px] font-bold pr-1 border-l border-content2">
                        {/* {time.minute === '00' ? time.hour : ''} */}
                        {time.hour + ':' + time.minute}
                    </div>
                ))}
            </div>

            {/* Day columns */}
            {week.map((day, dayIndex) => (
                <div key={dayIndex} className="col-span-1">
                    {/* Day header */}
                    <div className="border p-2 text-center font-bold border-content2">{day.day}</div>
                    {/* Empty slots for each 30-minute interval in a day */}
                    {timeSlots.map((_, timeIndex) => (
                        <Popover key={timeIndex}>
                            <PopoverTrigger asChild>
                                <div className="border border-content2 p-2 h-[50px]">

                                </div>
                            </PopoverTrigger>
                            <PopoverContent side="left" className="p-4 rounded-md">
                                <div>
                                    <div className="flex items-end border-b border-content2 p-2">
                                        <p className="font-bold text-xl">{timeSlots[timeIndex].hour + ':' + timeSlots[timeIndex].minute}</p>
                                    </div>
                                    <div>
                                        <p>No events</p>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    ))}
                </div>
            ))}

            <div className="relative">
                {week.map((day) => (
                    // Check if day.data and day.data.events exist before mapping
                    day.data && day.data.events
                        ? day.data.events.map((event) => (
                            <EventCard key={event.uniqueId} event={event} />
                        ))
                        : null
                ))}
            </div>

            <div
                className="absolute bg-red-500 h-[2px] w-full"
                style={{ top: `${currentTimeOffset}px`, zIndex: 999 }}
            />
        </div >
    );
};

export default WeekCalendarGrid;
