import { useEffect, useRef, useState } from "react";
import UserService from "@/app/services/UserService";
import { useRouter } from "next/router";

const userPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({});
    const [isFriend, setIsFriend] = useState(false);

    async function getUser(id) {
        try {
            const response = await UserService.getUser(id);
            setUser(response);
        } catch (error) {
            console.error("Error getting user:", error);
        }
    }

    async function checkIsFriend(id) {
        try {
            const response = await UserService.isFriend(id);
            setIsFriend(response.isFriend);
        } catch (error) {
            console.error("Error getting user:", error);
        }
    }

    useEffect(() => {
        const { id } = router.query;

        if (id) {
            getUser(id);
            checkIsFriend(id);
        }

    }, [router.query]);

    const handeClick = async () => {
        try {
            const response = await UserService.addToFriend(user.id);
        } catch (error) {
            console.error("Error adding to friend:", error);
        }
    }

    return (
        <div>
            {user && (
                <>
                    <h1>{user.username}</h1>
                    {isFriend ? <p>is friend</p> :
                        <button
                            className="border border-gray-700"
                            onClick={handeClick}
                        >add to friend</button>}

                </>
            )}

        </div>
    );
};

export default userPage;