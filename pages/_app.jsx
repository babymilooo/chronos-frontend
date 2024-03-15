import '../app/styles/globals.css'
import RootLayout from '@/app/layouts/layout';
import RootStoreProvider from '@/app/provider/rootStoreProvider';
import MyThemeProvider from '@/app/provider/themesProvider';
import { NextUIProvider } from '@nextui-org/react';

export default function App({ Component, pageProps }) {
    return (
        <MyThemeProvider enableSystem={true} attribute="class" class="bg-bgk text-content">
            <NextUIProvider>
                <RootStoreProvider>
                    <RootLayout>
                        <Component {...pageProps} />
                    </RootLayout>
                </RootStoreProvider>
            </NextUIProvider>
        </MyThemeProvider>
    );
}