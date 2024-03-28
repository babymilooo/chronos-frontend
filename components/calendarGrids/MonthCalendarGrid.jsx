import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/MyPopover';

const MonthCalendarGrid = ({ calendar }) => {
    function formatDate(dateString) {
        const options = { hour: '2-digit', minute: '2-digit', hour12: false };
        return new Date(dateString).toLocaleTimeString('en-US', options);
    }

    function getWeekday(date) {
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    }

    console.log(calendar)
    return (
        <div className="flex-grow">
            <div className="grid grid-cols-7 gap-1 w-full">
                <div className="col-span-1 flex justify-center items-center font-bold">Sun</div>
                <div className="col-span-1 flex justify-center items-center font-bold">Mon</div>
                <div className="col-span-1 flex justify-center items-center font-bold">Tue</div>
                <div className="col-span-1 flex justify-center items-center font-bold">Wed</div>
                <div className="col-span-1 flex justify-center items-center font-bold">Thu</div>
                <div className="col-span-1 flex justify-center items-center font-bold">Fri</div>
                <div className="col-span-1 flex justify-center items-center font-bold">Sat</div>
            </div>
            <div className="grid grid-cols-7 gap-1 w-full flex-grow min-h-[75vh]">
                {/* Calendar cells */}
                {calendar.map((item, index) => (
                    <Popover key={index}>
                        <PopoverTrigger asChild>
                            <div className={`flex border-t border-foreground2 p-2 cursor-pointer w-full h-full ${!item.isCurrentMonth && 'text-content2'}`}>
                                <div className="text-small font-bold">
                                    {item.day}
                                    {item.data && item.data.map((data, index) =>
                                        data.type === 'holiday' ? (<span key={index}> - {data.data.name}</span>) : null
                                    )}
                                </div>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent side="left" className="p-4 rounded-md">
                            <div className="flex items-end border-b border-content2 p-2">
                                <div className="font-bold">
                                    <div className="text-xl">

                                    {item.day} - {getWeekday(item.dateStr)}
                                    </div>
                                    {item.data && item.data.map((data, index) =>
                                        data.type === 'holiday' ? (<span key={index}>{data.data.name}</span>) : null
                                    )}
                                </div>
                            </div>
                            {item.data && item.data.length > 0 ? (
                                <div>
                                    {item.data.map((data, dataIndex) => (
                                        <div key={dataIndex} className="my-2">
                                            {data.type === 'event' ?
                                                <div className="bg-red-500 rounded-sm text-white mt-1 flex items-center justify-between p-2">
                                                    <p className="text-sm">
                                                        {formatDate(data.data.startTime)}
                                                    </p>
                                                    <div className="text-sm flex-col justify-center mx-10">
                                                        <p>{data.data.name}</p>
                                                        <p className="text-xs text-center">{data.data.description}</p>
                                                    </div>
                                                    <p className="text-sm">
                                                        {formatDate(data.data.endTime)}
                                                    </p>
                                                </div>
                                                : <p>No events</p>}
                                            {/* Render other event details here */}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No events</p>
                            )}
                        </PopoverContent>
                    </Popover>
                ))}
            </div>
        </div>
    );

};

export default MonthCalendarGrid;