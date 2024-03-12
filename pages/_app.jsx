import '../app/styles/globals.css'
import RootLayout from '@/app/layouts/layout';
import RootStoreProvider from '@/app/provider/rootStoreProvider';

export default function App({ Component, pageProps }) {
    return (
        <RootStoreProvider>
            <RootLayout>
                <Component {...pageProps} />
            </RootLayout>
        </RootStoreProvider>
    );
}