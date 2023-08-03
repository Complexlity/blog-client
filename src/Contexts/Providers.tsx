"use client";

import SessionProvider from "@/Contexts/SessionProvider";
import { User } from "@/lib/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
