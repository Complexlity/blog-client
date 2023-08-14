'use client'

import { Post } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Info } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/Components/ui/hover-card";
import Link from "next/link";
import { buttonVariants } from "@/Components/ui/button";
import PostCard from "./PostCard";

const Posts = () => {
  const { data: posts, isFetching, isFetched, isRefetching } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/posts?published=true`
      );
      return data as Post[]
    },
    queryKey: ['posts']
})

  return (
    <div className="bg-slate-400 pb-8 pt-6 ">
      <div className="container space-y-4 max-w-[1200px] ">
        <h2 className="font-roboto text-blueDarkest text-5xl font-extrabold">
          Posts
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {isFetched && (!posts || posts.length == 0) ? <p>NO POST FOUND IN THE DATABASE <Link href="/create" className={buttonVariants()}>Create One</Link></p> :
            posts?.map((post) => (
              <PostCard post={post} key={post._id} />
              ))}
          {isFetching && !isRefetching ? (
            <p className="flex gap-1">
                <HoverCard openDelay={1}>
                  <HoverCardTrigger>
              <Info className=" text-red-400 cursor-pointer" />
                  </HoverCardTrigger>
                  <HoverCardContent className="p-4">
              Due to the current hosting conditions, this may take a while. Please hold on
                  </HoverCardContent>
                </HoverCard>
              Loading Posts...(this might take a while){" "}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Posts;
