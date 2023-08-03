"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger
} from "@/components/ui/dialog";
import fetcher from "@/lib/fetcher";
import { toast } from "./ui/use-toast";


const SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN as unknown as URL;

const logInSchema = z.object({
  email: z
    .string({ required_error: "required" })
    .trim()
    .email("Invalid email address"),
  password: z.string({ required_error: "required" }).trim().min(8, "Too short"),
});

type CreateSessionInput = z.infer<typeof logInSchema>;

export default function LoginForm({
  className,

}: {
  className?: string;

  }) {
  const [open, setOpen] = useState(false);
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
    try {
      const response = await fetcher(loginUser, {}, "POST", values);
      //@ts-ignore
      if (response && response.status !== 200) {
        //@ts-ignore
        const error = await response.json();
        throw new Error(error.message);
      }
      form.reset();
      setOpen(false);
      toast({
        title: `Signed In`
      })

      router.refresh()

    } catch (error: any) {
      setLoginError(error.message);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className={buttonVariants({ variant: "outline" })}>
          Login
        </DialogTrigger>
        <DialogContent>
          <DialogDescription>
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
                className="space-y-6 mx-auto text-black "
              >
                <h1 className="text-3xl font-bold text-center text-black">
                  Log In Now
                </h1>
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

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
