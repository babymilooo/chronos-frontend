class CalendarUtils {
    static getDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    };

    static getFirstDayOfMonth = (year, month) => {
        return new Date(year, month - 1, 1).getDay(); // Month is zero-based, so subtract 1
    };

    static getCalendarGrid = (year, month, mergedCalendar) => {
        const daysInMonth = this.getDaysInMonth(year, month);
        const firstDayOfWeek = this.getFirstDayOfMonth(year, month);
        const calendarGrid = Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1;
            const data = mergedCalendar.find(item => {
                const date = new Date(item.date);
                return date.getDate() === day && date.getMonth() + 1 === month;
            }); // Get data for this day from mergedCalendar
            return { day, data };
        });

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfWeek; i++) {
            calendarGrid.unshift({ day: '', data: null });
        }

        return calendarGrid;
    };
}

export default CalendarUtils;