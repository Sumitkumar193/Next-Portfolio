"use client";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { RecoilRoot } from "recoil";
import HeaderNavbar from "@/components/HeaderNavbar";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<RecoilRoot>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem={true}
					>
						<Toaster richColors position="top-right" closeButton />
						<HeaderNavbar />
						{children}
					</ThemeProvider>
				</RecoilRoot>
			</body>
		</html>
	);
}
