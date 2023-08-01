"use client";

import { Icons } from "@/components/Icons";
import defaultImg from "../../../../public/default.svg";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { BookOpen, Heart, MessagesSquare } from "lucide-react";
import Image from "next/image";
import CommentSection from "./CommentSection";
import { calculateTimeToReadPost, formatDate } from "@/lib/utils";
import { Comment, Post } from "@/lib/types";
import LikeButton from "./LikeButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import useSession from "@/hooks/useSession";
import EditorOutput from "@/app/create/EditorOutput";

const SinglePost = ({ post }: { post: Post }) => {
  const { toast } = useToast();
  const user = useSession();

  return (
    <div className="bg-white pb-8">
      <div className=" MinusCircle ">
        <header className=" grid max-w-[800px] mx-auto px-8 text-center py-8">
          <h1 className="font-extrabold text-3xl md:text-4xl mb-4">
            {post.title}
          </h1>
          <p className="mx-auto flex items-center gap-2 md:text-lg mb-4">
            <Image
              src={post.author.imageSrc}
              width={24}
              height={24}
              className="rounded-full object-cover h-10 w-10 object-top"
              unoptimized
              alt=""
            />
            <span className="font-bold">{post.author.name}</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-600 align-middle"></span>
            {/* @ts-expect-error Date object confused for string */}
            <span>{formatDate(post.createdAt, "full")}</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-600 align-middle"></span>

            <span className="flex gap-1">
              <BookOpen />
              {calculateTimeToReadPost(post.content)} min read
            </span>
          </p>
          <div className="flex mx-auto gap-6 items-center">
            <p className="px-6 py-2  bg-blueLight rounded-full text-blueDarkest font-bold hover:shadow-xl hover:shadow-gray-200">
              Technology
            </p>
            <HoverCard openDelay={5}>
              <HoverCardTrigger>
                <div className="flex gap-2 items-center bg-gray-100 hover:bg-gray-200 rounded-full px-2 py-2 text-sm">
                  <Icons.loveIcon className="h-6 w-6 fill-gray-300 text-slate-600 stroke-current" />
                  <div className="flex max-w-10 items-center">
                    <Image
                      src={defaultImg}
                      width={24}
                      height={24}
                      className="cursor-pointer rounded-full object-cover h-8 w-8"
                      alt=""
                    />
                    <Image
                      src={defaultImg}
                      width={24}
                      height={24}
                      className="cursor-pointer rounded-full object-cover h-8 w-8"
                      alt=""
                    />
                    <Image
                      src={defaultImg}
                      width={24}
                      height={24}
                      className="cursor-pointer rounded-full object-cover h-8 w-8"
                      alt=""
                    />
                    {post.likeCount}
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent
                className="rounded-lg px-4 py-2 bg-black text-white"
                side="top"
              >
                {post.likeCount} people liked the post
              </HoverCardContent>
            </HoverCard>
          </div>
          {
            post.coverImageSource
              ?
          <div className="h-[500px] mx-auto w-full m-10">
            <Image
              src={post.coverImageSource}
              width={24}
              height={24}
              className="w-full h-full object-cover object-top rounded-md"
              alt=""
              unoptimized
            />
          </div>
         : null }
        </header>
        <main className="prose mx-auto relative space-y-6">
          <EditorOutput content={JSON.parse(post.content)} />
          {/* Sticky Buttons */}
          <div className="not-prose sticky bottom-10 bg-white rounded-full items-center flex max-w-fit px-5 py-1 text-sm border-2 border-slate-200 mx-auto">
            <div className="flex gap-1 items-center">
              <LikeButton
                id={post._id}
                likes={post.likes}
                likeCount={post.likeCount}
                type={"posts"}
              />
            </div>

            <div className="w-0.5 h-6 mx-2 bg-slate-200"></div>

            {/* Comments Drawer */}
            <div className="">
              <div className="drawer drawer-end ">
                <input
                  id="my-drawer-4"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content">
                  <label
                    htmlFor="my-drawer-4"
                    className="flex gap-1 items-center"
                  >
                    <div className="rounded-full p-2 hover:bg-sky-100 hover:text-sky-600">
                      <MessagesSquare size={23} />
                    </div>
                    <span>{post.comments.length}</span>
                  </label>
                </div>
                <div className="drawer-side overflow-hidden ">
                  <label
                    htmlFor="my-drawer-4"
                    className="drawer-overlay"
                  ></label>
                  <div className="p-4 z-[40] fixed right-0 overflow-y-auto max-w-[400px] w-1/2 h-full bg-white text-base-content ">
                    <CommentSection
                      postId={post._id}
                      comments={post.comments}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SinglePost;
