"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Sun, Moon, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const HeaderNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme()

  const NavItems = () => (
    <>
      <li><Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
      <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
      <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
    </>
  );

  const ThemeToggle = () => (
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
        <Button variant="ghost" className="hidden md:inline-flex text-muted-foreground hover:text-foreground">
          Sign In
        </Button>
        <ThemeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background">
            <nav className="flex flex-col space-y-4 mt-4">
              <NavItems />
              <Button variant="outline" className="w-full">Sign In</Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default HeaderNavbar;