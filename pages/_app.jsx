import '../app/styles/globals.css'
import RootLayout from '@/app/layouts/layout';
import RootStoreProvider, { RootStoreContext } from '@/app/provider/rootStoreProvider';
import MyThemeProvider from '@/app/provider/themesProvider';
import { useContext, useEffect } from 'react';

export default function App({ Component, pageProps }) {

    const rootStore = useContext(RootStoreContext);
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
                }
            }
            return;
        };
        checkAuthentication();
    }, []);

    return (
        <MyThemeProvider enableSystem={true} attribute="class" class="bg-bgk text-content">
            <RootStoreProvider>
                <RootLayout>
                    <Component {...pageProps} />
                </RootLayout>
            </RootStoreProvider>
        </MyThemeProvider>
    );
}