"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import logo from '../../public/logo.png'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { buttonVariants } from "./ui/button";


export default function Navbar() {

  return (
    <div className="bg-blueDarkest  ">
      <div className="container flex items-center justify-between py-3 border-b-2 border-b-blueLight">
        <NavigationMenu className="">
          <NavigationMenuList className="flex gap-8">
            <Link href='/'>
            <Image src={logo} alt="logo" height={48} width={48} />
            </Link>
            <NavigationMenuItem className="">
              <Link href="/posts" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-blueLight hover:text-blueDarkest`}
                >
                  Posts
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="">
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} flex gap-1 items-center  bg-transparent text-white hover:bg-blueLight hover:text-blueDarkest`}
                >
                  <span>Create</span>
                  <ExternalLink className="w-4 h-4 -mt-1" />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex gap-6">
          <Link href={""} className={buttonVariants({ variant: "outline" })}>
            Login
          </Link>
          <Link href={""} className={buttonVariants()}>
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}

