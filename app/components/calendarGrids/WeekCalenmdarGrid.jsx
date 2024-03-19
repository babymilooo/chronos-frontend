import React from 'react';

const WeekCalendarGrid = ({ week }) => {
    const hoursInDay = 24;
    const slotsPerHour = 2; // 15-minute intervals
    const totalSlots = hoursInDay * slotsPerHour;

    // This creates an array for the 24 hours broken into 15-minute slots
    const timeSlots = Array.from({ length: totalSlots }, (_, index) => {
        const hour = String(Math.floor(index / slotsPerHour)).padStart(2, '0');
        const minute = String((index % slotsPerHour) * 15).padStart(2, '0');
        return `${hour}:${minute}`;
    });

    return (
        <div className="grid grid-cols-[50px_repeat(7,_1fr)] w-full">
            {/* Time slots column */}
            <div className="col-span-1">
                <div></div>
                {timeSlots.map((time, index) => (
                    <div key={index} className="flex justify-end items-center border p-2">
                        {time}
                    </div>
                ))}
            </div>

            {/* Day columns */}
            {week.map((day, dayIndex) => (
                <div key={dayIndex} className="col-span-1">
                    {/* Day header */}
                    <div className="border p-2 text-center font-bold">{day.day}</div>
                    {/* Empty slots for each 30-minute interval in a day */}
                    {timeSlots.map((_, timeIndex) => (
                        <div key={timeIndex} className="border p-2 h-[calc(100%/48)]">
                            {/* This is where individual appointments could be rendered */}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default WeekCalendarGrid;
