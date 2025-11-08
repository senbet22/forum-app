"use client";

import { Heading, Divider } from "@digdir/designsystemet-react";
import UsernameField from "./UsernameField";
import { BadgeInfo } from "lucide-react";
import { LoggedUser } from "@/types/profile";
//temporarily disabled ChangePasswordDialog until sorting cookie situation
// import { ChangePasswordDialog } from "./ChangePasswordDialog";
interface SettingsProp {
  userData: Pick<LoggedUser, "email" | "username" | "lastTimeUsernameChanged"> | null;
}

const AccountSettings = ({ userData }: SettingsProp) => {
  if (!userData) return <p>No user data available</p>;

  const grayBgAndBorder = "border border-gray-300 bg-gray-500/20 px-4 py-2 rounded-lg";

  return (
    <>
      {/* Username section */}
      <section className={grayBgAndBorder}>
        <Heading level={3} data-size="md" className="mb-2">
          Change Username?
        </Heading>
        <p className="text-sm text-gray-400 mt-2">You may only change your username once per month.</p>
        <UsernameField lastChanged={userData.lastTimeUsernameChanged} />
      </section>

      <Divider />

      {/* Password section */}
      <section className={grayBgAndBorder}>
        <Heading level={3} data-size="md" className="mb-2">
          Change password
        </Heading>
        <p className="text-gray-400 mb-2">Update your password securely through the dialog.</p>
        <button
          type="button"
          className="py-2 px-3 rounded bg-gray-500 hover:bg-gray-600 cursor-pointer active:scale-98 transition-all"
        >
          Temp Change Password
        </button>
        {/*  temporarily disabled ChangePasswordDialog until sorting cookie situation */}
        {/* <ChangePasswordDialog /> */}
      </section>

      <Divider />

      {/* Email section */}
      <section className={grayBgAndBorder}>
        <Heading level={3} data-size="md" className="mb-2">
          Email
        </Heading>
        <p>Your current email:</p>
        <div className="p-2 border rounded">{userData.email}</div>
        <p className="text-gray-400 mt-2 flex items-center gap-2">
          <BadgeInfo size={18} /> If you wish to change your email or think it has been breached, contact us here.
        </p>
      </section>
    </>
  );
};

export default AccountSettings;
