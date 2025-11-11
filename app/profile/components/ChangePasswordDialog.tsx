"use client";

import { changeOldPassword, changeOldPasswordFinalize } from "@/lib/profile";
import { Dialog, Heading, Textfield, Button, Alert, ErrorSummary } from "@digdir/designsystemet-react";
import { useState } from "react";

export function ChangePasswordDialog() {
  const [step, setStep] = useState<"old" | "verify">("old");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoadingOld, setIsLoadingOld] = useState(false);
  const [isLoadingFinalize, setIsLoadingFinalize] = useState(false);

  const handleDialogClose = () => {
    setStep("old");
    setErrors([]);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setCode("");
    setIsLoadingOld(false);
    setIsLoadingFinalize(false);
  };

  const handleOldPasswordSubmit = async () => {
    setErrors([]);
    setIsLoadingOld(true);

    try {
      const res = await changeOldPassword(oldPassword);
      if (res.success) setStep("verify");
    } catch {
      setErrors(["Request denied, invalid password"]);
    } finally {
      setIsLoadingOld(false);
    }
  };

  const handleFinalize = async () => {
    const newErrors: string[] = [];

    if (code.length !== 6) {
      newErrors.push("Code must be exactly 6 digits.");
    }

    if (newPassword !== confirmPassword) {
      newErrors.push("The passwords are not the same.");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoadingFinalize(true);

    try {
      const res = await changeOldPasswordFinalize(code, newPassword);
      if (res.success) {
        alert("Password has been changed succesfully");
        handleDialogClose();
      } else {
        setErrors([
          res.responseMessages?.NewPassword?.[0] ?? res.responseMessages?.Code?.[0] ?? "Could not update password.",
        ]);
      }
    } catch {
      setErrors(["Unknown error."]);
    } finally {
      setIsLoadingFinalize(false);
    }
  };

  return (
    <Dialog.TriggerContext>
      <Dialog.Trigger>Change password</Dialog.Trigger>
      <Dialog onClose={handleDialogClose}>
        <Heading level={2}>Change password</Heading>

        {step === "old" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleOldPasswordSubmit();
            }}
            className="flex flex-col gap-2"
          >
            <Textfield
              id="oldPassword"
              type="password"
              label="Current password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              error={errors.length > 0 ? errors[0] : undefined}
            />
            <Button type="submit" loading={isLoadingOld} disabled={isLoadingOld}>
              Continue
            </Button>
          </form>
        )}

        {step === "verify" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFinalize();
            }}
            className="flex flex-col gap-2"
          >
            <Alert data-color="info">
              A code has been sent to registered email, please enter to verify and proceed with password change.
            </Alert>

            <Textfield
              id="code"
              type="text"
              label="Verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              error={errors.find((e) => e.toLowerCase().includes("kode"))}
            />

            <Textfield
              id="newPassword"
              type="password"
              label="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <Textfield
              id="confirmPassword"
              type="password"
              label="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={newPassword !== confirmPassword && confirmPassword !== "" ? "Passwords do not match" : undefined}
            />

            <Button type="submit" loading={isLoadingFinalize} disabled={isLoadingFinalize}>
              Update password
            </Button>

            {errors.length > 0 && (
              <ErrorSummary>
                <ErrorSummary.Heading>To proceed, you must correct the following errors:</ErrorSummary.Heading>
                <ErrorSummary.List>
                  {errors.map((err, idx) => (
                    <ErrorSummary.Item key={idx}>
                      <ErrorSummary.Link
                        href={`#${err.toLowerCase().includes("code") ? "code" : err.toLowerCase().includes("passord") ? "confirmPassword" : "newPassword"}`}
                      >
                        {err}
                      </ErrorSummary.Link>
                    </ErrorSummary.Item>
                  ))}
                </ErrorSummary.List>
              </ErrorSummary>
            )}
          </form>
        )}
      </Dialog>
    </Dialog.TriggerContext>
  );
}
