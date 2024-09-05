"use client";
import { useTheme } from "next-themes";

export default function useSetTheme() {
	const { theme: currentTheme, setTheme: setNextTheme, systemTheme } = useTheme();
    
    function toggleTheme() {
        setNextTheme(
            currentTheme === "system" ?
                (systemTheme === "dark" ? "light" : "dark") : 
                (currentTheme === "dark" ? "light" :"dark")
        );
        return currentTheme;
    }

    return { toggleTheme };
}
