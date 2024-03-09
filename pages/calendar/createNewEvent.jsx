import { useContext } from "react";
import { Context } from "../_app";
import CreateNewEvent from "../../app/components/createNewEvent";
import { observer } from 'mobx-react-lite';

const createNewEvent = () => {
    const { userStore } = useContext(Context);

    if (userStore.isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1>Create new Event</h1>
            <p>{userStore.user.username}</p>
            <CreateNewEvent id={userStore.user.id} />
        </div>
    );
};

export default observer(createNewEvent);