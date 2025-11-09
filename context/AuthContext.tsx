// context/AuthContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { decodeToken } from "@/lib/auth";
import { User } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = decodeToken(token);
      if (!decodedUser) {
        localStorage.removeItem("token");
      }
      return decodedUser;
    }
    return null;
  });

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const userData = decodeToken(token);
    if (userData) {
      setUser(userData);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  const isAuthenticated = () => !!user;
  const getToken = () => localStorage.getItem("token");

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, getToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
