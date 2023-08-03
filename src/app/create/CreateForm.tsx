"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { uploadFiles } from "@/lib/uploadthing";
import "@/styles/editor.css";
import EditorJS from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { z } from "zod";

import "@/styles/editor.css";
import { MinusCircle } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { toast } from "@/Components/ui/use-toast";
import { PostCategory } from "@/lib/types";
import { useUploadThing } from "@/lib/uploadthing";
import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { Image } from "lucide-react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN;

const postSchema = z.object({
  title: z
    .string({
      required_error: "Post title cannot be empty",
    })
    .min(1)
    .max(100, "Title must be at most 100 characters"),
  content: z.any(),
});

type CreatePostInput = z.infer<typeof postSchema>;

export default function CreateForm() {
  const router = useRouter();
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [category, setCategory] = useState<PostCategory | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: null,
    },
  });
  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const pathname = usePathname();

  const { mutate: createPost, isLoading: isCreating } = useMutation({
    mutationFn: async (payload: CreatePostInput) => {
      const res = await startUpload([coverImage!]);
      const fileUrl = res![0].fileUrl;
      // @ts-ignore
      payload.coverImageSource = fileUrl;
      postData(payload);

      async function postData(payload: CreatePostInput) {
        const { data } = await axios.post(`${SERVER_DOMAIN}/posts`, payload, {
          withCredentials: true,
        });
        return data;
      }
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toast({
          title: error.response?.data.message ?? error.message,
          variant: "destructive",
        });
      }
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.push("/");

      router.refresh();

      return toast({
        description: "Your post has been published.",
      });
    },
  });

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    // @ts-ignore
    const Embed = (await import("@editorjs/embed")).default;
    // @ts-ignore
    const Table = (await import("@editorjs/table")).default;
    // @ts-ignore
    const List = (await import("@editorjs/list")).default;
    // @ts-ignore
    const Code = (await import("@editorjs/code")).default;
    // @ts-ignore
    const LinkTool = (await import("@editorjs/link")).default;
    // @ts-ignore
    const InlineCode = (await import("@editorjs/inline-code")).default;
    // @ts-ignore
    const ImageTool = (await import("@editorjs/image")).default;
    // @ts-ignore
    const Quote = (await import("@editorjs/quote")).default;

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
                  });

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

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      // console.log("uploadSuccessful");
    },
    onUploadError: () => {
      throw new Error("Something went wrong while uploading image");
    },
  });

  async function onSubmit(data: any) {
    if (!coverImage) {
      return toast({
        title: "Cover Image Missing",
        description: "You need add a cover image to the post",
        variant: "destructive",
      });
    }
    if (!category) {
      return toast({
        title: "Select A Category",
        variant: "destructive",
      });
    }

    const blocks = await ref.current?.save();
    const payload = {
      title: data.title,
      content: JSON.stringify(blocks),
      published: true,
      category,
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

              <Skeleton
                width={`180px`}
                height={32}
                className="rounded-full"
                borderRadius={`9999vw`}
              />
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
                  // @ts-ignore
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
            <Select
              onValueChange={(value: PostCategory) => {
                setCategory(value);
              }}
            >
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
            <div id="editor" className="min-h-[45vh]" />
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
