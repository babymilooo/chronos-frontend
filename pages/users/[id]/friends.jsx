import { useContext, useEffect, useState } from "react";
import UserService from "@/app/services/UserService";
import { observer } from "mobx-react-lite";
import Router from "next/router";
import { RootStoreContext } from "@/app/provider/rootStoreProvider";

const friends = () => {

    const rootStore = useContext(RootStoreContext);
    const { userStore } = rootStore;
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getFriends() {
        try {
            const response = await UserService.getFriends(userStore.user.id);
            setUsers(response.users);

            setLoading(false);
        } catch (error) {
            console.error("Error getting users:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!userStore.isLoading) {
            getFriends();
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

export default observer(friends);