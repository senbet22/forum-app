import { useToast } from "@/context/ToastContext";
import { ToastColor } from "@/types/toast";
import { useCallback } from "react";

export const useToaster = () => {
  const { addToast } = useToast();

  const toast = useCallback(
    (message: string, dataColor: ToastColor, duration: number) => {
      addToast({ message, color: dataColor, duration });
    },
    [addToast]
  );

  return {
    toast,
    toastInfo: (msg: string) => toast(msg, "info", 4000),
    toastSuccess: (msg: string) => toast(msg, "success", 6000),
    toastWarning: (msg: string) => toast(msg, "warning", 6500),
    toastDanger: (msg: string) => toast(msg, "danger", 7000),
  };
};
