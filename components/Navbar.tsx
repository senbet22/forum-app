// components/Navbar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { Button, Dropdown, Avatar, Switch } from "@digdir/designsystemet-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { LogOut, ChevronDown, ChevronUp } from "lucide-react";
import { assets } from "@/app/assets/assets";
import Image from "next/image";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getUserInitials = () => {
    if (!user) return "U";
    const email = user.email || "";
    const name = email.split("@")[0];
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 "
      style={{
        backgroundColor: "var(--ds-color-surface-default)",
        borderColor: "var(--ds-color-border-subtle)",
      }}
    >
      <nav className="flex justify-between px-8 items-center h-16 max-w-6xl mx-auto w-full">
        <div className="flex gap-6">
          <Link data-color="neutral" href="/">
            <Image
              src={theme === "dark" ? assets.logo_dark : assets.logo}
              width={250}
              alt="Felles Forumet Logo"
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {!isAuthenticated() ? (
            <Button asChild>
              <Link href="/auth">
                <span>Login</span>
              </Link>
            </Button>
          ) : (
            <Dropdown.TriggerContext>
              <Dropdown.Trigger
                variant="tertiary"
                className="text-xl"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Avatar aria-label={user?.email || "User"} data-size="xs">
                  {getUserInitials()}
                </Avatar>
                <span className="font-semibold">Profile</span>
                {isDropdownOpen ? (
                  <ChevronUp height={24} width={24} />
                ) : (
                  <ChevronDown height={24} width={24} />
                )}
              </Dropdown.Trigger>
              <Dropdown
                placement="bottom-end"
                data-size="md"
                onClose={() => setIsDropdownOpen(false)}
              >
                <Dropdown.List>
                  <Dropdown.Item>
                    <Dropdown.Button asChild>
                      <Link href="/profile">
                        <Avatar aria-hidden data-size="xs">
                          {getUserInitials()}
                        </Avatar>
                        {user?.email?.split("@")[0] || "Profile"}
                      </Link>
                    </Dropdown.Button>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Dropdown.Button>
                      {/* Theme Toggle Button */}
                      <Switch
                        description=""
                        label="Dark mode"
                        position="start"
                        onClick={toggleTheme}
                      />
                    </Dropdown.Button>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Dropdown.Button onClick={logout}>
                      <LogOut /> Logout
                    </Dropdown.Button>
                  </Dropdown.Item>
                </Dropdown.List>
              </Dropdown>
            </Dropdown.TriggerContext>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
