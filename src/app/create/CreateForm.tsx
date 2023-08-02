"use client";


import EditorJS from '@editorjs/editorjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { z } from 'zod'
import { uploadFiles } from "@/lib/uploadthing";
import "@/styles/editor.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";





import '@/styles/editor.css'
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertCircle, MinusCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useMutation } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Editor } from "@/app/create/Editor";
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import EditorOutput from './EditorOutput';
import defaultImg from '@/../public/default.svg'
import { Image } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";
import { Icons } from '@/components/Icons';
import { ErrorMessage } from "@hookform/error-message"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { PostCategory } from '@/lib/types';


const SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN;

const postSchema = z.object({
  title: z
    .string({
      required_error: "Post title cannot be empty",
    })
    .min(1)
    .max(100, "Title must be at most 100 characters"),
  content: z.any()
});

type CreatePostInput = z.infer<typeof postSchema>;

export default function CreateForm() {
  const router = useRouter();
  const [coverImage, setCoverImage] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [category, setCategory] = useState<PostCategory | null>(null)


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: null ,
    },
  });
  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const pathname = usePathname();

  const { mutate: createPost, isLoading: isCreating } = useMutation({
    mutationFn: async (payload: CreatePostInput) => {
        const res = await startUpload([coverImage])
        const fileUrl = res![0].fileUrl
        payload.coverImageSource = fileUrl
        postData(payload)


     async function postData(payload: CreatePostInput) {
        const { data } = await axios.post(`${SERVER_DOMAIN}/posts`, payload, {
          withCredentials: true,
        });
        return data;
      }
    },
    onError: (error) => {
      return toast({
        title: error.response?.data.message ?? error.message,
        variant: 'destructive'
      })

      // return toast({
      //   title: "Something went wrong",
      //   description: "Your post was not published. Please try again.",
      //   variant: "destructive",
      // });
    },
    onSuccess: () => {
      router.push('/');

      router.refresh();

      return toast({
        description: "Your post has been published.",
      });
    },
  });

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;
    const Quote = (await import('@editorjs/quote')).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {

                  // upload to uploadthing
                  const [res] = await uploadFiles({
                    files: [file],
                    endpoint: "imageUploader",
                  })

                  return {
                    success: 1,
                    file: {
                      url: res.fileUrl,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
          quote: Quote,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value;
        toast({
          title: "Something went wrong.",
          description: "Title or Content is not provided",
          variant: "destructive",
        });
      }
    }
  }, [errors]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef?.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);


  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {

      // console.log("uploadSuccessful");
    },
    onUploadError: () => {
      throw new Error("Something went wrong while uploading image")
    },
  });

  async function onSubmit(data: any) {
    if (!coverImage) {
return toast({
        title: "Cover Image Missing",
        description: "You need add a cover image to the post",
        variant:'destructive'
      })
    }
    if(!category){
      return toast({
        title: "Select A Category",
        variant: 'destructive'
      })

    }

    const blocks = await ref.current?.save();
    const payload = {
      title: data.title,
      content: JSON.stringify(blocks),
      published: true,
      category
    };

    createPost(payload);
  }

  if (!isMounted) {
    return (
      <SkeletonTheme baseColor="#e5e7eb" highlightColor="#d1d5db">
        <div className="w-full prose mx-auto">
          <form id="subreddit-post-form" className="w-full grid">
            <div className="flex gap-2 items-center my-2">
              <Skeleton circle={true} height={32} width={32} />
              <Skeleton width={`150px`} height={24} />

              <Skeleton width={`180px`} height={32} className="rounded-full" borderRadius={`9999vw`} />

            </div>

            <div className="">
              <div id="editor" className="min-h-[calc(100vh-350px)]">
                <Skeleton height={`calc(100vh - 300px)`} />
              </div>
              <p className="text-sm text-gray-500">
                <Skeleton height={`40px`} />
              </p>
            </div>
          </form>
        </div>
      </SkeletonTheme>
    );
  }

  const { ref: titleRef, ...rest } = register("title");

  return (
    <>
      <div className="w-full prose mx-auto">
        <form
          id="subreddit-post-form"
          className="w-full grid"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-2 my-2 items-center">
            <div>
              <label
                htmlFor="cover-image"
                className="hover:bg-slate-200 cursor-pointer rounded-full p-2 flex content-start max-w-fit gap-2 items-center"
              >
                <Image />
                <span>{previewImageUrl ? "Change" : "Add"} Cover Image</span>
              </label>
              <input
                type="file"
                id="cover-image"
                name="cover-image"
                className="hidden"
                onChange={(e) => {
                  let file = e.target.files[0];
                  let clientFileUrl = URL.createObjectURL(file);
                  setPreviewImageUrl(clientFileUrl);
                  setCoverImage(file);
                }}
              />
            </div>
            {previewImageUrl ? (
              <div
                onClick={() => {
                  setPreviewImageUrl("");
                  setCoverImage(null);
                }}
                className="hover:bg-rose-100 text-red-400 cursor-pointer rounded-full p-2 flex content-start max-w-fit gap-2 items-center"
              >
                <MinusCircle />
                <span>Remove Cover Image</span>
              </div>
            ) : null}
            <Select onValueChange={(value: PostCategory) => {
                setCategory(value)
            }}>
              <SelectTrigger className="w-[180px] rounded-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="advice">Advice</SelectItem>
                <SelectItem value="stackies">Stackies</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {previewImageUrl ? (
            <div className="not-prose w-full h-[500px] my-4  rounded-md overflow-hidden">
              <img
                src={previewImageUrl}
                alt="cover image"
                className="object-cover object-top w-full h-full"
              />
            </div>
          ) : null}
          <div className="">
            <TextareaAutosize
              ref={(e) => {
                titleRef(e);
                // @ts-ignore
                _titleRef.current = e;
              }}
              {...rest}
              placeholder="Title"
              className="text-black w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            />
            {/* <div id="editor" className="min-h-[calc(100vh-400px)]" /> */}
            <p className="text-sm text-gray-500">
              Use{" "}
              <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
                Tab
              </kbd>{" "}
              to open the command menu.
            </p>
          </div>
          <Button
            isLoading={isCreating}
            disabled={isCreating}
            type="submit"
            className="w-full max-w-[500px] mx-auto"
          >
            {isCreating ? "Creating..." : "Create Post"}
          </Button>
        </form>
      </div>
    </>
  );
}


