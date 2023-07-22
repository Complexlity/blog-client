"use client";

import { useUserContext } from "@/contexts/SessionProvider";
import { User } from "@/lib/types";
import { useEffect } from "react";

const useSession = () => {
  const store = useUserContext();

  async function refetchUser() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/me`,
        {
          credentials: "include",
        }
      );
      const user = (await response.json()) as unknown as User;
      if (!response.ok) throw new Error("user not found");
      store.setCurrentUser(user);
    } catch (error) {
      store.setCurrentUser(null);
    }
  }

  useEffect(() => {
    if (!store.user) {
      refetchUser();
    }
  }, []);
  return store.user;
};

export default useSession;
