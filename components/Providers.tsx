"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./Language";
import { Motion } from "./Motion";
import { ToastProvider } from "./Toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SessionProvider>
        <LanguageProvider>
          <ToastProvider>
            <Motion />
            {children}
          </ToastProvider>
        </LanguageProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
