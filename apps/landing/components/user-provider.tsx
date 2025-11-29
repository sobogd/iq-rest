"use client";

import { createContext, useContext, ReactNode } from "react";

interface User {
  email: string;
  companyId?: string;
  companyName?: string;
}

const UserContext = createContext<User | null>(null);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export function useUserOptional() {
  return useContext(UserContext);
}

interface UserProviderProps {
  user: User;
  children: ReactNode;
}

export function UserProvider({ user, children }: UserProviderProps) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
