import React, { useContext } from 'react';
import { Context } from './_app';
import GetUsers from '@/app/components/GetUsers';
import { RootStoreContext } from '@/app/provider/rootStoreProvider';

const users = () => {
    const rootStore = useContext(RootStoreContext);
    const { userStore } = rootStore;

    return (
        <div>
            <h1 className="font-bold text-3xl">users</h1>
            <GetUsers />
        </div>
    );
};

export default users;