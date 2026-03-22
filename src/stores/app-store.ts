"use client";

import { create } from "zustand";
import type { AgentConfig } from "@/lib/types";

interface AppState {
  apiKey: string | null;
  currentAgent: AgentConfig | null;
  setApiKey: (key: string | null) => void;
  setCurrentAgent: (agent: AgentConfig | null) => void;
  hydrated: boolean;
  hydrate: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  apiKey: null,
  currentAgent: null,
  hydrated: false,
  setApiKey: (key) => {
    if (key) {
      localStorage.setItem("anthropic-api-key", key);
    } else {
      localStorage.removeItem("anthropic-api-key");
    }
    set({ apiKey: key });
  },
  setCurrentAgent: (agent) => {
    if (agent) {
      localStorage.setItem("current-agent", JSON.stringify(agent));
    } else {
      localStorage.removeItem("current-agent");
    }
    set({ currentAgent: agent });
  },
  hydrate: () => {
    const apiKey = localStorage.getItem("anthropic-api-key");
    const agentJson = localStorage.getItem("current-agent");
    const currentAgent = agentJson ? JSON.parse(agentJson) : null;
    set({ apiKey, currentAgent, hydrated: true });
  },
}));
