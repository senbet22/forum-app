export interface APIResponse<T> {
  httpStatusCode: number;
  success: boolean;
  responseMessages: string[];
  data: T;
}

// User Response
export interface User {
  id: string;
  email: string;
}

export type UserResponse = APIResponse<User>;

// Login response
export interface Login {
  token: string;
}

export type LoginResponse = APIResponse<Login>;

// Registration Data
export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

// The response after registration (before activation)
export type RegisterResponse = APIResponse<{ email: string } | null>;
