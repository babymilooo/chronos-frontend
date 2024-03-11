import { Context } from "./_app";
import { useContext, useEffect } from "react";
import Router from "next/router";
import { observer } from 'mobx-react-lite';
import { UserContext } from "@/app/Contexts/Contexts";

const index = () => {
    const { userStore } = useContext(UserContext);

    useEffect(() => {
        if (!userStore.isLoading) {
            Router.push('/calendar');
        }
        
    }, [userStore.isLoading]);

    return null;
};

export default observer(index);