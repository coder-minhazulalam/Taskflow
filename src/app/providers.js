"use client";

import { ToastProvider } from "@heroui/react";

export function Providers({ children }) {
  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  );
}
