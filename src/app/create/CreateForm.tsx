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
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useMutation } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Editor } from "@/app/create/Editor";
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import EditorOutput from './EditorOutput';
import { Cloudinary } from "@cloudinary/url-gen";

const SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN;

const postSchema = z.object({
  title: z
    .string({
      required_error: "Post title cannot be empty",
    })
    .min(1)
    .max(100, "Title must be at most 100 characters"),
  content: z
  .string({
    required_error: "Post content cannot be empty",
    })
    .min(1)
    .max(1000, "Content must be at most 1000 characters"),
});

type CreatePostInput = z.infer<typeof postSchema>;

export default function CreateForm({ title, content, }: { title?: string, content?: any}) {
  const router = useRouter();
  const [output, setOutput] = useState<any>()
  const [postTitle, setPostTitle] = useState()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: title ?? "",
      content: content ?? null ,
    },
  });
  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const pathname = usePathname();

  const { mutate: createPostt } = useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await axios.post(`${SERVER_DOMAIN}/posts`, payload, {
        withCredentials: true,
      });
      return data;
    },
    onError: (error) => {
      console.log(error)
      return toast({
        title: error.response?.data.message,
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
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }
  }, [errors]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
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

  async function onSubmit(data: any) {
    const blocks = await ref.current?.save();

    setOutput(blocks)
    setPostTitle(data.title)

    const payload = {
      title: data.title,
      content: JSON.stringify(blocks),
      published: true
    };

    createPostt(payload);
  }

  if (!isMounted) {
    return null;
  }

  const { ref: titleRef, ...rest } = register("title");

  return (
    <>
      <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
        <form
          id="subreddit-post-form"
          className="w-fit"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="prose prose-stone dark:prose-invert">
            <TextareaAutosize
              ref={(e) => {
                titleRef(e);
                // @ts-ignore
                _titleRef.current = e;
              }}
              {...rest}
              placeholder="Title"
              className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            />
            <div id="editor" className="min-h-[500px]" />
            <p className="text-sm text-gray-500">
              Use{" "}
              <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
                Tab
              </kbd>{" "}
              to open the command menu.
            </p>
          </div>
          <Button>Submit</Button>
        </form>
      </div>
    </>
  );
}


