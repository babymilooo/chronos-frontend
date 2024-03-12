import { useContext, useEffect, useState } from "react";
import UserService from "../services/UserService";
import Router from "next/router";
import { Context } from "@/pages/_app";
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from "../provider/rootStoreProvider";

const GetUsers = () => {

    const rootStore = useContext(RootStoreContext);
    const { userStore } = rootStore;
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getUsers() {
        try {
            const response = await UserService.getUsers(userStore.user.id);
            setUsers(response.users);

            setLoading(false);
        } catch (error) {
            console.error("Error getting users:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!userStore.isLoading) {
            getUsers();
        }
    }, [userStore.user]);

    return (
        <div>
            {loading ? <div>Loading...</div> :
                <>
                    {Array.isArray(users) ? (
                        users.map((user, index) => (
                            <li key={index}> <button key={index} onClick={() => { Router.push(`/users/${user.id}`) }}>{user.username}</button></li>
                        ))
                    ) : (
                        <div>No users found</div>
                    )}
                </>}
        </div>
    );
};

export default observer(GetUsers);