import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Head from "next/head";

export default function RootLayout({ children }) {
  return (
    <>
      <Head lang="en" suppressHydrationWarning>
        <title>CHRONOS</title>
        <link rel="icon" href="../favicon.ico" />
        <meta name="description" content="Next.js App" />
      </Head>
      
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
}
