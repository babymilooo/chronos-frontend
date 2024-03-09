import { useState } from "react";
import CalendarService from "../services/CalendarService";
import Router from "next/router";


const createNewEvent = (id) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [user, setUser] = useState("");
    const [coOwners, setCoOwners] = useState([]);
    const [attendees, setAttendees] = useState([]);

    const handleEvent = async () => {
        const result = await CalendarService.createEvent(title, date, startTime, endTime, id, coOwners, attendees);
        if (result) {
            Router.push('/calendar');
        } else {
            console.error('Ошибка создания события');
        }
    };

    const handeBack = () => {
        Router.push('/calendar');
    }

    return (
        <div>
            <input type="text"
                className="border border-gray-900"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />

            <input type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="border border-gray-900"
            />

            <input type="time"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="border border-gray-900"
            />

            <input type="time"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                className="border border-gray-900"
            />

            <input type="text"
                value={coOwners}
                onChange={e => setCoOwners(e.target.value)}
                className="border border-gray-900"
            />

            <input type="text"
                value={attendees}
                onChange={e => setAttendees(e.target.value)}
                className="border border-gray-900"
            />

            <button onClick={handleEvent}>create</button>
            <br />
            <button onClick={handeBack}>back</button>
        </div>
    );
};

export default createNewEvent;