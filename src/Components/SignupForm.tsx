"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import fetcher from "@/lib/fetcher";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "./ui/use-toast";

const SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN as unknown as URL;

const signUpSchema = z
  .object({
    name: z
      .string({ required_error: "required" })
      .min(2, "Too short")
      .max(40, "Too long"),
    email: z
      .string({ required_error: "required" })
      .trim()
      .email("Invalid email address"),
    password: z
      .string({ required_error: "required" })
      .trim()
      .min(8, "Too short"),
    passwordConfirmation: z.string({
      required_error: "Password Confirmation is required",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });

type SignupInput = z.infer<typeof signUpSchema>;

export default function SignupForm() {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const [registerError, setRegisterError] = useState(
    "Bad things have happened"
  );
  const form = useForm<SignupInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  async function onSubmit(values: SignupInput) {
    const createUser = `${SERVER_DOMAIN}/users`;
    try {
      const response = await fetcher(createUser, {}, "POST", values);

      //@ts-ignore
      if (response && response.status !== 200) {
        //@ts-ignore
        const error = await response.json();
        form.setError("email", {
          type: "custom",
          message: error.message,
        });
        //@ts-ignore
        throw new Error(error.message);
      }
      form.reset();
      router.refresh()
      toast({
        title: "Please login now"
      })
      // setOpen(false)
    } catch (error: any) {}
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className={buttonVariants()}>
          Sign Up
        </DialogTrigger>
        <DialogContent>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mx-auto text-black"
              >
                <h1 className="text-3xl font-bold text-center">Sign Up Now</h1>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username *</FormLabel>
                      <FormControl>
                        <Input placeholder="display name" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input placeholder="cool email" {...field} />
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
                          placeholder="enter a strong password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password *</FormLabel>
                      <FormControl>
                        <Input placeholder="re-enter password" {...field} />
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
