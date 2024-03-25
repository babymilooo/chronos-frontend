import { useEffect, useState } from 'react';
import { format } from "date-fns"

import EventsUtils from '@/app/utils/events-utils';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

import {
    Popover as MyPopover,
    PopoverContent as MyPopoverContent,
    PopoverTrigger as MyPopoverTrigger
} from '@/components/MyPopover';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from "@/lib/utils"
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

import DatePicker from '../DatePicker';

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
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
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

    const convertToMinutes = (timeString) => {
        const time = new Date(timeString);
        return time.getHours() * 60 + time.getMinutes();
    };

    const groupedEvents = EventsUtils.groupEventsByDate(week);
    console.log(groupedEvents);
    return (
        <div className="grid grid-cols-[50px_repeat(7,_1fr)] w-full relative border-content2 border">
            {/* Time slots column */}
            <div className="col-span-1">
                <div className="flex justify-end items-center p-2 text-bkg">1</div>
                {timeSlots.map((time, index) => (
                    <div key={index} className="flex justify-end items-top h-[50px] font-bold pr-1">
                        {/* {time.minute === '00' ? time.hour : ''} */}
                        {time.hour + ':' + time.minute}
                    </div>
                ))}
            </div>

            {/* Day columns */}

            {groupedEvents.map((dayData, dayIndex) => {
                return (
                    <div key={dayIndex} className="col-span-1 relative" style={{ zIndex: 2 }}>
                        {/* Day header */}
                        <div className="border-l p-2 text-center font-bold border-content2">{dayData.day}</div>
                        {/* Empty slots for each 30-minute interval in a day */}
                        <div className="relative z-10">
                            {timeSlots.map((time, timeIndex) => (
                                <Dialog key={timeIndex}>
                                    <DialogTrigger asChild>
                                        <div className="border-l border-t border-content2 p-2 h-[50px] w-full z-2 hover:bg-bkg2">

                                        </div>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle className="text-3xl font-bold">New Event</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="username" className="text-right font-bold">
                                                    Name
                                                </Label>
                                                <Input id="username" value="@peduarte" className="col-span-3" />
                                            </div>
                                            <div className="flex items-center justify-between pt-4">
                                                <DatePicker cn={cn} date={startDate} format={format} setDate={setStartDate} />
                                                <p>to</p>
                                                <DatePicker cn={cn} date={endDate} format={format} setDate={setEndDate} />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit">Save changes</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                            ))}
                        </div>

                        <div className="absolute top-0 left-0 w-[95%] z-20">
                            {dayData.data?.map((event, eventIndex) => {
                                if (event.type !== "event") return null;


                                const width = 100 / event.sameStartTimeCount;
                                const leftOffset = width * event.positionInGroup;

                                return (
                                    <MyPopover key={eventIndex}>
                                        <MyPopoverTrigger asChild>
                                            <div className="absolute left-0 border border-content2 rounded-xl bg-red-500"
                                                style={{
                                                    top: `${event.topOffset}px`,
                                                    height: `${event.height}px`,
                                                    width: `calc(${width}% - 2px)`,
                                                    left: `calc(${leftOffset}%)`,
                                                    zIndex: 30,
                                                }}
                                            >
                                                <div className="p-2">
                                                    <h3 className="text-sm font-bold">{event.data.name}</h3>
                                                    <p className="text-xs">{event.description}</p>
                                                </div>
                                            </div>
                                        </MyPopoverTrigger>
                                        <MyPopoverContent side="left" className="p-4 rounded-md">
                                            <div>
                                                <div className="flex items-end border-b border-content2 p-2">
                                                    <p className="font-bold text-xl">{event.data.startTime}</p>
                                                </div>
                                                <div>
                                                    <p>{event.data.name}</p>
                                                </div>
                                            </div>
                                        </MyPopoverContent>
                                    </MyPopover>
                                );
                            })}

                        </div>
                    </div>
                )
            })}
            <div
                className="absolute bg-red-500 h-[2px] w-full"
                style={{ top: `${currentTimeOffset}px`, zIndex: 49 }}
            />
        </div >
    );
};

export default WeekCalendarGrid;

