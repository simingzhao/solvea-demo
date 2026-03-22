"use client";

import { useState } from "react";
import { BuilderChat } from "@/components/builder/BuilderChat";
import { AgentPreview } from "@/components/builder/AgentPreview";
import type { AgentConfig } from "@/lib/types";

export default function BuilderPage() {
  const [config, setConfig] = useState<AgentConfig | null>(null);

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Left: Chat Panel */}
      <div className="flex-1 lg:w-[55%] lg:flex-none border-r border-gray-200 bg-gray-50 flex flex-col min-h-0">
        <div className="border-b border-gray-200 bg-white px-6 py-3">
          <h1 className="text-base font-semibold text-gray-900">
            Agent Builder
          </h1>
          <p className="text-xs text-gray-500">
            Describe your business and I&apos;ll create an AI agent for you
          </p>
        </div>
        <div className="flex-1 min-h-0">
          <BuilderChat onConfigUpdate={setConfig} />
        </div>
      </div>

      {/* Right: Preview Panel */}
      <div className="flex-1 lg:w-[45%] lg:flex-none bg-white flex flex-col min-h-0">
        <div className="border-b border-gray-200 px-6 py-3">
          <h2 className="text-base font-semibold text-gray-900">Preview</h2>
          <p className="text-xs text-gray-500">
            {config
              ? "Your agent configuration"
              : "Will update as the agent is generated"}
          </p>
        </div>
        <div className="flex-1 min-h-0">
          <AgentPreview config={config} />
        </div>
      </div>
    </div>
  );
}
