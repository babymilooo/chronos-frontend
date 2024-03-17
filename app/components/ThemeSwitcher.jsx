import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { SunIcon } from './images/Sun';
import { MoonIcon } from './images/Moon';

const ThemeSwitcher = () => {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Update isSelected when the theme changes
        setMounted(true);
    }, [theme]); // Add theme as a dependency

    if (!mounted) return null;

    const isLightTheme = resolvedTheme === "light";

    return (
        <div>
            <Switch
                size="lg"
                color="default"
                isSelected={isLightTheme}
                thumbIcon={({ isSelected, className }) =>
                    isSelected ? (
                        <SunIcon className={className} />
                    ) : (
                        <MoonIcon className={className} />
                    )
                }
                onChange={() => setTheme(isLightTheme ? "dark" : "light")}
            >
            </Switch>
        </div>
    );
};


export default ThemeSwitcher;
