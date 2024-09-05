"use client";
import { Button } from "./button";
import { Sun, Moon } from "lucide-react";
import useSetTheme from "@/hooks/useSetTheme";

export default function ThemeToggle() {
	const { toggleTheme } = useSetTheme();

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={toggleTheme}
			className="ml-2"
		>
			<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="hidden sr-only md:flex">Toggle theme</span>
		</Button>
	);
}