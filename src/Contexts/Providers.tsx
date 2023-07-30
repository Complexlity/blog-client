"use client";

import SessionProvider from "@/contexts/SessionProvider";
import { Post, User } from "@/lib/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <SessionProvider user={user}>{children}</SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
