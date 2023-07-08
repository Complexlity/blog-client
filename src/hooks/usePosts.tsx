"use client";

import { usePostsContext } from "@/contexts/PostsProvider";
import { Post } from "@/lib/types";
import { useEffect } from "react";

const usePosts = () => {
  const store = usePostsContext();
  async function refetchPosts() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/posts`,
        {
          credentials: "include",
          cache: 'no-store'
        }
      );
      const posts = (await response.json()) as unknown as Post[];
      if (!response.ok) throw new Error("user not found");
      store.setPosts(posts);
    } catch (error) {
      store.setPosts(null);
    }
  }

  useEffect(() => {
    if (!store.posts) {
      refetchPosts();
    }
  }, []);
  return store.posts;
};

export default usePosts;
