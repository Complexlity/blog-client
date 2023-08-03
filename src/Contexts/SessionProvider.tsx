'use client'

import { User } from "@/lib/types";
import { createContext, useContext, useState } from "react";

export type GlobalPosts = {
  user: User | null;
  setCurrentUser: (c: User | null) => void;
};
const UserContext = createContext<GlobalPosts>({
  user: null,
  setCurrentUser: () => {},
});

interface Props {
  children: React.ReactNode;
  user: User | null
}

export const useUserContext = () => useContext(UserContext);

const UserContextProvider = ({ children, user }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(user);
  return (
    <UserContext.Provider value={{ user: currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
