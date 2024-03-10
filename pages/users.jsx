import React, { useContext } from 'react';
import { Context } from './_app';
import GetUsers from '@/app/components/GetUsers';

const users = () => {
    const userStore = useContext(Context);

    return (
        <div>
            <h1 className="font-bold text-3xl">users</h1>
            <GetUsers />
        </div>
    );
};

export default users;