import { useEffect, useState } from "react";
import UserService from "@/app/services/UserService";
import { useRouter } from "next/router";

const user = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState({});

    const getUser = async () => {
        try {
            const response = await UserService.getUser(id);
            setUser(response.user);
        } catch (error) {
            console.error("Error getting user:", error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div>
            <h1>{user.username}</h1>
            <p>{user.email}</p>
        </div>
    );
};

export default user;