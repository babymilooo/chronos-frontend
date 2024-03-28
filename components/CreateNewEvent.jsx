import { useState } from "react";
import { Label } from "./ui/label";
import DatePicker from "./DatePicker";
import MyTimePicker from "./TimePicker";
import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';

import { Button } from "./ui/button";
import CalendarService from "@/app/services/CalendarService";
import SelectUsers from "./SelectUsers";
import { Textarea } from "@/components/ui/textarea"



export const CreateNewEvent = ({ date, time, id, handleUpdate, timeIndex, friends }) => {

    const [startDate, setStartDate] = useState(date);
    const [startTime, setStartTime] = useState(`${time.hour}:${time.minute}`);
    const [eventType, setEventType] = useState("");
    const [endTime, setEndTime] = useState("");
    const [endDate, setEndDate] = useState(date);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [repeat, setRepeat] = useState("");
    const [priority, setPriority] = useState("");
    const [coOwners, setCoOwners] = useState([]);
    const [attendees, setAttendees] = useState([]);

    const formatedDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Добавление 0 спереди, если месяц < 10
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            title,
            startDate,
            endDate,
            startTime,
            endTime,
            eventType,
            repeat,
            priority,
            coOwners,
            attendees,
            description
        };
        // Обработайте formData, например, отправьте на сервер или выведите в консоль
        const formatedStartDate = formatedDate(startDate);
        const formatedEndDate = formatedDate(endDate);

        const result = await CalendarService.createEvent(title, formatedStartDate, formatedEndDate, startTime, endTime, eventType, repeat, priority, coOwners, attendees, description, id);
        if (result) {
            handleUpdate();
        } else {
            console.error('Ошибка создания события');
        }
    };

    const availableForCoOwners = friends?.filter(
        (friend) => !attendees.includes(friend.value)
    );
    const availableForAttendees = friends?.filter(
        (friend) => !coOwners.includes(friend.value)
    );

    return (
        <>
            <Dialog key={timeIndex}>
                <DialogTrigger asChild>
                    <div className="border-l border-b border-foreground2 p-2 h-[50px] w-full z-2 hover:bg-background2"></div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-bold">New Event</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right font-bold">
                                Title
                            </Label>
                            <Input className="col-span-3" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="flex justify-center">
                            <div className="flex items-center justify-between gap-4 w-full">
                                <DatePicker date={startDate} setDate={setStartDate} />
                                <MyTimePicker time={startTime} setTime={setStartTime} />
                                <span className="whitespace-nowrap">to</span>
                                <DatePicker date={endDate} setDate={setEndDate} />
                                <MyTimePicker time={endTime} setTime={setEndTime} />
                            </div>
                        </div>
                        <div>
                            <Select onValueChange={setEventType}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select type of new event" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="arrangement">Arrangement</SelectItem>
                                        <SelectItem value="reminder">Reminder</SelectItem>
                                        <SelectItem value="task">Task</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-2">
                            <div className="col-span-1">
                                <Select onValueChange={setRepeat}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select how many times to repeat the event" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="do not repeat">do not repeat</SelectItem>
                                            <SelectItem value="daily">daily</SelectItem>
                                            <SelectItem value="weekly">weekly</SelectItem>
                                            <SelectItem value="monthly">monthly</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="col-span-1">
                                <Select onValueChange={setPriority}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="specify the event priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="not critical">not critical</SelectItem>
                                            <SelectItem value="low">low</SelectItem>
                                            <SelectItem value="medium">medium</SelectItem>
                                            <SelectItem value="high">high</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-2">
                            <div>
                                <Label className="text-right font-bold">
                                    Co-owners
                                </Label>
                                <SelectUsers users={availableForCoOwners} setUsers={setCoOwners} className="col-span-1" />
                            </div>
                            <div>
                                <Label className="text-right font-bold">
                                    Followers
                                </Label>
                                <SelectUsers users={availableForAttendees} setUsers={setAttendees} className="col-span-1" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-2">
                            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                        </div>
                        {/* Дополнительные поля Select можно раскомментировать и настроить аналогичным образом */}
                        <DialogClose asChild>
                            <Button type="submit">New</Button>
                        </DialogClose>
                    </form>
                </DialogContent>
            </Dialog>

        </>
    );
}
