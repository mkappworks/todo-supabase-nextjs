"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { signOutAction } from "@/actions/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@supabase/supabase-js";
import { User2 } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "../ui/button";

type Props = {
  user: User;
  className?: string;
};

export function UserButton({ user }: Props) {
  const router = useRouter();

  const handleSignOut = async () => {
    const toastId = toast.loading("Signing out...");
    await signOutAction();
    router.replace("/sign-in");
    toast.dismiss(toastId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <User2 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
