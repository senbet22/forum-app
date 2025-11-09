// components/Navbar.tsx
"use client";
import Link from "next/link";
import { Button, Dropdown, Avatar } from "@digdir/designsystemet-react";
import { useAuth } from "@/context/AuthContext";
import { House, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const getUserInitials = () => {
    if (!user) return "U";
    const email = user.email || "";
    const name = email.split("@")[0];
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="bg-amber-100">
      <nav className="flex justify-between px-8 items-center h-20 max-w-6xl mx-auto">
        <div className="flex gap-6">
          <Link data-color="neutral" href="/">
            <span className="text-black hover:text-blue-600 flex gap-2 font-semibold">
              <House /> Home
            </span>
          </Link>
        </div>

        {!isAuthenticated() ? (
          <Button asChild>
            <Link href="/auth">
              <span className="text-white">Login</span>
            </Link>
          </Button>
        ) : (
          <Dropdown.TriggerContext>
            <Dropdown.Trigger variant="tertiary">
              <Avatar aria-label={user?.email || "User"} data-size="sm">
                {getUserInitials()}
              </Avatar>
              Profile
            </Dropdown.Trigger>
            <Dropdown placement="bottom-end" data-size="md">
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
                  <Dropdown.Button onClick={logout}>
                    <LogOut /> Logout
                  </Dropdown.Button>
                </Dropdown.Item>
              </Dropdown.List>
            </Dropdown>
          </Dropdown.TriggerContext>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
