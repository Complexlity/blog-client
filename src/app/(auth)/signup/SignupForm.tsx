"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

import fetcher from "@/lib/fetcher";
import { toast } from "@/components/ui/use-toast";
import "@uploadthing/react/styles.css";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";

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
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
const router = useRouter();
  const [registerError, setRegisterError] = useState("Bad things have happened");
  const [imageUrl, setImageUrl] = useState('')

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
  if (!imageUrl) {
    toast({
      title: "Please add a profile image",
      variant: "destructive"
    })
    return
  }
  try {
    setIsLoading(true)
    const response = await fetcher(createUser, {}, "POST", {...values, imageSrc: imageUrl});

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
    router.push('/login')
    toast({
      title: "Please Login"
    })
    setIsLoading(false);
  } catch (error: any) {}
}





  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4  text-black"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="display name"
                    {...field}
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
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
                  <Input
                    placeholder="cool email"
                    {...field}
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
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
                    placeholder="enter a strong password"
                    {...field}
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
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
                  <Input
                    placeholder="re-enter password"
                    {...field}
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center items-center border-zinc-200 border-2 shadow-sm p-4 gap-8 rounded-md">
            <p className="text-xl">Profile Image: </p>
            {!imageUrl ? (
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  console.log("Files: ", res);
                  setImageUrl(res![0].fileUrl);
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
            ) : (
              <img
                alt="Profile Image"
                src={imageUrl}
                width={50}
                height={50}
                className="w-24 h-24 rounded-full object-cover object-top"
              />
            )}
          </div>
          <Button className={"w-full"} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign up
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </div>
  );
}