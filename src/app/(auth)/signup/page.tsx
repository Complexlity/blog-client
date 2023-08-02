import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "./SignupForm";
import { Icons } from "@/components/Icons";
import { ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Join the largest blog in the universe for free!!",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative flex h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="absolute right-4 top-4 md:right-8 md:top-8 flex gap-4 ">
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
            <ChevronsLeft />
            Back to homepage
          </Link>
        <Link
          href="/login/"
          className={cn(
            buttonVariants(),

          )}
        >
          Log In
          <ChevronsRight />
        </Link>
        </div>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-blueDarkest " />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Icons.logo className="mr-2 h-6 w-6 text-blue-500" />
            Complex Blog
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Success is not final, failure is not fatal: It is the
                courage to continue that counts.&rdquo;
              </p>
              <footer className="text-sm">Winston Churchill</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 mt-12 ">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="#"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
