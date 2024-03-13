class EventsUtils {
    static async eventsDataWithDateTime(eventsData) {
        const eventsDataWithDateTime = eventsData.map(event => {
            const startTime = new Date(event.startTime);
            const date = startTime.toLocaleDateString();
            const [day, month, year] = date.split('.');

            // Create a new Date object with the provided day, month, and year
            const dateObject = new Date(`${year}-${month}-${day}`);

            // Format the date to "YYYY-MM-DD"
            const formattedDate = dateObject.toISOString().split('T')[0];

            return {
                ...event,
                date: formattedDate,
                time: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                name: event.title
            };
        });

        return eventsDataWithDateTime;
    }
}

export default EventsUtils;