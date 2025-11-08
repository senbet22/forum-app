"use client";

import { changeOldPassword, changeOldPasswordFinalize } from "@/lib/profile";
import { Dialog, Heading, Textfield, Button } from "@digdir/designsystemet-react";
import { useState } from "react";

export function ChangePasswordDialog() {
  const [step, setStep] = useState<"old" | "verify">("old");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string | undefined>();
  const [isLoadingOld, setIsLoadingOld] = useState(false);
  const [isLoadingFinalize, setIsLoadingFinalize] = useState(false);

  const handleDialogClose = () => {
    setStep("old");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setCode("");
    setError(undefined);
    setIsLoadingOld(false);
    setIsLoadingFinalize(false);
  };

  const handleOldPasswordSubmit = async () => {
    setError(undefined);
    setIsLoadingOld(true);

    try {
      const res = await changeOldPassword(oldPassword);

      if (res.success) {
        // Backend sender verifikasjonskode (e-post/SMS). Gå til steg 2.
        setStep("verify");
      } else {
        if (res.responseMessages?.OldPassword) {
          setError(res.responseMessages.OldPassword[0]);
        } else {
          setError("Kunne ikke starte passordendring.");
        }
      }
    } catch (err: unknown) {
      setError("Ukjent feil.");
    } finally {
      setIsLoadingOld(false);
    }
  };

  const handleFinalize = async () => {
    setError(undefined);
    setIsLoadingFinalize(true);

    if (newPassword !== confirmPassword) {
      setError("Passordene er ikke like.");
      setIsLoadingFinalize(false);
      return;
    }

    try {
      const res = await changeOldPasswordFinalize(code, newPassword);

      if (res.success) {
        alert("Passordet er oppdatert!");
        handleDialogClose();
      } else {
        if (res.responseMessages?.NewPassword) {
          setError(res.responseMessages.NewPassword[0]);
        } else if (res.responseMessages?.Code) {
          setError(res.responseMessages.Code[0]);
        } else {
          setError("Kunne ikke oppdatere passordet.");
        }
      }
    } catch (err: unknown) {
      setError("Ukjent feil.");
    } finally {
      setIsLoadingFinalize(false);
    }
  };

  return (
    <Dialog.TriggerContext>
      {/* Knappen som åpner dialogen */}
      <Dialog.Trigger>Change password</Dialog.Trigger>

      <Dialog onClose={handleDialogClose}>
        <Heading level={2} style={{ marginBottom: "var(--ds-size-2)" }}>
          Change password
        </Heading>

        {step === "old" && (
          <div className="flex flex-col gap-2">
            <Textfield
              type="password"
              label="Current password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              error={error}
            />
            <Button onClick={handleOldPasswordSubmit} loading={isLoadingOld} disabled={isLoadingOld}>
              Continue
            </Button>
          </div>
        )}

        {step === "verify" && (
          <div className="flex flex-col gap-2">
            <p className="text-gray-400">
              A code has been sent to registered email, please enter to verify and allow password change.
            </p>
            <Textfield label="Verification code" value={code} onChange={(e) => setCode(e.target.value)} maxLength={6} />
            <Textfield
              type="password"
              label="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Textfield
              type="password"
              label="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={newPassword !== confirmPassword && confirmPassword !== "" ? "Passwords do not match" : undefined}
            />
            <Button onClick={handleFinalize} loading={isLoadingFinalize} disabled={isLoadingFinalize}>
              Update password
            </Button>
          </div>
        )}
      </Dialog>
    </Dialog.TriggerContext>
  );
}
