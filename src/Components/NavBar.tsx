'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import defaultImg from '../../public/default.svg';
import logo from '../../public/logo.png';

import useSession from "@/hooks/useSession";
import LoginForm from "./LoginForm";
import SignupFrom from './SignupForm';


export default async function Navbar() {
  const user = useSession()

  return (
    <div className="bg-blueDarkest  ">
      <div className="container flex items-center justify-between py-3 border-b-2 border-b-blueLight">
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
        {!user ? (
          <div className="flex gap-6">
            <LoginForm className="" />
            <SignupFrom />
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-white capitalize">
            {user.name}
            <Image
              src={defaultImg}
              width={24}
              height={24}
              className="rounded-full object-cover h-8 w-8"
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
}

