'use client'

import PostCard from "./PostCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Post } from "@/lib/types";


const Posts = () => {
  const { data: posts, isFetching, isFetched } = useQuery({
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isFetching ? <p>Loading....</p> : null}
          {isFetched && !posts ? <p>NO POST FOUND IN THE DATABASE</p> : null}
            {posts?.map((post) => (
              <PostCard post={post} key={post._id} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
