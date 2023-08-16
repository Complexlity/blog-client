// "use client";

// import { useUserContext } from "@/Contexts/SessionProvider";
// import { User } from "@/lib/types";
// import { useEffect } from "react";

// const useSession = () => {
//   const store = useUserContext();

//   async function refetchUser() {
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/me`,
//         {
//           credentials: "include",
//         }
//       );
//       const user = (await response.json()) as unknown as User;
//       if (!response.ok) throw new Error("user not found");
//       store.setCurrentUser(user);
//     } catch (error) {
//       store.setCurrentUser(null);
//     }
//   }

//   useEffect(() => {
//     if (!store.user) {
//       refetchUser();
//     }
//   }, []);
//   return store.user;
// };

// export default useSession;
"use client";

import { useEffect } from "react";
import useStore from "@/store";
import { User } from "@/lib/types";

export default function useSession() {
  const store = useStore();

  async function fetchUser() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/me`,
        {
          credentials: "include",
        }
      );
      const user = (await response.json()) as unknown as User;
      if (!response.ok) throw new Error("user not found");
      store.setAuthUser(user);
    } catch (error: any) {
      store.reset();
    }
  }

  useEffect(() => {
    if (!store.authUser) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return store.authUser;
}
