"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/Logo";
import {
  Bot,
  MessageSquare,
  BookOpen,
  Inbox,
  Monitor,
  Settings,
  LogOut,
} from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/builder", label: "Builder", icon: Bot },
  { href: "/playground", label: "Playground", icon: MessageSquare },
  { href: "/knowledge", label: "Knowledge", icon: BookOpen },
  { href: "/inbox", label: "Inbox", icon: Inbox },
  { href: "/widget-demo", label: "Widget Demo", icon: Monitor },
];

export function Sidebar() {
  const pathname = usePathname();
  const { setApiKey } = useAppStore();

  return (
    <aside className="flex h-full w-60 flex-col border-r bg-gray-50/50">
      <div className="flex h-14 items-center px-4 border-b">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-3 space-y-1">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
          <Settings className="h-4 w-4" />
          Settings
        </button>
        <button
          onClick={() => setApiKey(null)}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-red-600 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Reset API Key
        </button>
      </div>
    </aside>
  );
}
