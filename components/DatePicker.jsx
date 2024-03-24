import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

import { CalendarIcon } from "@radix-ui/react-icons"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

function DatePicker({ cn, date, format, setDate }) {
    return (<Popover>
        <PopoverTrigger asChild>
            <Button variant={"outline"} className={cn("w-[200px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
    </Popover>);
}

export default DatePicker;