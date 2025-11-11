"use client";

import { Alert, Heading, Link } from "@digdir/designsystemet-react";
import UsernameField from "./UsernameField";
import { ChangePasswordDialog } from "./ChangePasswordDialog";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

const AccountSettings = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  if (!user) return <p>No user data available</p>;

  const grayBgAndBorder = "border-stone-300 bg-stone-50";
  const darkGrayBgAndBorder = "border-stone-600 bg-stone-800";

  return (
    <>
      {/* Username section */}
      <section className={`border  px-4 py-2 rounded-lg ${theme === "dark" ? darkGrayBgAndBorder : grayBgAndBorder}`}>
        <Heading level={3} data-size="md" className="mb-2">
          Change Username?
        </Heading>

        <UsernameField />
      </section>

      {/* Password section */}
      <section className={`border  px-4 py-2 rounded-lg ${theme === "dark" ? darkGrayBgAndBorder : grayBgAndBorder}`}>
        <Heading level={3} data-size="md" className="mb-2">
          Change password
        </Heading>
        <p className="text-gray-400 mb-2">Update your password securely through the dialog.</p>
        <ChangePasswordDialog />
      </section>

      {/* Email section */}
      <section className={`border  px-4 py-2 rounded-lg ${theme === "dark" ? darkGrayBgAndBorder : grayBgAndBorder}`}>
        <Heading level={3} data-size="md" className="mb-2">
          Email
        </Heading>
        <p>Your current email:</p>
        <p className={`p-2 border rounded  ${theme === "dark" ? "text-stone-600" : "text-gray-400"}`}>
          <strong>{user.email}</strong>
        </p>
        <Alert className={`mt-2 flex items-center gap-2`}>
          If you wish to change your email or have any other issues, contact us <Link href="#">here</Link>.
        </Alert>
      </section>
    </>
  );
};

export default AccountSettings;
