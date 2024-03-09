import { useState } from "react";


const createNewEvent = () => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [type, setType] = useState("");

    const handleEvent = async () => {
        const result = await createEvent(title, date, startTime, endTime, type);
        if (result) {
            Router.push('/calendar');
        } else {
            console.error('Ошибка создания события');
        }
    };

    return (
        <div>
            <input type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
             />

            <input type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
             />

            <input type="time"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
             />

            <input type="time"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
             />

            <input type="text"
            value={type}
            onChange={e => setType(e.target.value)}
             />
            
            <button onClick={handleEvent}></button>
        </div>
    );
};

export default createNewEvent;