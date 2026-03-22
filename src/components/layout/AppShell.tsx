"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { ApiKeyDialog } from "@/components/shared/ApiKeyDialog";
import { useAppStore } from "@/stores/app-store";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { hydrated, hydrate } = useAppStore();
  const isLanding = pathname === "/";

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!hydrated) {
    return null;
  }

  if (isLanding) {
    return <>{children}</>;
  }

  return (
    <>
      <ApiKeyDialog />
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </>
  );
}
