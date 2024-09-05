"use client";
import { useLayoutEffect, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import NavItems from "@/components/ui/NavItems";
import ThemeToggle from "@/components/ui/ThemeToggle";
import mobileState from "@/states/MobileState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useAuth from "@/hooks/useAuth";
import { isLoggedInSelector } from "@/states/LoginState";
import Profile from "./Profile";

const HeaderNavbar = () => {
	const router = useRouter();
	const { logout } = useAuth();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const isLoggedInCheck = useRecoilValue(isLoggedInSelector);
	const setIsMobile = useSetRecoilState(mobileState);

	useLayoutEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [setIsMobile]);

	useEffect(() => {
		setIsLoggedIn(isLoggedInCheck);
	}, [isLoggedInCheck]);

	return (
		<header className="flex items-center sm:justify-between md:justify-around px-4 py-3 bg-background border-b border-border">
			<div className="flex items-center space-x-4">
				<h1 className="text-xl font-bold text-foreground">My App</h1>
				<nav className="hidden md:block">
					<ul className="flex space-x-4">
						<NavItems />
					</ul>
				</nav>
			</div>
			<div className="flex items-center space-x-2">
				<div className="hidden md:flex items-center space-x-2 bg-muted rounded-md px-2">
					<Search className="h-4 w-3 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search..."
						className="bg-transparent border-none focus:outline-none text-sm w-64"
					/>
				</div>
				{isLoggedIn ? (
					<div className="hidden md:flex">
						<Profile />
					</div>
				) : (
					<Button
						onClick={() => router.push("/login")}
						variant="outline"
						className="hidden md:inline-flex text-muted-foreground hover:text-foreground"
					>
						Sign In
					</Button>
				)}
				<div className="md:hidden">
					<ThemeToggle />
				</div>
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden"
						>
							<Menu className="h-6 w-6" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent
						side="right"
						className="w-[300px] sm:w-[400px] bg-background"
					>
						<SheetHeader>
							<SheetTitle />
						</SheetHeader>
						<nav className="flex flex-col space-y-4 mt-4">
							<NavItems />
							{isLoggedIn ? (
								<div className="fixed bottom-4 m-2">
									<Profile />
								</div>
							) : (
								<Button
									onClick={() => router.push("/login")}
									variant="outline"
									className="w-full"
								>
									Sign In
								</Button>
							)}
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
};

export default HeaderNavbar;
