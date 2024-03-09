import { Context } from "./_app";
import { useContext, useEffect } from "react";
import Router from "next/router";

const index = () => {
    const { userStore } = useContext(Context);

    useEffect(() => {
        if (userStore.isLoading) {
            Router.push('/calendar');
        } else {
            Router.push('/login');
        }
    }, [userStore.getisAuth, Router]);

    return null;
};

export default index;