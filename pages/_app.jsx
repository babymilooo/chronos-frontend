import userStore from '@/app/store/userData';
import '../app/styles/globals.css'
import { createContext } from 'react';
import RootLayout from '@/app/layouts/layout';

export const Context = createContext({ userStore });
export default function App({ Component, pageProps }) {
    return (
        <RootLayout>
            <Context.Provider value={{ userStore }}>
                <Component {...pageProps} />
            </Context.Provider>
        </RootLayout>
    );
}