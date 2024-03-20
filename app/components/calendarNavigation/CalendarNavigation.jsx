import CalendarUtils from '@/app/utils/calendar-utils';
import { Button, ButtonGroup } from '@nextui-org/react';
import React, { useState } from 'react';

const CalendarNavigation = ({ setMonthCalendar, setWeekCalendar, mergedCalendar, active, setActive }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const monthNames = ["December", "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November"];

    // Get the name of the current month using the currentMonth state
    const currentMonthName = monthNames[currentDate.getMonth() + 1];
    const currentYear = currentDate.getFullYear();

    const goToPrevious = () => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
        setCurrentDate(newDate);
        // Here call the function to update the calendar grid
        updateCalendarGrid(newDate);
    };

    const goToNext = () => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
        setCurrentDate(newDate);
        // Here call the function to update the calendar grid
        updateCalendarGrid(newDate);
    };

    const goToToday = () => {
        const today = new Date();

        console.log(today.toString());

        setCurrentDate(today);
        // Here call the function to update the calendar grid
        updateCalendarGrid(today);
    };

    async function updateCalendarGrid(date) {
        // Assuming mergedCalendar comes from your state or props
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        // Update the month calendar grid
        const monthCalendarGrid = CalendarUtils.getCalendarGrid(year, month, mergedCalendar);
        setMonthCalendar(monthCalendarGrid);

        // Update the week calendar grid
        const weekNumber = CalendarUtils.getCurrentWeekNumber(year, month);
        const weekCalendarGrid = CalendarUtils.getWeekCalendarGrid(monthCalendarGrid, weekNumber);
        setWeekCalendar(weekCalendarGrid);
    }

    return (
        <div className="flex justify-between items-center mb-4">
            <div className="text-red-500">
                <span className="font-bold text-xl">{currentMonthName}</span>
                <span className="text-xl pl-1">{currentYear}</span>
            </div>
            <div>
                <ButtonGroup>
                    <Button
                        size='sm'
                        onClick={() => setActive('day')}
                        variant="light"
                        style={{ backgroundColor: active === 'day' ? 'rgb(var(--color-bkg2))' : '' }}
                        className="text-red-500"
                    >
                        Day
                    </Button>
                    <Button
                        size='sm'
                        onClick={() => setActive('week')}
                        variant="light"
                        style={{ backgroundColor: active === 'week' ? 'rgb(var(--color-bkg2))' : '' }}
                        className="text-red-500"
                    >
                        Week
                    </Button>
                    <Button
                        size='sm'
                        onClick={() => setActive('month')}
                        variant="light"
                        style={{ backgroundColor: active === 'month' ? 'rgb(var(--color-bkg2))' : '' }}
                        className="text-red-500"
                    >
                        Month
                    </Button>
                </ButtonGroup>
            </div>

            <div className="flex justify-between items-center mr-10">
                <Button size='sm' isIconOnly variant="light" onClick={goToPrevious}>
                    <img src="images/chevrons/chevron-left.svg" className="p-2" />
                </Button>
                <Button size='sm' variant="light" className="text-red-500" onClick={goToToday}>
                    Today
                </Button>

                <Button size='sm' variant="light" isIconOnly onClick={goToNext}>
                    <img src="images/chevrons/chevron-right.svg" className="p-2" />

                </Button>
            </div>
        </div>
    );
};

export default CalendarNavigation;
