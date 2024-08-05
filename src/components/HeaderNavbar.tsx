"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import NavItems from "@/components/ui/NavItems";
import ThemeToggle from "@/components/ui/ThemeToggle";

const HeaderNavbar = () => {
	const router = useRouter();
	return (
		<header className="flex items-center justify-between px-4 py-3 bg-background border-b border-border">
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
					<Search className="h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search..."
						className="bg-transparent border-none focus:outline-none text-sm w-64"
					/>
				</div>
				<Button
					variant="ghost"
					className="hidden md:inline-flex text-muted-foreground hover:text-foreground"
				>
					Sign In
				</Button>
				<ThemeToggle />
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
							<SheetTitle>{ " " }</SheetTitle>
						</SheetHeader>
						<nav className="flex flex-col space-y-4 mt-4">
							<NavItems />
							<Button onClick={() => router.push('/login')} variant="outline" className="w-full">
								Sign In
							</Button>
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
};

export default HeaderNavbar;