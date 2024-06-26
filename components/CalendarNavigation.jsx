import CalendarUtils from '@/app/utils/calendar-utils';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { ChevronRightIcon } from "@radix-ui/react-icons"
import { ChevronLeftIcon } from "@radix-ui/react-icons"
const CalendarNavigation = ({ setMonthCalendar, setWeekCalendar, setDayCalendar, setDate, mergedCalendar, active, setActive }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const monthNames = ["December", "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    // Get the name of the current month using the currentMonth state
    const currentMonthName = monthNames[currentDate.getMonth() + 1];
    const currentYear = currentDate.getFullYear();

    const goToPrevious = () => {
        let newDate;
        switch (active) {
            case 'day':
                newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
                break;
            case 'week':
                newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
                break;
            case 'month':
            default:
                newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
                break;
        }
        setCurrentDate(newDate);
        setDate(newDate);
        // Here call the function to update the calendar grid
        CalendarUtils.updateCalendarGrid(newDate, mergedCalendar, setMonthCalendar, setWeekCalendar, setDayCalendar);
    };

    const goToNext = () => {
        let newDate;
        switch (active) {
            case 'day':
                newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
                break;
            case 'week':
                newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7);
                break;
            case 'month':
            default:
                newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
                break;
        }
        setCurrentDate(newDate);
        setDate(newDate);
        // Here call the function to update the calendar grid
        CalendarUtils.updateCalendarGrid(newDate, mergedCalendar, setMonthCalendar, setWeekCalendar, setDayCalendar);
    };

    const goToToday = () => {
        const today = new Date();


        setCurrentDate(today);
        setDate(today);
        // Here call the function to update the calendar grid
        CalendarUtils.updateCalendarGrid(today, mergedCalendar, setMonthCalendar, setWeekCalendar, setDayCalendar);
    };

    return (
        <div className="flex justify-between items-center mb-4">
            <div className="text-red-500">
                <span className="font-bold text-xl">{currentMonthName}</span>
                <span className="text-xl pl-1">{currentYear}</span>
            </div>
            <div>
                <Button
                    onClick={() => setActive('day')}
                    variant="ghost"
                    style={{ backgroundColor: active === 'day' ? 'hsl(var(--background2))' : '' }}
                    className="text-red-500"
                >
                    Day
                </Button>
                <Button
                    onClick={() => setActive('week')}
                    variant="ghost"
                    style={{ backgroundColor: active === 'week' ? 'hsl(var(--background2))' : '' }}
                    className="text-red-500"
                >
                    Week
                </Button>
                <Button
                    onClick={() => setActive('month')}
                    variant="ghost"
                    style={{ backgroundColor: active === 'month' ? 'hsl(var(--background2))' : '' }}
                    className="text-red-500"
                >
                    Month
                </Button>
            </div>

            <div className="flex justify-between items-center mr-10">
                <Button variant="ghost" size="icon" className="text-red-500" onClick={goToPrevious}>
                    <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" className="text-red-500" onClick={goToToday}>
                    Today
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500" onClick={goToNext}>
                    <ChevronRightIcon className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default CalendarNavigation;
