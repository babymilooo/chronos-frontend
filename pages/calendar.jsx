import { useContext, useState } from 'react';
import { Context } from './_app';
import { observer } from 'mobx-react-lite';
import GetHolidays from '@/app/components/GetHolidays';
import GetEvents from '@/app/components/GetEvents';
import Router from 'next/router';

const calendar = () => {
    const { userStore } = useContext(Context);
    const [currentYear, setCurrentYear] = useState((new Date()).getFullYear());

    if (userStore.isLoading) {
        return <div>Loading...</div>;
    }

    const handeClick = () => {
        Router.push('/calendar/createNewEvent')
    };

    return (
        <div>
            <h1>Календарь</h1>
            <ul>
                <GetHolidays currentYear={currentYear} />
                <GetEvents currentYear={currentYear} id={userStore.user.id} />
                <p>{userStore.user.username}</p>
                <button onClick={handeClick} className="border-2 border-black">create new</button>
            </ul>
        </div>
    );
};

export default observer(calendar);
