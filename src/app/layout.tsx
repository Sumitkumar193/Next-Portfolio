import { Inter } from "next/font/google";
import HeaderNavbar from "@/app/rsc/header/HeaderNavbar";
import RootWrapper from "./providers/RootWrapper";
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
				<HeaderNavbar />
				<RootWrapper>{ children }</RootWrapper>
			</body>
		</html>
	);
}
