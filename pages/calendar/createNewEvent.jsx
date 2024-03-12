import { useContext } from "react";
import { Context } from "../_app";
import CreateNewEvent from "../../app/components/createNewEvent";
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from "@/app/provider/rootStoreProvider";

const createNewEvent = () => {
    const rootStore = useContext(RootStoreContext);
    const { userStore } = rootStore;

    return (
        <div>
            {userStore.isLoading ? <div>Loading...</div> :
                <>
                    <h1>Create new Event</h1>
                    <p>{userStore.user.username}</p>
                    <CreateNewEvent id={userStore.user.id} />
                </>}
        </div>
    );
};

export default observer(createNewEvent);