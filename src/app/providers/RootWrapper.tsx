"use client";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

export default function RootWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RecoilRoot>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
        <Toaster richColors position="top-right" closeButton />
        {children}
      </ThemeProvider>
    </RecoilRoot>
  )
}
