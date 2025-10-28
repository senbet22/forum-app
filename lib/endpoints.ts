// lib/endpoints.ts
import { API_URL } from "@/lib/apiConfig";

// Core account routes
export const endpoints = {
  account: {
    all: `${API_URL}/account/all`,
    usernameAvailable: (username: string) =>
      `${API_URL}/account/username-available/${username}`,
    emailAvailable: (email: string) =>
      `${API_URL}/account/email-available/${email}`,
    register: `${API_URL}/account/register`,
    activate: `${API_URL}/account/activate`,
  },

  token: {
    sendActivationToken: `${API_URL}/token/send-activation-token`,
  },

  test: {
    getActivationCode: (email: string) =>
      `${API_URL}/test/get-activation-code/${email}`,
    getRecoveryCode: (email: string) =>
      `${API_URL}/test/get-recovery-code/${email}`,
    getDeviceInfo: `${API_URL}/test/get-device-info`,
    authorization: `${API_URL}/test/authorization`,
  },
};
