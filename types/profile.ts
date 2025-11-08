import { APIResponse } from "./auth";

export interface LoggedUser {
  username: string;
  id: number;
  isActive: true;
  isBanned: false;
  email: string;
  avatarUrl: string | undefined;
  createdAt: string;
  role: string;
  lastTimeUsernameChanged: string;
  postCount?: number;
  messageCount?: number;
}

export type LoggedUserResponse = APIResponse<LoggedUser>;
