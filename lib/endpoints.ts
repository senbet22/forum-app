import { API_URL } from "@/lib/apiConfig";

/**
 * Centralized API endpoint definitions.
 * Each key represents a logical API group (account, token, image, test, etc.).
 * Dynamic routes are represented as functions for type safety and flexibility.
 */
export const endpoints = {
  account: {
    // GET
    all: `${API_URL}/api/account/all`,
    byId: (id: string | number) => `${API_URL}/api/account/${id}`,
    search: `${API_URL}/api/account/search`,
    me: `${API_URL}/api/account/me`,
    refreshToken: `${API_URL}/api/account/refresh-token`,

    // POST
    register: `${API_URL}/api/account/register`,
    login: `${API_URL}/api/account/login`,
    usernameAvailable: `${API_URL}/api/account/username-available`,
    emailAvailable: `${API_URL}/api/account/email-available`,
    activate: `${API_URL}/api/account/activate`,
    passwordReset: `${API_URL}/api/account/password-reset`,
    sendActivationCode: `${API_URL}/api/account/send-activation-code`,
    sendPasswordResetCode: `${API_URL}/api/account/send-password-reset-code`,

    sendOldPassWordChange: `${API_URL}/api/account/password-change`,
    sendNewPassWordChangeFinalization: `${API_URL}/api/account/password-change-finalization`,

    // PUT
    update: `${API_URL}/api/account/update`,
    updateAvatar: `${API_URL}/api/account/update/avatar`,
    updateUsername: `${API_URL}/api/account/update/username`,

    // DELETE
    deleteById: (id: string | number) => `${API_URL}/api/account/delete/${id}`,
  },

  token: {
    sendActivation: `${API_URL}/api/token/send-activation`,
    refresh: `${API_URL}/api/token/refresh`,
  },

  image: {
    // GET
    getAllAvatars: `${API_URL}/api/image/avatar/all`,

    // POST
    uploadAvatar: `${API_URL}/api/image/upload/avatar`,

    // DELETE
    deleteAvatar: (id: string | number) => `${API_URL}/api/image/avatar/${id}`,
  },

  test: {
    // GET
    getLog: (logType: string, date: string) =>
      `${API_URL}/api/test/logs/${logType}/${date}`,
    getActivationCode: (email: string) =>
      `${API_URL}/api/test/get-activation-code/${email}`,
    getRecoveryCode: (email: string) =>
      `${API_URL}/api/test/get-recovery-code/${email}`,
    getDeviceInfo: `${API_URL}/api/test/get-device-info`,
    authorizationCheck: `${API_URL}/api/test/authorization-check`,
    authorizationAdminCheck: `${API_URL}/api/test/authorization-admin-check`,
  },
};
