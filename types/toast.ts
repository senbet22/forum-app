export type ToastColor = "info" | "success" | "warning" | "danger";

export interface Toast {
  id: string;
  message: string;
  color: ToastColor;
  duration: number;
}

export interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}
