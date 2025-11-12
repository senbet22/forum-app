"use client";

import { useEffect } from "react";
import { useToast } from "@/context/ToastContext";
import { ToastComponent } from "./Toast";

export const ToastContainer = () => {
  const { addToast, toasts } = useToast();

  useEffect(() => {
    const raw = sessionStorage.getItem("redirect-toast");
    if (raw) {
      try {
        const { message, color, duration } = JSON.parse(raw);
        addToast({ message, color, duration });
      } catch (e) {
        console.error("Invalid toast data:", e);
      }
      sessionStorage.removeItem("redirect-toast");
    }
  }, [addToast]);

  return (
    <div className="fixed top-24 right-4 z-50 space-y-3">
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} dataColor={toast.color} duration={toast.duration}>
          {toast.message}
        </ToastComponent>
      ))}
    </div>
  );
};
