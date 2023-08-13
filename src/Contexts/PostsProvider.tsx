"use client";

import { Post } from "@/lib/types";
import { createContext, useContext, useState } from "react";

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

}

export const usePostsContext = () => useContext(PostsContext);

const PostsContextProvider = ({ children,  }: Props) => {
  const [allPosts, setAllPosts] = useState<Post[] | null>(null);
  return (
    <PostsContext.Provider
      value={{
        posts: allPosts,
        setPosts: setAllPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export default PostsContextProvider;
