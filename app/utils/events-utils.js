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

    static groupEventsByDate(week) {

        const convertToMinutes = (timeString) => {
            const time = new Date(timeString);
            return time.getHours() * 60 + time.getMinutes();
        };


        const calculateEventDuration = (event) => {
            const startTime = convertToMinutes(event.startTime);
            const endTime = convertToMinutes(event.endTime);
            return endTime - startTime; // duration in milliseconds
        };

        return week.map(dayData => {
            if (!Array.isArray(dayData.data) || dayData.data.length === 0) {
                return dayData;
            }

            const sortedEvents = dayData.data.sort((a, b) => {
                return calculateEventDuration(b.data) - calculateEventDuration(a.data);
            });

            const startTimeCounts = dayData.data.reduce((acc, curr) => {
                const startTime = curr.data.startTime;
                acc[startTime] = (acc[startTime] || 0) + 1;
                return acc;
            }, {});

            const positionInGroupMap = {};

            const updatedEvents = sortedEvents.map((event, eventIndex) => {
                const startTime = event.data.startTime;
                const startMinutes = convertToMinutes(event.data.startTime);
                const duration = calculateEventDuration(event.data);
                const topOffset = (startMinutes / 30) * 50 + 40;
                const height = (duration / 30) * 50;

                positionInGroupMap[startTime] = (positionInGroupMap[startTime] || 0) + 1;

                return {
                    ...event,
                    topOffset: topOffset,
                    height: height,
                    positionInGroup: positionInGroupMap[startTime] - 1,
                    sameStartTimeCount: startTimeCounts[startTime],

                };
            });
            return {
                ...dayData,
                data: updatedEvents,
            };
        });
    }
}

export default EventsUtils;