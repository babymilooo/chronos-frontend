import { useEffect, useState } from "react";

export function SideBar({ day }) {
  const [date, setDate] = useState(new Date());
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
  const today = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const [todayData, setTodayData] = useState({ data: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (day && day.data) {
      setTodayData(day);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  function formatDate(dateString) {
    const options = { hour: '2-digit', minute: '2-digit', hour12: false };
    return new Date(dateString).toLocaleTimeString('en-US', options);
  }

  return (
    <div className="w-1/6 border-r border p-4 bg-background2">
      <div className="flex items-center justify-start font-bold text-4xl gap-1 p-2">
        <p>{today}</p>
        <p>{month}</p>
      </div>
      <p className="flex items-center justify-start font-bold text-2xl border-b p-2 border-foreground">{weekday}</p>

      <div className="font-bold mt-2">
        {todayData.data?.length === 0 ? <p>No events for today</p> : (
          <>
            <p className="text-md font-bold">Today you have</p>
            {todayData.data && todayData.data.map((event, eventIndex) => {
              return (
                <div key={eventIndex} className="flex-col justify-start">
                  <div className="bg-red-500 rounded-sm text-white mt-1 flex items-center justify-between p-1">
                    <p className="text-sm">
                      {formatDate(event.data.startTime)}
                    </p>
                    <div className="text-sm flex-col justify-center ">
                      <p>{event.data.name}</p>
                      <p className="text-xs text-center">{event.data.description}</p>
                    </div>
                    <p className="text-sm">
                      {formatDate(event.data.endTime)}
                    </p>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
