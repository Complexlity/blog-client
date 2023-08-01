'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { ArrowDownNarrowWide, ChevronDown, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import defaultImg from '../../public/default.svg';
import logo from '../../public/logo.png';

import useSession from "@/hooks/useSession";
import LoginForm from "./LoginForm";
import SignupFrom from './SignupForm';
import { Button, buttonVariants } from "./ui/button";
import { Icons } from "./Icons";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import { useUserContext } from "@/contexts/SessionProvider";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Navbar() {
  const user = useSession()
  const store = useUserContext()
  const router = useRouter()

  const SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN;
  const { mutate: logOut, isLoading: loggingOut } = useMutation({

    mutationFn: async () => {
      const { data } = await axios.delete(`${SERVER_DOMAIN}/sessions`, {
        withCredentials: true
      })
      return data
    },
    onSuccess: () => {
      toast({
        title: "Successfully logged Out"
      })
      store.setCurrentUser(null)
      router.refresh()
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: "please try again later",
        variant: "destructive"
      })
    }
  })



  return (
    <div className="bg-blueDarkest  ">
      <div className="container flex items-center justify-between py-3 border-b-2 border-b-blueLight max-w-[900px]">
        <NavigationMenu className="">
          <NavigationMenuList className="flex gap-8">
            <Link href="/">
              <Image src={logo} alt="logo" height={48} width={48} />
            </Link>
            <NavigationMenuItem className="">
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-blueLight hover:text-blueDarkest`}
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
                  <span>Create</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {!user ? (
          <div className="flex gap-6">
            <Link
              href="/login"
              className={buttonVariants({ variant: "outline" })}
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
                <DropdownMenuTrigger><ChevronDown /></DropdownMenuTrigger>
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
                      {/* {loggingOut && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      )} */}
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

