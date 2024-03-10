import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import Router from "next/router";

const GetUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getUsers() {
        try {
            const response = await UserService.getUsers();
            setUsers(response.users);

            setLoading(false);
        } catch (error) {
            console.error("Error getting users:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

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

export default GetUsers;