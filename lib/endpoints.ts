import { API_URL } from "@/lib/apiConfig";

/**
 * Centralized API endpoint definitions.
 * Each key represents a logical API group (account, token, image, test, etc.).
 * Dynamic routes are represented as functions for type safety and flexibility.
 */
export const endpoints = {
  account: {
    // GET
    all: `${API_URL}/account/all`,
    byId: (id: string | number) => `${API_URL}/account/${id}`,
    search: `${API_URL}/account/search`,
    me: `${API_URL}/account/me`,
    refreshToken: `${API_URL}/account/refresh-token`,

    // POST
    register: `${API_URL}/account/register`,
    login: `${API_URL}/account/login`,
    usernameAvailable: `${API_URL}/account/username-available`,
    emailAvailable: `${API_URL}/account/email-available`,
    activate: `${API_URL}/account/activate`,
    passwordReset: `${API_URL}/account/password-reset`,
    sendActivationCode: `${API_URL}/account/send-activation-code`,
    sendPasswordResetCode: `${API_URL}/account/send-password-reset-code`,

    // PUT
    update: `${API_URL}/account/update`,

    // DELETE
    deleteById: (id: string | number) => `${API_URL}/account/delete/${id}`,
  },

  token: {
    sendActivation: `${API_URL}/token/send-activation`,
    refresh: `${API_URL}/token/refresh`,
  },

  image: {
    // GET
    getAllAvatars: `${API_URL}/image/avatar/all`,

    // POST
    uploadAvatar: `${API_URL}/image/upload/avatar`,

    // DELETE
    deleteAvatar: (id: string | number) => `${API_URL}/image/avatar/${id}`,
  },

  test: {
    // GET
    getLog: (logType: string, date: string) => `${API_URL}/test/logs/${logType}/${date}`,
    getActivationCode: (email: string) => `${API_URL}/test/get-activation-code/${email}`,
    getRecoveryCode: (email: string) => `${API_URL}/test/get-recovery-code/${email}`,
    getDeviceInfo: `${API_URL}/test/get-device-info`,
    authorizationCheck: `${API_URL}/test/authorization-check`,
    authorizationAdminCheck: `${API_URL}/test/authorization-admin-check`,
  },
};
