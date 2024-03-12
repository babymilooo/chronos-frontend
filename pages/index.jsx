import { useContext, useEffect } from "react";
import Router from "next/router";
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from "@/app/provider/rootStoreProvider";

const index = () => {
    const rootStore = useContext(RootStoreContext);
    const { userStore } = rootStore;

    useEffect(() => {
        if (!userStore.isLoading) {
            Router.push('/calendar');
        }

    }, [userStore.isLoading]);

    return null;
};

export default observer(index);