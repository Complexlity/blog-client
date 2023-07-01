'use client'

import SessionProvider from "@/Contexts/SessionProvider"
import { User } from "@/lib/types"





const Providers = ({ children, user }: { children: React.ReactNode, user: User | null }) => {
  return <SessionProvider user={user}>{children}</SessionProvider>
}

export default Providers