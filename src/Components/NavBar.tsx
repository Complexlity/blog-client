"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/Components/ui/navigation-menu";
import { ChevronDown, PencilLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";

import { useUserContext } from "@/Contexts/SessionProvider";
import useSession from "@/hooks/useSession";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";
import { toast } from "./ui/use-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import useStore from "@/store";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Navbar() {
  const user = useSession();
  const store = useStore();
  const router = useRouter()

  const SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN;
  const { mutate: logOut, isLoading: loggingOut } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(`${SERVER_DOMAIN}/sessions`, {
        withCredentials: true,
      });
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Successfully logged Out",
      });
      store.reset()
      router.refresh();
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: "please try again later",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="bg-blueDarkest">
      <div className="sm:container flex items-center justify-between py-3 border-b-2 border-b-blueLight max-w-[1200px]">
        <NavigationMenu className="px-2">
          <NavigationMenuList className="flex gap-1 md:gap-8">
            <Link href="/" className="hidden sm:block">
              <Image src={logo} alt="logo" height={48} width={48} />
            </Link>
            <NavigationMenuItem className="">
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-blueLight hover:text-blueDarkest px-0 sm:px-4`}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="">
              <Link href="/create" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} flex gap-1 items-center  bg-transparent text-white hover:bg-blueLight hover:text-blueDarkest`}
                >
                  <span className="flex gap-1 items-center">
                    Create Post <PencilLine className="w-4 h-4" />
                  </span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {!user ? (
          <div className="flex gap-1 md:gap-6">
            <Link
              href="/login"
              className={`${buttonVariants({ variant: "outline" })}`}
            >
              Login
            </Link>
            <Link href="/signup" className={buttonVariants()}>
              Signup
            </Link>
          </div>
        ) : (
          <div className="flex gap-4">
            <div className="flex items-center justify-center text-white capitalize">
              <Image
                src={user.imageSrc}
                width={24}
                height={24}
                className="rounded-full object-cover h-10 w-10 object-top"
                alt=""
                unoptimized
              />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Button
                      isLoading={loggingOut}
                      disabled={loggingOut}
                      variant={"destructive"}
                      onClick={() => {
                        logOut();
                      }}
                      className="w-full"
                    >
                      LogOut
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
