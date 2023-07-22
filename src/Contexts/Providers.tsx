"use client";

import SessionProvider from "@/contexts/SessionProvider";
import { Post, User } from "@/lib/types";
import { QueryClient, QueryClientProvider } from "react-query";
import PostsProvider from "./PostsProvider";

const Providers = ({
  children,
  user,
  posts,
  post,
}: {
  children: React.ReactNode;
    user: User | null;
  posts: Post[] | null
  post: Post | null
}) => {
  const queryClient = new QueryClient();
  return (

    <SessionProvider user={user}>
      <PostsProvider posts={posts} currentPost={post}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </PostsProvider>
    </SessionProvider>
  );
};

export default Providers;
