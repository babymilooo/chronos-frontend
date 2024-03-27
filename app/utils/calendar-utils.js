class CalendarUtils {
    static createCalendarGrid = async (mergedCalendar, year, month, date, setMonthCalendar, setWeek, setDay) => {
        // Get the month calendar grid
        const calendarGrid = this.getCalendarGrid(year, month, mergedCalendar);
        setMonthCalendar(calendarGrid);
        console.log("calendarGrid", calendarGrid);
        // Get the week calendar grid
        const weekNumber = this.getCurrentWeekNumber(date);
        const weekCalendarGrid = this.getWeekCalendarGrid(calendarGrid, weekNumber);
        setWeek(weekCalendarGrid);
        console.log("weekCalendarGrid", weekCalendarGrid);

        // Get the day calendar grid
    }

    static updateCalendarGrid = async (date, mergedCalendar, setMonthCalendar, setWeekCalendar, setDayCalendar) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        const monthCalendarGrid = CalendarUtils.getCalendarGrid(year, month, mergedCalendar);
        setMonthCalendar(monthCalendarGrid);

        const weekNumber = CalendarUtils.getCurrentWeekNumber(date);
        const weekCalendarGrid = CalendarUtils.getWeekCalendarGrid(monthCalendarGrid, weekNumber);
        setWeekCalendar(weekCalendarGrid);
    }

    static getDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    };

    static getFirstDayOfMonth = (year, month) => {
        return new Date(year, month - 1, 1).getDay(); // Month is zero-based, so subtract 1
    };

    static getCalendarGrid = (year, month, mergedCalendar) => {
        // Helper function to create the date string
        const buildDateObject = (year, month, day) => {
            // В JavaScript, месяц начинается с 0 (0 для января, 11 для декабря), поэтому вычитаем 1 из месяца.
            return new Date(year, month - 1, day);
        };

        // Helper function to get data for a specific day
        const getDataForDay = (year, month, day) =>
            mergedCalendar.filter(item => {
                const itemDate = new Date(item.data.date);
                return itemDate.getFullYear() === year &&
                    itemDate.getMonth() + 1 === month &&
                    itemDate.getDate() === day;
            }).map(item => ({ data: { ...item.data }, type: item.type }));

        const firstDayOfWeek = this.getFirstDayOfMonth(year, month);
        const daysInPreviousMonth = this.getDaysInMonth(year, month - 1);
        const daysInCurrentMonth = this.getDaysInMonth(year, month);

        const calendarGrid = [];

        // Add days from the previous month
        for (let i = daysInPreviousMonth - firstDayOfWeek + 1; i <= daysInPreviousMonth; i++) {
            const prevMonthYear = month === 1 ? year - 1 : year;
            const prevMonth = month === 1 ? 12 : month - 1;
            const dateStr = buildDateObject(prevMonthYear, prevMonth, i);
            const data = getDataForDay(prevMonthYear, prevMonth, i);
            calendarGrid.push({ day: i, dateStr, data, isPrevMonth: true });
        }

        // Add days from the current month
        for (let i = 1; i <= daysInCurrentMonth; i++) {
            const dateStr = buildDateObject(year, month, i);
            const data = getDataForDay(year, month, i);
            calendarGrid.push({ day: i, dateStr, data, isCurrentMonth: true });
        }

        // Add days from the next month
        let nextMonthDaysAdded = 0;
        while (calendarGrid.length < 42) { // Assuming a 6-row calendar
            nextMonthDaysAdded++;
            const nextMonthYear = month === 12 ? year + 1 : year;
            const nextMonth = month === 12 ? 1 : month + 1;
            const dateStr = buildDateObject(nextMonthYear, nextMonth, nextMonthDaysAdded);
            const data = getDataForDay(nextMonthYear, nextMonth, nextMonthDaysAdded);
            calendarGrid.push({ day: nextMonthDaysAdded, dateStr, data, isNextMonth: true });
        }

        return calendarGrid;
    };

    // static getDayCalendarGrid = (monthCalendarGrid, day) {

    // }

    static getWeekCalendarGrid = (monthCalendarGrid, weekNumber) => {
        // Calculate the index range for the desired week
        const startIndex = (weekNumber - 1) * 7;
        const endIndex = startIndex + 7;

        // Slice out the week's worth of data from the month grid
        const weekCalendarGrid = monthCalendarGrid.slice(startIndex, endIndex);

        return weekCalendarGrid;
    };

    static getCurrentWeekNumber = (date) => {
        // Get the first day of the month
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

        // Calculate the week number based on the provided date
        const dayOfMonth = date.getDate();
        const weekDay = date.getDay();

        // Find the previous Sunday
        const previousSunday = dayOfMonth - weekDay;

        // Calculate current week number
        let weekNumber = Math.ceil((previousSunday + firstDayOfMonth) / 7);

        return weekNumber;
    };

}

export default CalendarUtils;