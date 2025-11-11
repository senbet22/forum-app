"use client";

import { useState } from "react";
import { Divider, Heading, ToggleGroup } from "@digdir/designsystemet-react";
import Image from "next/image";
import Account from "./components/Account";
import AccountSettings from "./components/Settings";
import { User, Settings, User2 } from "lucide-react";
import { ChangeAvatarDialog } from "./components/ChangeAvatarDialog";
import { useAuth } from "@/context/AuthContext";
import { API_URL } from "@/lib/apiConfig";

const tabs = [
  { value: "account", label: "Account", icon: <User size={26} /> },
  { value: "settings", label: "Settings", icon: <Settings size={26} /> },
];

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("account");

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return <Account userData={user} />;
      case "settings":
        return <AccountSettings />;
      default:
        return <Account userData={user} />;
    }
  };

  if (!user) {
    return (
      <div className="p-4">
        <p>Could not get the user profile information. Please login again.</p>
      </div>
    );
  }

  return (
    <section className="p-6 flex flex-col gap-4 min-h-[75svh] w-full max-w-4xl mx-auto rounded-md py-20">
      <div className="flex flex-row items-end gap-4">
        <div className="relative group w-[200px] h-[200px]">
          {user.avatarUrl ? (
            <Image
              loading="eager"
              src={`${API_URL}${user.avatarUrl}`}
              alt={`${user.username}'s avatar`}
              width={200}
              height={200}
              className="object-cover rounded-md w-full h-full"
            />
          ) : (
            <User2 className="w-20 h-20 text-gray-400" />
          )}
          <ChangeAvatarDialog currentAvatarUrl={user?.avatarUrl ?? ""} />
        </div>

        <Heading level={1} data-size="lg">
          <strong>{user.username}</strong>
        </Heading>
      </div>

      <nav aria-label="Profile sections">
        <ToggleGroup value={activeTab} onChange={(value) => setActiveTab(value)} className="w-full!">
          {tabs.map((tab) => (
            <ToggleGroup.Item key={tab.value} value={tab.value} className="select-none">
              {tab.icon}
              {tab.label}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup>
      </nav>
      <Divider />

      {renderContent()}
    </section>
  );
};

export default Profile;
