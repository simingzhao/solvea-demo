"use client";

import { useState, useCallback } from "react";
import { ChatWindow, type ChatMessage } from "@/components/chat/ChatWindow";
import { useAppStore } from "@/stores/app-store";
import type { AgentConfig } from "@/lib/types";

interface BuilderChatProps {
  onConfigUpdate: (config: AgentConfig) => void;
}

function extractAgentConfig(text: string): AgentConfig | null {
  const match = text.match(/<agent_config>([\s\S]*?)<\/agent_config>/);
  if (!match) return null;
  try {
    return JSON.parse(match[1].trim());
  } catch {
    return null;
  }
}

function stripConfigTags(text: string): string {
  return text.replace(/<agent_config>[\s\S]*?<\/agent_config>/g, "").trim();
}

let messageIdCounter = 0;
function nextId() {
  return `msg-${Date.now()}-${++messageIdCounter}`;
}

export function BuilderChat({ onConfigUpdate }: BuilderChatProps) {
  const { apiKey } = useAppStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState<string>("");

  const handleSend = useCallback(
    async (content: string) => {
      if (!apiKey) return;

      const userMsg: ChatMessage = {
        id: nextId(),
        role: "user",
        content,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);
      setStreamingContent("");

      // Build messages for API
      const apiMessages = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      try {
        const res = await fetch("/api/builder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiMessages, apiKey }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `HTTP ${res.status}`);
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();
        let accumulated = "";
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          accumulated += decoder.decode(value, { stream: true });
          const lines = accumulated.split("\n\n");
          accumulated = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const jsonStr = line.slice(6);
            try {
              const event = JSON.parse(jsonStr);
              if (event.type === "text") {
                fullText += event.text;
                setStreamingContent(stripConfigTags(fullText));
                // Check for config in streaming text
                const config = extractAgentConfig(fullText);
                if (config) onConfigUpdate(config);
              } else if (event.type === "text_complete") {
                // If we didn't get streaming deltas, use the complete text
                if (!fullText) {
                  fullText = event.text;
                  const config = extractAgentConfig(fullText);
                  if (config) onConfigUpdate(config);
                }
              } else if (event.type === "error") {
                fullText += `\n\n⚠️ Error: ${event.error}`;
              }
            } catch {
              // skip malformed events
            }
          }
        }

        // Finalize message
        const displayText = stripConfigTags(fullText) || fullText;
        if (displayText) {
          const assistantMsg: ChatMessage = {
            id: nextId(),
            role: "assistant",
            content: displayText,
            createdAt: new Date(),
          };
          setMessages((prev) => [...prev, assistantMsg]);
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Something went wrong";
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: "assistant",
            content: `Sorry, I encountered an error: ${errorMessage}. Please try again.`,
            createdAt: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
        setStreamingContent("");
      }
    },
    [apiKey, messages, onConfigUpdate]
  );

  return (
    <ChatWindow
      messages={messages}
      onSend={handleSend}
      isLoading={isLoading}
      streamingContent={streamingContent || undefined}
      placeholder="Describe your business or paste a URL..."
      assistantAvatar="🛠️"
    />
  );
}
