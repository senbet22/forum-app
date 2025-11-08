"use client";

import { useState } from "react";
import { Dialog, Heading, Fieldset, Radio, Button, Spinner } from "@digdir/designsystemet-react";
import axios from "axios";
import Image from "next/image";
import { UserRoundPen } from "lucide-react";
import { API_URL } from "@/lib/apiConfig";

type Avatar = {
  id: number;
  url: string;
  name: string;
};

type Props = {
  currentAvatarUrl: string;
};

export function ChangeAvatarDialog({ currentAvatarUrl }: Props) {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
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
      setError("Kunne ikke hente avatarer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = async () => {
    setOpen(true);
    await fetchAvatars();
  };

  const handleSubmit = async () => {
    if (!selectedId) return;
    setIsSubmitting(true);
    setError(undefined);

    try {
      await axios.put(
        `${API_URL}/api/account/update/avatar`,
        { avatarId: selectedId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // refresh avatar logic her
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError("Kunne ikke oppdatere avatar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.TriggerContext>
      <Dialog.Trigger asChild>
        <button
          aria-label="Endre avatar"
          onClick={handleOpen}
          className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <UserRoundPen size={34} className="text-white" />
        </button>
      </Dialog.Trigger>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Heading level={2}>Velg ny avatar</Heading>

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
                        src={`http://51.175.136.91${avatar.url}`}
                        alt={avatar.name}
                        width={140}
                        height={140}
                        className="object-cover rounded-md border"
                      />
                    }
                    checked={selectedId === avatar.id}
                    onChange={() => setSelectedId(avatar.id)}
                  />
                ))}
              </div>
            </Fieldset>
          </div>
        )}

        {error && <p className="text-red-600 mt-2">{error}</p>}

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSubmit} loading={isSubmitting} disabled={isSubmitting || !selectedId}>
            Oppdater avatar
          </Button>
        </div>
      </Dialog>
    </Dialog.TriggerContext>
  );
}
