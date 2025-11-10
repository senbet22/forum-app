"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getMyAccount } from "@/lib/profile";
import { LoggedUser } from "@/types/profile";

interface AuthContextType {
  user: LoggedUser | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
  getToken: () => string | null;
  updateUser: (newUser: Partial<LoggedUser>) => void;
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
  const [user, setUser] = useState<LoggedUser | null>(null);

  // 🔄 Initialiser brukerdata ved mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    getMyAccount()
      .then((userData) => setUser(userData))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      });
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("token", token);
    try {
      const userData = await getMyAccount();
      setUser(userData);
    } catch (error) {
      console.error("Could not retrieve user data:", error);
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  const updateUser = (newUser: Partial<LoggedUser>) => {
    setUser((prev) => (prev ? { ...prev, ...newUser } : prev));
  };

  const isAuthenticated = () => !!user;
  const getToken = () => localStorage.getItem("token");

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, getToken, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
