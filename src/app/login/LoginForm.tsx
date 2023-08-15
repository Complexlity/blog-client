"use client";

import * as React from "react";

import { Button } from "@/Components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import fetcher from "@/lib/fetcher";
import PasswordInput from "@/Components/ui/password-input";

const SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN as unknown as URL;

const logInSchema = z.object({
  email: z
    .string({ required_error: "required" })
    .trim()
    .email("Email address is invalid"),
  password: z
    .string({ required_error: "required" })
    .trim()
    .min(8, "Minimum of 8 characters"),
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
    setIsLoading(true);
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
      router.push("/");
      router.refresh()
    } catch (error: any) {
      setLoginError(error.message);
      setIsLoading(false);
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
                  <PasswordInput
                    {...field}
                    onInput={handleInput}
                    checkboxId={"login-password"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            isLoading={isLoading}
            className={"w-full"}
            disabled={isLoading}
          >
            {isLoading ? "Logging In..." : "Log In"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
