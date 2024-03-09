import { useContext, useState } from 'react';
import { Context } from './_app';
import { observer } from 'mobx-react-lite';
import GetHolidays from '@/app/components/GetHolidays';
import GetEvents from '@/app/components/GetEvents';

const calendar = () => {
    const { userStore } = useContext(Context);
    const [currentYear, setCurrentYear] = useState((new Date()).getFullYear());

    if (userStore.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Календарь</h1>
            <ul>
                <GetHolidays currentYear={currentYear} />
                <GetEvents currentYear={currentYear} id={userStore.user.id} />
                <p>{userStore.user.username}</p>
            </ul>
        </div>
    );
};

export default observer(calendar);
