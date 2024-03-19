import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/popover/popover';

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
            <div className="grid grid-cols-7 gap-1 w-full flex-grow  min-h-[75vh]">
                {/* Calendar cells */}
                {calendar.map((item, index) => (
                    <Popover key={index}>
                        {item.day ?
                            <PopoverTrigger asChild>
                                <div className="flex border-t border-content2 p-2 cursor-pointer w-full h-full">
                                    <div className="text-small font-bold">
                                        {
                                            item.isCurrentMonth ?
                                                (<div>
                                                    {`${item.day}${item.data ? ` - ${item.data.name}` : ''}`}
                                                </div>)
                                                :
                                                (<div className="text-content2">
                                                    {`${item.day}${item.data ? ` - ${item.data.name}` : ''}`}
                                                </div>)
                                        }
                                    </div>
                                </div>
                            </PopoverTrigger> : <div className="flex border-t border-content2 p-2 w-full h-full">
                                <div className="text-small font-bold">
                                    {`${item.day}${item.data ? ` - ${item.data.name}` : ''}`}
                                </div>
                            </div>
                        }
                        <PopoverContent side="left" className="p-4 rounded-md">
                            <div>
                                <div className="flex items-end border-b border-content2 p-2">
                                    <p className="font-bold text-xl">{item.day}</p>
                                    <div>{item.data && item.data.type === 'holiday' ?
                                        <div className="flex">
                                            <p className="ml-1">{item.data.name}</p>
                                        </div>
                                        :
                                        null
                                    }</div>
                                </div>
                                <div>
                                    {item.data && item.data.type === 'events' ? (
                                        <div>
                                            <p>{item.data.name}</p>
                                            {/* Если в data могут быть другие поля, относящиеся к событиям, отобразите их здесь */}
                                            <p>{item.data.date}</p>
                                            {/* И так далее для других полей */}
                                        </div>
                                    ) : (
                                        <p>No events</p>
                                    )}
                                </div>
                            </div>
                        </PopoverContent>

                    </Popover>

                ))}

            </div>
        </div>
    );
};

export default MonthCalendarGrid;