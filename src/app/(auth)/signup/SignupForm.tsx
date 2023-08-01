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
import { useUploadThing } from "@/lib/uploadthing";
import { MinusCircle, XCircle } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN as unknown as URL;

const signUpSchema = z
  .object({
    name: z
      .string({ required_error: "required" })
      .min(2, "Minimum 2 characters")
      .max(20, "Maximum 20 characters"),
    email: z
      .string({ required_error: "required" })
      .trim()
      .email("Email is invalid"),
    password: z
      .string({ required_error: "required" })
      .trim()
      .min(8, "Must be at least 8 characters"),
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
  const [imageFile, setImageFile] = useState(null)

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
  if (!imageFile) {
    toast({
      title: "Please add a profile image",
      variant: "destructive"
    })
    return
  }
  try {
    setIsLoading(true)
    const res = await startUpload([imageFile]);
    const fileUrl = res![0].fileUrl;
    const response = await fetcher(createUser, {}, "POST", {...values, imageSrc: fileUrl});

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

  function addProfileImage(e: any) {
    let file = e.target.files[0];
    let clientFileUrl = URL.createObjectURL(file);
    setImageUrl(clientFileUrl);
    setImageFile(file);
  }

  function removeProfileImage() {
    setImageUrl('')
    setImageFile(null)
  }

const { startUpload } = useUploadThing("imageUploader", {
  onClientUploadComplete: () => {
    // alert("uploaded successfully!");
    // console.log("uploadSuccessful");
  },
  onUploadError: () => {
    alert("error occurred while uploading");
    throw new Error("Image Could not be uploaded");
  },
});



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
              <div>
                <label
                  tabIndex={0}
                  htmlFor="upload-profile"
                  className={buttonVariants({ className: "cursor-pointer" })}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      document.getElementById("upload-profile")?.click();
                    }
                  }}
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  id="upload-profile"
                  name="upload-profile"
                  className="hidden"
                  onChange={addProfileImage}
                />
              </div>
            ) : (
              <div className="relative">
                <img
                  alt="Profile Image"
                  src={imageUrl}
                  width={50}
                  height={50}
                  className="w-24 h-24 rounded-full object-cover object-top"
                />
                <div className="absolute -right-2 -top-2">
                  <HoverCard openDelay={1} closeDelay={1}>
                    <HoverCardTrigger>
                      <span
                        onClick={removeProfileImage}
                        className="text-red-400 hover:text-red-600 cursor-pointer"
                      >
                        <XCircle />
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent className="border-0 border-transparent p-2">
                      Remove Image
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>
            )}
          </div>
          <Button
            isLoading={isLoading}
            className={"w-full"}
            disabled={isLoading}
          >
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
