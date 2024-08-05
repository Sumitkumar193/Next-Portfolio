import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useRecoilState } from "recoil";
import { Button } from "./button";
import { Sun, Moon } from "lucide-react";
import themeState from "@/states/ThemeState";

export default function ThemeToggle() {
	const [theme, setTheme] = useRecoilState(themeState);
	const themeHook = useTheme();

	useEffect(() => {
		themeHook.setTheme(themeHook.systemTheme ?? "light")
	}, [themeHook]);

	useEffect(() => {
		themeHook.setTheme(theme);
	}, [theme, themeHook]);

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setTheme(theme === "light" ? "dark" : "light")}
			className="ml-2"
		>
			<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
