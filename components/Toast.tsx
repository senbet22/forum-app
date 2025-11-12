"use client";

import React from "react";
import { ToastColor } from "@/types/toast";
import { Alert } from "@digdir/designsystemet-react";

interface ToastProps {
  dataColor?: ToastColor;
  children: React.ReactNode;
  onClose?: () => void;
  duration?: number;
}

export const ToastComponent: React.FC<ToastProps> = ({ dataColor = "info", children, onClose, duration = 5000 }) => {
  const handleAnimationEnd: React.AnimationEventHandler<HTMLDivElement> = (e) => {
    if (e.animationName === "toast-sequence") {
      onClose?.();
    }
  };

  return (
    <div
      className="toast-sequence"
      onAnimationEnd={handleAnimationEnd}
      style={{ willChange: "transform, opacity", animationDuration: `${duration}ms` }}
    >
      <Alert
        className={`toast toast-${dataColor} flex items-center gap-3 p-4 rounded-lg border shadow-lg`}
        data-color={dataColor}
        role="alert"
        aria-live="polite"
      >
        <div className="flex-1">{children}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-lg cursor-pointer hover:opacity-70 transition-opacity"
            aria-label="Close toast"
          >
            ×
          </button>
        )}
      </Alert>
    </div>
  );
};
