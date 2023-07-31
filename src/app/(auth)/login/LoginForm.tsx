"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import fetcher from "@/lib/fetcher";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN as unknown as URL;

const logInSchema = z.object({
  email: z
    .string({ required_error: "required" })
    .trim()
    .email("Invalid email address"),
  password: z.string({ required_error: "required" }).trim().min(8, "Too short"),
});

type CreateSessionInput = z.infer<typeof logInSchema>;

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
const [loginError, setLoginError] = useState(null);
const router = useRouter();
const form = useForm<CreateSessionInput>({
  resolver: zodResolver(logInSchema),
  defaultValues: {
    email: "",
    password: "",
  },
});
  function handleInput() {
    setLoginError(null);
  }
  async function onSubmit(values: CreateSessionInput) {
    const loginUser = `${SERVER_DOMAIN}/sessions`;
    setIsLoading(true)
    try {
      const response = await fetcher(loginUser, {}, "POST", values);
      //@ts-ignore
      if (response && response.status !== 200) {
        //@ts-ignore
        const error = await response.json();
        throw new Error(error.message);
      }
      form.reset();
      setIsLoading(false);
      router.push('/')

    } catch (error: any) {
      setLoginError(error.message);
      setIsLoading(false)
    }
  }


  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {loginError && (
        <Alert variant="destructive" className="w-[98%]">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{loginError}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 text-black "
        >

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your email"
                    {...field}
                    onInput={handleInput}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter your password"
                    {...field}
                    onInput={handleInput}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className={"w-full"} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up with Email
          </Button>

        </form>
      </Form>
    </div>
  );
}
