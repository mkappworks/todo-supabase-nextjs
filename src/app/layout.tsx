import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { Toaster } from "react-hot-toast";

import "./globals.css";

import { Providers } from "@/components/providers";

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
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
