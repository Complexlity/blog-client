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
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { z } from "zod";

import "@/styles/editor.css";
import { MinusCircle } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { toast } from "@/Components/ui/use-toast";
import useSession from "@/hooks/useSession";
import { PostCategory } from "@/lib/types";
import { useUploadThing } from "@/lib/uploadthing";
import { getCategoryColor } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { Image } from "lucide-react";
import "react-loading-skeleton/dist/skeleton.css";
import EditorSkeleton from "./EditorSkeleton";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/Components/ui/hover-card";
import MarkdownUploader from "./MarkdownUploader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"


const SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN;

type EditorInput = any

export default function Editor() {
  const queryClient = useQueryClient();
  const user = useSession();
  const router = useRouter();
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [category, setCategory] = useState<PostCategory | null>(null);
  const [mode, setMode] = useState<"plain" | "raw">("raw");
  const [markdownDetails, setMarkdownDetails] = useState<MarkdownDetails>({
    title: "",
    file: null,
    rawHtml: ""
  });

  type MarkdownDetails = {
    title: string,
    file: File | null
    rawHtml: string
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    
    defaultValues: {
      title: "",
    
    },
  });
  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  async function postData(payload: EditorInput) {
    // console.log({type: payload.type})
    if (!payload.content) {
      throw new Error("No content provided")
    }
    console.log("Uploading post...")
    const res = await startImageUpload([coverImage!]);
    const fileUrl = res![0].fileUrl;
    // @ts-ignore
    payload.coverImageSource = fileUrl;
    const { data } = await axios.post(`${SERVER_DOMAIN}/posts`, payload, {
      withCredentials: true,
    });
    return data;
    
    // else {
    //   if (!payload.content) {
    //     throw new Error("No File found")
    //   }
    //     // const [banner, markdown] = await Promises.all([ startImageUpload([coverImage!]), startMarkdownUpload([markdownDetails.file])]);
    //   // const fileUrl = res![0].fileUrl;
    //   // console.log({coverImage})
    //   // console.log("Uploading cover image...")
    //   // const res = await startImageUpload([coverImage!]);
      
    //   //   const fileUrl = res![0].fileUrl;
    //   console.log("Uploading file....")
    //   payload.coverImageSource = "coverImage"
    //   console.log({ coverImage })
    //   console.log({markdown: payload.file})
    //   const res = await startMarkdownUpload([payload.file]).catch(err => {
    //     console.log({ err })
    //     throw err
    //   })
    //   console.log({res})
      
    //   const { data } = await axios.post(`${SERVER_DOMAIN}/posts`, payload, {
    //     withCredentials: true,
    //   });
    //   return data;


    // }
  }

  const { mutate: createPost, isLoading: isCreating } = useMutation({
    mutationFn: async (payload: EditorInput) => {
      console.log("Uploading post...")
      // const res = await startImageUpload([coverImage!]);
      // const fileUrl = res![0].fileUrl;
      // // @ts-ignore
      // payload.coverImageSource = fileUrl
      payload.coverImageSource = "coverImage"
      const { data } = await axios.post(`${SERVER_DOMAIN}/posts`, payload, {
        withCredentials: true,
      });
      return data;
      
     
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toast({
          title: error.response?.data.message ?? error.message,
          variant: "destructive",
        });
      }
      return toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      router.push("/");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
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
        data: {
          blocks: [],
        },
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
                  if (!user) {
                    return toast({
                      title: "Not logged in",
                      description: "Please login to be able to create a post",
                      variant: "destructive",
                    });
                  }
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
          title: "Missing Required Fields",
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

  const { startUpload: startImageUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      // console.log("uploadSuccessful");
    },
    onUploadError: () => {
      throw new Error("Something went wrong while uploading image");
    },
  });
  const { startUpload: startMarkdownUpload } = useUploadThing("markdownUploader", {
    onClientUploadComplete: () => {
      // console.log("uploadSuccessful");
    },
    onUploadError: (e) => {
      console.log(e)
      throw new Error("Something went wrong while uploading image");
    },
  });


  async function onSubmit(data: any) {
    // console.log({ data })
    // console.log("I am here")
    if (!user) {
      return toast({
        title: "Not logged in",
        description: "Please login to be able to create a post",
        variant: "destructive",
      });
    }
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
    let payload: {
      title: string;
      content: string;
      published: boolean;
      category: string;
      file?: any;
      type: "plain" | "raw"
    };
    
    if (mode === "plain") {
      const blocks = await ref.current?.save();
      payload = {
        title: data.title,
        content: JSON.stringify(blocks),
        published: true,
        category,
        type: "plain"
      };
    }
    
    if (mode === "raw") {
      
      payload = {
        title: markdownDetails.title,
        content: markdownDetails.rawHtml,
        published: true,
        category,
        type: "raw"
      };
    }
    
    //@ts-expect-error
    if (!payload.content || payload.content.length === 0) {
      return toast({
        title: "Post content not provided",
        variant: "destructive",
      });
    }
    createPost(payload!)
  }

  if (!isMounted) {
    return <EditorSkeleton />;
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
          <div className="flex my-2 items-center gap-4">
            <div className="flex items-center">
              <div>
                <label
                  htmlFor="cover-image"
                  className="hover:bg-slate-200 cursor-pointer rounded-full p-2 flex content-start max-w-fit gap-2 items-center text-sm md:text-base"
                >
                  <Image />
                  <span>{previewImageUrl ? "Change" : "Add Cover"} Image</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="cover-image"
                  name="cover-image"
                  className="hidden"
                  onChange={(e) => {
                    // @ts-ignore
                    let file = e.target.files[0];
                    let clientFileUrl = URL.createObjectURL(file);
                    setPreviewImageUrl(clientFileUrl);
                    setCoverImage(file);
                    e.target.value = "";
                  }}
                />
              </div>
              {previewImageUrl ? (
                <HoverCard openDelay={1} closeDelay={0}>
                  <HoverCardTrigger>
                    <div
                      onClick={() => {
                        setPreviewImageUrl("");
                        setCoverImage(null);
                      }}
                      className="aspect-square h-10 w-10 rounded-full  hover:bg-rose-100 text-red-400 text-sm md:text-base cursor-pointer  flex justify-center items-center"
                    >
                      <MinusCircle />
                    </div>
                    <HoverCardContent className="px-2 py-1">
                      Remove cover image
                    </HoverCardContent>
                  </HoverCardTrigger>
                </HoverCard>
              ) : null}
            </div>
            <Select
              onValueChange={(value: PostCategory) => {
                setCategory(value);
              }}
            >
              <SelectTrigger
                className="w-[120px] sm:w-[180px] rounded-full border-2  focus-visible:outline-none "
                style={{ borderColor: getCategoryColor(category) }}
              >
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
            <div className="not-prose w-full max-w-[600px] aspect-square mx-auto my-2 mb-4 rounded-md overflow-hidden">
              <img
                src={previewImageUrl}
                alt="cover image"
                className="object-cover mx-auto object-top w-full h-full"
              />
            </div>
          ) : null}
          <Tabs defaultValue="plain" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="plain">Inline Editor</TabsTrigger>
    <TabsTrigger value="raw">Upload Markdown</TabsTrigger>
  </TabsList>
            <TabsContent value="plain">
              
            <div>
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
  </TabsContent>
            <TabsContent value="raw">
              
            <MarkdownUploader setMarkdownDetails={setMarkdownDetails} />
  </TabsContent>
</Tabs>

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
