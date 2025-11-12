import { useToast } from "@/context/ToastContext";
import { ToastColor } from "@/types/toast";
import { useCallback } from "react";

interface ToastOptions {
  duration?: number;
}

export const useToaster = () => {
  const { addToast } = useToast();

  const toast = useCallback(
    (message: string, color: ToastColor = "info", options: ToastOptions = {}) => {
      addToast({
        message,
        color,
        duration: options.duration,
      });
    },
    [addToast]
  );

  return {
    toast,
    toastInfo: (msg: string, opts?: ToastOptions) => toast(msg, "info", opts),
    toastSuccess: (msg: string, opts?: ToastOptions) => toast(msg, "success", opts),
    toastWarning: (msg: string, opts?: ToastOptions) => toast(msg, "warning", opts),
    toastDanger: (msg: string, opts?: ToastOptions) => toast(msg, "danger", opts),
  };
};
