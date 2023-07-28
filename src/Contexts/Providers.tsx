"use client";

import SessionProvider from "@/contexts/SessionProvider";
import { Post, User } from "@/lib/types";
import { QueryClient, QueryClientProvider } from "react-query";
import PostsProvider from "./PostsProvider";

const Providers = ({
  children,
  user,

}: {
  children: React.ReactNode;
    user: User | null;
}) => {
  const queryClient = new QueryClient();
  return (

    <SessionProvider user={user}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
