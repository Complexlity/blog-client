"use client";

import SessionProvider from "@/Contexts/SessionProvider";
import { User } from "@/lib/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Providers = ({
  children,

}: {
  children: React.ReactNode;

}) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient} >
      <SessionProvider >{children}</SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
