import { query } from "@anthropic-ai/claude-agent-sdk";
import { BUILDER_SYSTEM_PROMPT } from "@/lib/builder-prompt";

export const maxDuration = 120;

export async function POST(req: Request) {
  const { messages, apiKey } = await req.json();

  if (!apiKey || typeof apiKey !== "string") {
    return new Response(JSON.stringify({ error: "API key required" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Build the prompt from the last user message
  const lastUserMessage = messages
    .filter((m: { role: string }) => m.role === "user")
    .pop();

  if (!lastUserMessage) {
    return new Response(JSON.stringify({ error: "No user message" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Build conversation context for the prompt
  const conversationContext = messages
    .map((m: { role: string; content: string }) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n\n");

  const prompt = messages.length > 1
    ? `Here is the conversation so far:\n\n${conversationContext}\n\nContinue the conversation. Respond to the user's latest message.`
    : lastUserMessage.content;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const q = query({
          prompt,
          options: {
            systemPrompt: BUILDER_SYSTEM_PROMPT,
            allowedTools: ["WebSearch", "WebFetch"],
            tools: ["WebSearch", "WebFetch"],
            permissionMode: "bypassPermissions",
            allowDangerouslySkipPermissions: true,
            model: "claude-sonnet-4-6",
            maxTurns: 10,
            env: {
              ...process.env,
              ANTHROPIC_API_KEY: apiKey,
            },
          },
        });

        for await (const message of q) {
          if (message.type === "stream_event") {
            const event = message.event;
            // Handle text deltas from streaming
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              const data = JSON.stringify({ type: "text", text: event.delta.text });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          } else if (message.type === "assistant") {
            // Full assistant message - extract text content
            const textBlocks = message.message.content.filter(
              (b: { type: string }) => b.type === "text"
            );
            for (const block of textBlocks) {
              if ("text" in block) {
                const data = JSON.stringify({ type: "text_complete", text: block.text });
                controller.enqueue(encoder.encode(`data: ${data}\n\n`));
              }
            }
          } else if (message.type === "result") {
            const data = JSON.stringify({ type: "done" });
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        const data = JSON.stringify({ type: "error", error: errorMessage });
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
