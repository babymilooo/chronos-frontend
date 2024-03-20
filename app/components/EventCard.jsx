import React from 'react';

// Sample event data

// Assuming the calendar starts at 8:00 AM

// EventCard component to display an event
const EventCard = ({ event }) => {
    if (!event) return null;

    // Parse the start and end times
    const startTime = new Date(event.startTime);
    const endTime = new Date(event.endTime);

    const getTopPosition = (date) => {
        // Calculate the position based on the start time
        const hourHeight = 60; // Adjust this based on the actual height of your hour rows
        const minutesFromStartOfDay = date.getHours() * 60 + date.getMinutes();
        return (minutesFromStartOfDay / 60) * hourHeight;
    };

    const getEventHeight = () => {
        // Calculate the height based on the duration
        const duration = (endTime - startTime) / 60000; // Convert duration from ms to minutes
        const heightPerMinute = 1; // Adjust this based on your actual minute height
        return duration * heightPerMinute;
    };

    const eventStyle = {
        top: `${getTopPosition(startTime)}px`,
        height: `${getEventHeight()}px`,
        // Add other styles as needed
    };

    return (
        <div className="absolute left-0 right-0 bg-blue-500 text-white p-2" style={eventStyle}>
            <h4>{event.name}</h4>
            <p>{`${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()}`}</p>
            <p>{event.description}</p>
            {/* Add more event details here */}
        </div>
    );
};


export default EventCard;