import { Context } from "@/pages/_app";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";

export default function RootLayout({ children }) {
    const { userStore } = useContext(Context);

    useEffect(() => {
        const checkAuthentication = async () => {
            await userStore.checkAuth();
        };

        checkAuthentication();
    }, []);

    return (
        <>
            <Head>
                <title>Next.js App</title>
                <link rel="icon" href="./favicon.ico" />
                <meta name="description" content="Next.js App" />
            </Head>
            <div>
                {children}
            </div>
        </>
    )
}