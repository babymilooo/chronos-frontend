import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/MyPopover';

const MonthCalendarGrid = ({ calendar }) => {

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
                                <div className="font-bold text-xl">
                                    {item.day}
                                    {item.data && item.data.map((data, index) =>
                                        data.type === 'holiday' ? (<span key={index}> - {data.data.name}</span>) : null
                                    )}
                                </div>
                            </div>
                            {item.data && item.data.length > 0 ? (
                                <div>
                                    {item.data.map((data, dataIndex) => (
                                        <div key={dataIndex} className="my-2">
                                            {/* <p className="font-bold">{data.type === 'holiday' ? data.name : 'Event'}</p>
                                            <p>{data.description}</p> */}
                                            <div className="font-bold">
                                                {/* {data.type === 'event' ? data.data.name : <div>no events...</div>} */}
                                                {data.type === 'event' ? <div>
                                                    <p>{data.data.startTime} - {data.data.endTime}</p>
                                                    <p>{data.data.name}</p>
                                                </div> : <div>no events...</div>}

                                            </div>
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