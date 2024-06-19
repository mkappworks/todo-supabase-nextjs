import type { Metadata } from "next";

import { Header } from "@/components/dashboard-header/header";
import { SideNav } from "@/components/dashboard-header/side-nav";

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
        <div className="mx-10 my-4">{children}</div>
      </div>
    </div>
  );
}
