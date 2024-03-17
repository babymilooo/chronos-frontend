import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from "../provider/rootStoreProvider";

const RootLayout = ({ children }) => {
    const rootStore = useContext(RootStoreContext);
    const [loading, setLoading] = useState(true);
    const { userStore, holidaysStore } = rootStore;

    useEffect(() => {
        const checkAuthentication = async () => {
            await userStore.checkAuth();
            if (!userStore.isLoading) {
                try {
                    // Fetch holidays and wait for it to finish before setting loading to false
                    await holidaysStore.getHolidays(userStore.currentYear);
                    console.log("data ready");
                } catch (error) {
                    console.error("Failed to fetch holidays", error);
                } finally {
                    // Set loading to false regardless of success or error
                    setLoading(false);
                }
            }
            return;
        };
        checkAuthentication();
    }, [userStore, holidaysStore]);

    if (loading) {
        // Show a loading screen or a spinner while data is being fetched
        return <div>Loading...</div>;
    }

    return (
        <>
            <Head>
                <title>Next.js App</title>
                <link rel="icon" href="../favicon.ico" />
                <meta name="description" content="Next.js App" />
            </Head>
            <div className="bg-bkg text-content">
                {children}
            </div>
        </>
    )
}

export default observer(RootLayout);