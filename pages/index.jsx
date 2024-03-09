import { Context } from "./_app";
import { useContext, useEffect } from "react";
import Router from "next/router";

const index = () => {
    const { userStore } = useContext(Context);

    useEffect(() => {
        if (!userStore.isLoading) {
            Router.push('/login');
        }
    }, [Router]);

    return null;
};

export default index;