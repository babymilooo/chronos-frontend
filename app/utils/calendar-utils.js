class CalendarUtils {
    static getDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    };

    static getFirstDayOfMonth = (year, month) => {
        return new Date(year, month - 1, 1).getDay(); // Month is zero-based, so subtract 1
    };

    static getCalendarGrid = (year, month, mergedCalendar) => {
        // Get the first day of the current month and the number of days in the previous and current months
        const firstDayOfWeek = this.getFirstDayOfMonth(year, month);
        const daysInPreviousMonth = this.getDaysInMonth(year, month - 1);
        const daysInCurrentMonth = this.getDaysInMonth(year, month);

        const calendarGrid = [];

        // Add days from the previous month
        for (let i = daysInPreviousMonth - firstDayOfWeek + 1; i <= daysInPreviousMonth; i++) {
            calendarGrid.push({ day: i, data: null, isPrevMonth: true });
        }

        // Add days from the current month
        for (let i = 1; i <= daysInCurrentMonth; i++) {
            const data = mergedCalendar.find(item => {
                const date = new Date(item.date);
                return date.getDate() === i && date.getMonth() + 1 === month;
            });
            calendarGrid.push({ day: i, data, isCurrentMonth: true });
        }

        // Add days from the next month
        const daysInNextMonth = 42 - calendarGrid.length; // Assuming a 6-row calendar
        for (let i = 1; i <= daysInNextMonth; i++) {
            calendarGrid.push({ day: i, data: null, isNextMonth: true });
        }

        return calendarGrid;
    };

    static getWeekCalendarGrid = (monthCalendarGrid, weekNumber) => {
        // Calculate the index range for the desired week
        const startIndex = (weekNumber - 1) * 7;
        const endIndex = startIndex + 7;

        // Slice out the week's worth of data from the month grid
        const weekCalendarGrid = monthCalendarGrid.slice(startIndex, endIndex);

        return weekCalendarGrid;
    };

    static getCurrentWeekNumber = (year, month) => {
        // Get the first day of the month
        const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

        // Get the current date
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based
        const currentDay = currentDate.getDate();

        // Check if the current month and year match the provided arguments
        if (year !== currentYear || month !== currentMonth) {
            return 1; // If not, return 1 as default
        }

        // Calculate the week number
        const dayOfMonth = currentDate.getDate();
        const weekDay = currentDate.getDay();

        // Find the previous Sunday
        const previousSunday = dayOfMonth - weekDay;

        // Calculate current week number
        let weekNumber = Math.ceil((previousSunday + firstDayOfMonth) / 7);

        return weekNumber;
    };


}

export default CalendarUtils;