"use client";

import { useState, useEffect } from "react";
import { Textfield, Button, Alert, Spinner } from "@digdir/designsystemet-react";
import { Circle, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { changeUsername, getMyAccount, checkUsernameAvailable } from "@/lib/profile";
import { canChangeUsername } from "@/utils/canChangeUsername";
import { useAuth } from "@/context/AuthContext";

interface UsernameFieldProps {
  lastChanged: string;
  onUpdated?: (newUsername: string) => void;
}

const USERNAME_REGEX = /^(?=.{3,30}$)[a-zA-Z]+(?:[ _][a-zA-Z]+)*$/;

export default function UsernameField({ lastChanged, onUpdated }: UsernameFieldProps) {
  const { updateUser } = useAuth();
  const [username, setUsername] = useState("");
  const [available, setAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { allowed, remainingDays, nextAllowedDate } = canChangeUsername(lastChanged);

  useEffect(() => {
    if (!allowed) {
      setError(
        `You must wait ${remainingDays} day${remainingDays !== 1 ? "s" : ""} until you can change your name again.`
      );
    } else {
      setError(null);
    }
  }, [allowed, remainingDays, lastChanged]);

  useEffect(() => {
    const cleaned = username.trim();
    if (!cleaned) {
      setAvailable(null);
      setError(null);
      return;
    }

    if (!USERNAME_REGEX.test(cleaned)) {
      setError("Username must be 3–30 letters, spaces or underscores only.");
      setAvailable(null);
      return;
    }

    setError(null);

    const timeout = setTimeout(async () => {
      setChecking(true);
      try {
        setLoading(true);
        const res = await checkUsernameAvailable(cleaned);
        setAvailable(res.data.available);
      } catch {
        setAvailable(false);
      } finally {
        setLoading(false);
        setChecking(false);
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [username]);

  let icon = <Circle className="w-6 h-6 text-gray-400" />;
  if (checking) icon = <Loader2 className="w-6 h-6 animate-spin text-gray-500" />;
  else if (available === true) icon = <CheckCircle className="w-6 h-6 text-green-600" />;
  else if (available === false) icon = <XCircle className="w-6 h-6 text-red-600" />;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!available || error) return;
    try {
      setSaving(true);
      await changeUsername(username.trim());
      const me = await getMyAccount();
      updateUser({ username: me.username });
      setUsername("");
    } catch {
      setError("Failed to update username.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="w-full gap-2 flex flex-col">
      {!allowed && nextAllowedDate && (
        <Alert data-color="info">You can change your username again on {nextAllowedDate.toLocaleString("no-NO")}</Alert>
      )}

      <div className="w-full flex items-start mt-4">
        <Textfield
          label="Enter new username"
          description="You may only change your username once per month."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={error ?? (available === false ? "Username is taken" : undefined)}
          className="w-full"
        />
        <div className="h-12 w-12 grid items-center mt-[62px] justify-center border border-base-color rounded">
          {loading ? <Spinner data-size="xs" aria-label="Checks if name is available" /> : icon}
        </div>
      </div>

      <Button type="submit" disabled={available !== true || !!error || saving || !allowed} className="mt-2.5">
        {saving ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
