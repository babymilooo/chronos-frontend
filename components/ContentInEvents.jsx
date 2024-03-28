import { useEffect, useState } from "react";
import {
    Popover as MyPopover,
    PopoverContent as MyPopoverContent,
    PopoverTrigger as MyPopoverTrigger
} from '@/components/MyPopover';
import UserService from "@/app/services/UserService";
import { Avatar } from "./ui/avatar";

export function ContentInEvents({
    eventIndex,
    day,
    weekday,
    startTime,
    endTime,
    event
}) {

    const [creatorData, setCreatorData] = useState(null);
    const [coOwnersData, setCoOwnersData] = useState(null);
    const [followersData, setFollowersData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Асинхронная самовызывающаяся функция внутри useEffect
        async function fetchCoOwnersData() {
            try {
                // Преобразуем каждый элемент массива coOwners в отдельный запрос
                const requests = event.coOwners.map(coOwner => UserService.getUser(coOwner));
                // Дожидаемся выполнения всех запросов одновременно
                const responses = await Promise.all(requests);
                setCoOwnersData(responses);
            } catch (error) {
                console.error(error);
                setCoOwnersData([]); // Установите в пустой массив в случае ошибки
            }
        }

        async function fetchFolowersData() {
            try {
                // Преобразуем каждый элемент массива coOwners в отдельный запрос
                const requests = event.followers.map(follower => UserService.getUser(follower));
                // Дожидаемся выполнения всех запросов одновременно
                const responses = await Promise.all(requests);
                setFollowersData(responses);
            } catch (error) {
                console.error(error);
                setFollowersData([]); // Установите в пустой массив в случае ошибки
            }
        }

        if (event.coOwners && event.coOwners.length > 0) {
            fetchCoOwnersData();
        }

        if (event.followers && event.followers.length > 0) {
            fetchFolowersData();
        }

        (async () => {
            try {
                // Используйте Promise.all для ожидания всех запросов одновременно
                const [creator] = await Promise.all([
                    UserService.getUser(event.user),
                ]);

                // После получения всех данных обновите состояние
                setCreatorData(creator);
                setLoading(false); // Теперь можно установить загрузку в false
            } catch (error) {
                console.error(error);
                setLoading(false); // Установите загрузку в false, даже если произошла ошибка
            }
        })();
    }, []);

    if (loading) {
        return <div></div>;
    }

    return <MyPopover key={eventIndex}>
        <MyPopoverTrigger asChild>
            <div className="absolute left-0 rounded-md border-l-8 border-red-900 bg-red-500 " style={{
                top: `calc(${event.topOffset}px + 2px)`,
                height: `calc(${event.height}px - 3px)`,
                width: `calc(${event.width}% - 2px)`,
                left: `calc(${event.leftOffset}% + 2px)`,
                zIndex: 30
            }}>
                <div className="p-2 truncate">
                    <h3 className="text-xs font-bold text-white truncate">{event.name}</h3>
                    <p className="text-xs truncate">{event.description}</p>
                </div>
            </div>
        </MyPopoverTrigger>
        <MyPopoverContent side="left" className="p-4 rounded-md">
            <div>
                <div className="flex-col items-start border-b border-content2 p-2">
                    <div className="font-bold text-xl mb-2">
                        <p>{event.name}</p>
                    </div>
                    <div className="text-sm flex gap-2">
                        <p>{day}</p>
                        <p>{weekday}</p>
                        <p>{startTime} - {endTime}</p>
                    </div>
                </div>
                <p className="font-bold mt-4">Creator:</p>
                <div className="flex items-center rounded-xl mt-1 hover:bg-foreground2 p-1">
                    {creatorData ?
                        <>
                            <Avatar>
                                <img src={creatorData.image} alt={creatorData.username} />
                            </Avatar>
                            <p className="ml-2 font-bold">{creatorData.username}</p>
                        </>
                        : <p>Loading...</p>}

                </div>
                {Array.isArray(coOwnersData) ? (
                    <>
                        <p className="font-bold mt-4">Co-owners:</p>
                        {coOwnersData.map((coOwner, index) => (
                            <div key={index} className="flex items-center rounded-xl mt-1 hover:bg-foreground2 p-1">
                                <Avatar>
                                    <img src={coOwner.image} alt={coOwner.username} />
                                </Avatar>
                                <p className="ml-2 font-bold">{coOwner.username}</p>
                            </div>
                        ))}
                    </>
                ) : null}
                {Array.isArray(followersData) ? (
                    <>
                        <p className="font-bold mt-4">followers:</p>
                        {followersData.map((follower, index) => (
                            <div key={index} className="flex items-center rounded-xl mt-1 hover:bg-foreground2 p-1">
                                <Avatar>
                                    <img src={follower?.image} alt={follower.username} />
                                </Avatar>
                                <p className="ml-2 font-bold">{follower.username}</p>
                            </div>
                        ))}
                    </>
                ) : null}
            </div>
        </MyPopoverContent>
    </MyPopover>;
}
