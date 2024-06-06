import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { Toaster } from "react-hot-toast";

import "./globals.css";

import { Header } from "@/components/header/header";
import { Providers } from "@/providers";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "TodoNow",
  description: "Todo app",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          <Header />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
