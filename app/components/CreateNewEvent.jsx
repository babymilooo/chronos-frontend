import { useState } from "react";
import CalendarService from "../services/CalendarService";
import Router from "next/router";


const createNewEvent = (id) => {

    const [form, setForm] = useState({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        coOwners: [],
        attendees: []
    });

    const handleEvent = async () => {
        const { title, date, startTime, endTime, coOwners, attendees } = form;
        console.log(title, date, startTime, endTime, coOwners, attendees, id);
        const result = await CalendarService.createEvent(title, date, startTime, endTime, coOwners, attendees, id);
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
                name="title"
                onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
            />

            <input type="date"
                name="date"
                onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}

                className="border border-gray-900"
            />

            <input type="time"
                name="startTime"
                onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
                className="border border-gray-900"
            />

            <input type="time"
                name="endTime"
                onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
                className="border border-gray-900"
            />

            <input type="text"
                name="coOwners"
                onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
                className="border border-gray-900"
            />

            <input type="text"
                name="attendees"
                onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
                className="border border-gray-900"
            />

            <button onClick={handleEvent}>create</button>
            <br />
            <button onClick={handeBack}>back</button>
        </div>
    );
};

export default createNewEvent;