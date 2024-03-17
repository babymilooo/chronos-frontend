import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from "../provider/rootStoreProvider";

const RootLayout = ({ children }) => {
    const rootStore = useContext(RootStoreContext);
    const [isDataReady, setIsDataReady] = useState(false);
    const { userStore, holidaysStore } = rootStore;

    useEffect(() => {
        const checkAuthentication = async () => {
            await userStore.checkAuth();
            if (!userStore.isLoading) {
                await holidaysStore.getHolidays(userStore.currentYear);
                console.log("data ready");
                setIsDataReady(true);
            }
            return;
        };
        checkAuthentication();
    }, [userStore, holidaysStore]);

    return (
        <>
            <Head>
                <title>Next.js App</title>
                <link rel="icon" href="../favicon.ico" />
                <meta name="description" content="Next.js App" />
            </Head>
            <div className="bg-bkg text-content">
                {isDataReady ? children : <div>Loading...</div>}
            </div>
        </>
    )
}

export default observer(RootLayout);