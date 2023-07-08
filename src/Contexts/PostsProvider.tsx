"use client";

import { Post } from "@/lib/types";
import { useState, createContext, useContext } from "react";

export type GlobalPosts = {
  posts: Post[] | null;
  setPosts: (c: Post[] | null) => void;
};
const PostsContext = createContext<GlobalPosts>({
  posts: null,
  setPosts: () => {},
});

interface Props {
  children: React.ReactNode;
  posts: Post[] | null;
}

export const usePostsContext = () => useContext(PostsContext);

const PostsContextProvider = ({ children, posts }: Props) => {
  const [allPosts, setAllPosts] = useState<Post[] | null>(posts);
  return (
    <PostsContext.Provider value={{ posts: allPosts, setPosts: setAllPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsContextProvider;
