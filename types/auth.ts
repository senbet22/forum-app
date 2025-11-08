export interface APIResponse<T> {
  httpStatusCode: number;
  success: boolean;
  messages: {
    code: string;
    response: string;
    validationErrors?: {
      [key: string]: string[];
    };
    fieldErrors?: {
      [key: string]: string;
    };
  };
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
