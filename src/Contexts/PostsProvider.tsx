"use client";

import { Post } from "@/lib/types";
import { createContext, useContext, useState } from "react";

export type GlobalPosts = {
  posts: Post[] | null;
  setPosts: (c: Post[] | null) => void;
  currentPost: Post | null;
  setCurrentPost: (c: Post | null) => void;
};
const PostsContext = createContext<GlobalPosts>({
  posts: null,
  setPosts: () => { },
  currentPost: null,
  setCurrentPost: () => {}
});

interface Props {
  children: React.ReactNode;
  posts: Post[] | null;
  currentPost: Post | null
}

export const usePostsContext = () => useContext(PostsContext);

const PostsContextProvider = ({ children, posts, currentPost }: Props) => {
  const [allPosts, setAllPosts] = useState<Post[] | null>(posts);

  const [newestPost, setNewestPost] = useState < Post | null>(currentPost)
  return (
    <PostsContext.Provider value={{ posts: allPosts, setPosts: setAllPosts, currentPost: newestPost, setCurrentPost: setNewestPost }}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsContextProvider;
