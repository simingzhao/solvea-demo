"use client";

import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  avatar?: string;
  timestamp?: Date;
}

function renderMarkdown(text: string) {
  // Basic markdown: bold, italic, code blocks, inline code, links, lists
  let html = text
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-gray-100 rounded-lg p-3 my-2 overflow-x-auto text-sm font-mono"><code>$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Unordered lists
    .replace(/^[-•] (.+)$/gm, '<li class="ml-4">$1</li>')
    // Numbered lists
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$1</li>')
    // Line breaks
    .replace(/\n/g, "<br />");

  return html;
}

export function MessageBubble({ role, content, avatar, timestamp }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={cn("flex gap-3 max-w-full", isUser && "flex-row-reverse")}>
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
          isUser
            ? "bg-indigo-600 text-white"
            : "bg-gray-100 text-gray-600"
        )}
      >
        {isUser ? "U" : avatar || "🤖"}
      </div>

      {/* Message */}
      <div
        className={cn(
          "rounded-2xl px-4 py-2.5 max-w-[80%] text-sm leading-relaxed",
          isUser
            ? "bg-indigo-600 text-white rounded-tr-md"
            : "bg-white border border-gray-200 text-gray-800 rounded-tl-md"
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <div
            className="prose prose-sm max-w-none [&_pre]:my-2 [&_code]:text-indigo-700"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        )}
        {timestamp && (
          <p
            className={cn(
              "text-[10px] mt-1 opacity-60",
              isUser ? "text-right" : "text-left"
            )}
          >
            {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        )}
      </div>
    </div>
  );
}
