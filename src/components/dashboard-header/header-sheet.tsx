"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dock, LineChart, Package2, PanelLeft, Settings } from "lucide-react";

import { cn } from "@/lib/utils";

export function HeaderSheet() {
  const pathName = usePathname();

  const getSideNavLinkIconStyle = (path: string) => {
    return cn(
      "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
      { "text-foreground": pathName.endsWith(path) },
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">TodoNow</span>
          </Link>

          <Link
            href="/dashboard/todos"
            className={getSideNavLinkIconStyle("/todos")}
          >
            <Dock className="h-5 w-5" />
            Todos
          </Link>
          <Link
            href="/dashboard/analytics"
            className={getSideNavLinkIconStyle("/analytics")}
          >
            <LineChart className="h-5 w-5" />
            Analytics
          </Link>

          <Link
            href="/dashboard/settings"
            className={getSideNavLinkIconStyle("/settings")}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
