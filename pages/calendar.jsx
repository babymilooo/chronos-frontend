import { useContext, useState } from 'react';
import { Context } from './_app';
import { observer } from 'mobx-react-lite';
import GetHolidays from '@/app/components/GetHolidays';
import GetEvents from '@/app/components/GetEvents';
import Router from 'next/router';

const calendar = () => {
    const { userStore } = useContext(Context);
    const [currentYear, setCurrentYear] = useState((new Date()).getFullYear());

    return (
        <div>
            {userStore.isLoading ? <div>Loading...</div> :
                <>
                    <h1>Календарь</h1>
                    <ul>
                        <GetHolidays currentYear={currentYear} />
                        <GetEvents currentYear={currentYear} id={userStore.user.id} />
                        <p>{userStore.user.username}</p>
                        <button onClick={() => { Router.push('/calendar/createNewEvent') }} className="border-2 border-black">create new</button>
                        <button onClick={() => { Router.push('/users') }} className="border-2 border-black">users</button>
                    </ul>
                </>}
        </div>
    );
};

export default observer(calendar);
