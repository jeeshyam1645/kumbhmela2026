"use client";

import { createContext, useCallback, useContext, useState } from "react";

type Toast = { id: number; kind: "ok" | "err"; text: string };

const ToastContext = createContext<(text: string, kind?: "ok" | "err") => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((text: string, kind: "ok" | "err" = "ok") => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, kind, text }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 3800);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[60] flex flex-col items-center gap-2 px-4 md:bottom-6" aria-live="polite">
        {toasts.map((toast) => (
          <p
            key={toast.id}
            role="status"
            className={`pointer-events-auto max-w-sm rounded-xl px-4 py-3 text-sm shadow-lg ${
              toast.kind === "err" ? "bg-[#7f1d1d] text-white" : "bg-ink text-cream"
            }`}
          >
            {toast.text}
          </p>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
