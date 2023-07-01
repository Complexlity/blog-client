'use client'

import SessionProvider from "@/Contexts/SessionProvider"
import { User } from "@/lib/types"
import { QueryClient, QueryClientProvider } from "react-query";





const Providers = ({ children, user }: { children: React.ReactNode, user: User | null }) => {
  const queryClient = new QueryClient();
  return (
    <SessionProvider user={user}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}

export default Providers