"use client";

import { useEffect, useState } from "react";
import { Divider, Heading, Skeleton, ToggleGroup } from "@digdir/designsystemet-react";
import { getMyAccount } from "@/lib/profile";
import type { LoggedUser } from "@/types/profile";
import Image from "next/image";
import MyPosts from "./components/MyPosts";
import Account from "./components/Account";
import AccountSettings from "./components/Settings";
import { User, FileText, Settings, User2 } from "lucide-react";
import { ChangeAvatarDialog } from "./components/ChangeAvatarDialog";

const tabs = [
  { value: "account", label: "Account", icon: <User size={26} /> },
  { value: "posts", label: "My posts", icon: <FileText size={26} /> },
  { value: "settings", label: "Settings", icon: <Settings size={26} /> },
];

const Profile = () => {
  const [user, setUser] = useState<LoggedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("account");

  const renderContent = () => {
    switch (activeTab) {
      case "posts":
        return <MyPosts />;
      case "account":
        return <Account userData={user} />;
      case "settings":
        return <AccountSettings userData={user} />;
      default:
        return <Account userData={user} />;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMyAccount();
        setUser(data);
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <Skeleton variant="text" width={20} className="text-3xl" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4">
        <p className="text-base-mode">Couldn´t get the user profile information. Please login again.</p>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-4 min-h-[75svh] w-full max-w-4xl mx-auto text-base-mode bg-theme-foreground rounded-md border border-base-color py-10">
      <div className="flex flex-row items-end gap-4">
        <div className="relative group w-[200px] h-[200px]">
          {user.avatarUrl ? (
            <Image
              loading="eager"
              src={`http://51.175.136.91${user.avatarUrl}`}
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

      <Divider />

      <nav aria-label="Profile sections">
        <ToggleGroup value={activeTab} onChange={(value) => setActiveTab(value)} className="w-full!">
          {tabs.map((tab) => (
            <ToggleGroup.Item key={tab.value} value={tab.value}>
              {tab.icon}
              {tab.label}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup>
      </nav>
      {renderContent()}
    </div>
  );
};

export default Profile;
