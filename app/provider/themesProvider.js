"use client";

const { ThemeProvider } = require("next-themes");
const { useState, useEffect } = require("react");

export default function MyThemeProvider({ children }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return <>{children}</>;

    return (
        <ThemeProvider defaultTheme="light" class="bg-bgk text-content">
            {children}
        </ThemeProvider>
    );
}