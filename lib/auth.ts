// lib/auth.ts
import { jwtDecode } from "jwt-decode";
import axiosInstance from "./axios";
import { LoginResponse, RegisterResponse, User } from "@/types/auth";
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

// Login Request
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

// Register Request
export async function register(
  username: string,
  email: string,
  password: string
) {
  const response = await axiosInstance.post<RegisterResponse>(
    endpoints.account.register,
    {
      username,
      email,
      password,
    }
  );

  return {
    success: response.data.success,
    email: email,
  };
}

// Logout
export function logout() {
  localStorage.removeItem("token");
}

// Get user function
export function getUser(): User | null {
  const token = localStorage.getItem("token");
  return token ? decodeToken(token) : null;
}
