"use client";

import { useState } from "react";
import { Dialog, Heading, Fieldset, Radio, Button, Spinner, Alert } from "@digdir/designsystemet-react";
import axios from "axios";
import Image from "next/image";
import { UserRoundPen } from "lucide-react";
import { API_URL } from "@/lib/apiConfig";
import { useAuth } from "@/context/AuthContext";
import { changeAvatar } from "@/lib/profile";

type Avatar = {
  id: number;
  url: string;
  name: string;
};

type Props = {
  currentAvatarUrl: string;
};

export function ChangeAvatarDialog({ currentAvatarUrl }: Props) {
  const { user, updateUser } = useAuth();
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [submitError, setSubmitError] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [open, setOpen] = useState(false);

  const fetchAvatars = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/image/avatar/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = res.data.data as Avatar[];
      const current = data.find((a) => a.url === currentAvatarUrl);
      setSelectedId(current?.id ?? null);
      const sorted = current ? [current, ...data.filter((a) => a.id !== current.id)] : data;
      setAvatars(sorted);
    } catch (err) {
      console.error(err);
      setError("Could not retrieve avatars. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = async () => {
    setOpen(true);
    await fetchAvatars();
  };

  const currentAvatar = avatars.find((a) => a.url === user?.avatarUrl);
  const isSameAvatar = selectedId !== null && currentAvatar?.id === selectedId;

  const handleSubmit = async () => {
    if (!selectedId) return;

    if (isSameAvatar) {
      setSubmitError("Avatar already in use, please pick a different.");
      return;
    }
    setIsSubmitting(true);
    setError(undefined);

    try {
      await changeAvatar(selectedId);
      const updatedAvatar = avatars.find((a) => a.id === selectedId);
      if (updatedAvatar) {
        updateUser({ avatarUrl: updatedAvatar.url });
      }
      setOpen(false);
    } catch (err) {
      console.error(err);
      setError("Could not set avatar. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.TriggerContext>
      {/* Dialog trigger button */}
      <Dialog.Trigger asChild>
        <button
          aria-label="Change avatar"
          onClick={handleOpen}
          className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <UserRoundPen size={34} className="text-white cursor-pointer" />
        </button>
      </Dialog.Trigger>

      {/* Dialog content */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Heading level={2}>Choose a new avatar</Heading>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Spinner aria-label="Laster inn avatar bilder" />
          </div>
        ) : (
          <div className="max-h-[50vh] overflow-y-auto mt-4 w-full">
            <Fieldset>
              <Fieldset.Legend>Available avatars</Fieldset.Legend>
              <div className="grid grid-cols-3 gap-4 w-full p-2">
                {avatars.map((avatar) => (
                  <Radio
                    key={avatar.id}
                    name="avatar"
                    data-size="sm"
                    value={avatar.id.toString()}
                    label={
                      <Image
                        src={`${API_URL}${avatar.url}`}
                        alt={avatar.name}
                        width={140}
                        height={140}
                        className="object-cover rounded-md border"
                      />
                    }
                    checked={selectedId === avatar.id}
                    onChange={() => setSelectedId(avatar.id)}
                    className={`p-2 ${isSameAvatar ? "border-green-800" : "border-gray-500"} `}
                  />
                ))}
              </div>
            </Fieldset>
          </div>
        )}

        {error && <p className="text-red-600 mt-2">{error}</p>}

        {isSameAvatar && submitError && (
          <Alert data-color="warning" className="mt-4">
            {submitError}
          </Alert>
        )}

        <div className={`mt-6 flex justify-end`}>
          <Button onClick={handleSubmit} loading={isSubmitting} disabled={isSubmitting || !selectedId || isSameAvatar}>
            Change avatar
          </Button>
        </div>
      </Dialog>
    </Dialog.TriggerContext>
  );
}
