import type { Metadata } from "next";

import { Header } from "./header";
import { SideNav } from "./side-nav";

export const metadata: Metadata = {
  title: "TodoNow - Dashbaord",
  description: "Dashbaord",
};

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        {children}
      </div>
    </div>
  );
}
