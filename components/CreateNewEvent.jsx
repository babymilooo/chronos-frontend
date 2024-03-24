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
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "./ui/button";


export const CreateNewEvent = ({ date, time }) => {


    const [startDate, setStartDate] = useState(date);
    const [startTime, setStartTime] = useState(`${time.hour}:${time.minute}`);
    const [eventType, setEventType] = useState("");
    const [endTime, setEndTime] = useState("");
    const [endDate, setEndDate] = useState(date);
    const [title, setTitle] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            title,
            startDate,
            endDate,
            startTime,
            endTime,
            eventType
        };
        // Обработайте formData, например, отправьте на сервер или выведите в консоль
        console.log(formData);
    };

    return (<form onSubmit={handleSubmit} className="space-y-4">
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
            <Select onChange={(e) => setEventType(e.target.value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type of new event" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="arrangement">Arrangement</SelectItem>
                    <SelectItem value="reminder">Reminder</SelectItem>
                    <SelectItem value="task">Task</SelectItem>
                </SelectContent>
            </Select>
        </div>
        {/* Дополнительные поля Select можно раскомментировать и настроить аналогичным образом */}
        <div className="flex justify-end pt-4">
            <Button type="submit">New</Button>
        </div>
    </form>
    );
}
