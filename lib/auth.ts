// lib/auth.ts
import { jwtDecode } from "jwt-decode";
import axiosInstance from "./axios";
import { LoginResponse, User } from "@/types/auth";
import { endpoints } from "./endpoints";

interface JWTPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  exp: number;
}

export function decodeToken(token: string): User | null {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    return {
      id: decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ],
      email:
        decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
    };
  } catch {
    return null;
  }
}

export async function login(email: string, password: string) {
  const response = await axiosInstance.post<LoginResponse>(
    endpoints.account.login,
    {
      email,
      password,
    }
  );

  const token = response.data.data.token;
  localStorage.setItem("token", token);

  const user = decodeToken(token);
  return user;
}

export function logout() {
  localStorage.removeItem("token");
}

export function getUser(): User | null {
  const token = localStorage.getItem("token");
  return token ? decodeToken(token) : null;
}
