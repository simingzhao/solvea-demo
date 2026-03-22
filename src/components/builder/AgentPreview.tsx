"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AgentConfig } from "@/lib/types";
import { useAppStore } from "@/stores/app-store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  MessageSquare,
  Sparkles,
  Globe,
  PenLine,
  X,
  BookOpen,
  Wrench,
} from "lucide-react";

interface AgentPreviewProps {
  config: AgentConfig | null;
}

export function AgentPreview({ config }: AgentPreviewProps) {
  const router = useRouter();
  const { setCurrentAgent } = useAppStore();
  const [editingPrompt, setEditingPrompt] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState("");

  if (!config) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
          <Sparkles className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700">
          Agent Preview
        </h3>
        <p className="text-sm text-gray-500 mt-2 max-w-xs">
          Start chatting with the builder to create your AI agent. The preview
          will appear here as it&apos;s generated.
        </p>
      </div>
    );
  }

  function handleSave() {
    if (!config) return;
    const finalConfig = editingPrompt
      ? { ...config, systemPrompt: editedPrompt }
      : config;
    setCurrentAgent(finalConfig);
    router.push("/playground");
  }

  function handleEditPrompt() {
    if (!config) return;
    setEditedPrompt(config.systemPrompt);
    setEditingPrompt(true);
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-3xl">
            {config.avatar || "🤖"}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-gray-900">{config.name}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{config.persona}</p>
          </div>
        </div>

        {/* Behavior */}
        <div className="bg-indigo-50 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-indigo-700">
            <MessageSquare className="h-4 w-4" />
            Greeting
          </div>
          <p className="text-sm text-indigo-900">{config.behavior.greeting}</p>
          <div className="flex gap-3 text-xs text-indigo-600 pt-1">
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {config.behavior.language}
            </span>
            <span>Tone: {config.behavior.tone}</span>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Skills ({config.skills.length})
          </h3>
          <div className="space-y-2">
            {config.skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-start gap-2 p-3 rounded-lg bg-gray-50 border border-gray-100"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {skill.name}
                  </p>
                  <p className="text-xs text-gray-500">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Conversations */}
        {config.sampleConversations.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Sample Conversations
            </h3>
            <div className="space-y-3">
              {config.sampleConversations.map((conv, i) => (
                <div key={i} className="rounded-lg bg-gray-50 border border-gray-100 p-3 space-y-2">
                  <div className="flex gap-2">
                    <span className="text-xs font-medium text-gray-500 bg-gray-200 px-1.5 py-0.5 rounded">User</span>
                    <p className="text-sm text-gray-700">{conv.userMessage}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs font-medium text-indigo-500 bg-indigo-100 px-1.5 py-0.5 rounded">Agent</span>
                    <p className="text-sm text-gray-700">{conv.agentResponse}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Knowledge Sources */}
        {config.suggestedKnowledgeSources.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Suggested Knowledge Sources
            </h3>
            <div className="space-y-1.5">
              {config.suggestedKnowledgeSources.map((src, i) => (
                <div
                  key={i}
                  className="text-sm text-gray-600 flex items-center gap-2"
                >
                  <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded uppercase">
                    {src.type}
                  </span>
                  {src.description}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* System Prompt Editor */}
        <div>
          {editingPrompt ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700">
                  System Prompt
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingPrompt(false)}
                >
                  <X className="h-3.5 w-3.5 mr-1" />
                  Cancel
                </Button>
              </div>
              <Textarea
                value={editedPrompt}
                onChange={(e) => setEditedPrompt(e.target.value)}
                className="min-h-[200px] text-sm font-mono"
              />
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={handleEditPrompt}
              className="w-full"
            >
              <PenLine className="h-3.5 w-3.5 mr-2" />
              Edit System Prompt
            </Button>
          )}
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-base"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Looks Good — Test in Playground
        </Button>
      </div>
    </div>
  );
}
