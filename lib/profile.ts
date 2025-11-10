import axiosInstance from "./axios";
import { LoggedUserResponse } from "@/types/profile";
import { endpoints } from "./endpoints";

interface PasswordChangeResponse {
  httpStatusCode: number;
  success: boolean;
  responseMessages: Record<string, string[]>;
  data: [];
}

interface UsernameChangeResponse {
  httpStatusCode: number;
  success: boolean;
  responseMessages: Record<string, string[]>;
  data: [];
}

interface UsernameAvailableResponse {
  httpStatusCode: number;
  success: boolean;
  responseMessages: Record<string, string[]>;
  data: {
    available: boolean;
  };
}

interface AvatarChangeResponse {
  httpStatusCode: number;
  success: boolean;
  responseMessages: Record<string, string[]>;
  data: [];
}

/* Send request to for entire user data */
export async function getMyAccount() {
  const response = await axiosInstance.get<LoggedUserResponse>(endpoints.account.me);
  return response.data.data;
}

/* Send request to change password, requires old password, matches HASH and returns valid or invalid on correct responses*/
export async function changeOldPassword(oldPassword: string) {
  const response = await axiosInstance.post<PasswordChangeResponse>(endpoints.account.sendOldPassWordChange, {
    oldPassword,
  });
  return response.data;
}

/* Send final request, requires code from previous step for the code and user sets new password together with the request*/
export async function changeOldPasswordFinalize(code: string, newPassword: string) {
  const response = await axiosInstance.post<PasswordChangeResponse>(
    endpoints.account.sendNewPassWordChangeFinalization,
    {
      code,
      newPassword,
    }
  );
  return response.data;
}

/* Check username availability */
export async function checkUsernameAvailable(value: string) {
  const response = await axiosInstance.post<UsernameAvailableResponse>(endpoints.account.usernameAvailable, {
    username: value,
  });
  return response.data;
}

/* Send request to change username, dependant on availability check, otherwise returns taken */
export async function changeUsername(newUsername: string) {
  const response = await axiosInstance.put<UsernameChangeResponse>(endpoints.account.updateUsername, {
    username: newUsername,
  });
  return response.data;
}

/* Send request to change avatar */
export async function changeAvatar(avatarId: number) {
  const response = await axiosInstance.put<AvatarChangeResponse>(endpoints.account.updateAvatar, { avatarId });
  return response.data;
}
