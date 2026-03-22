export interface AgentConfig {
  id: string;
  name: string;
  persona: string;
  avatar: string;
  systemPrompt: string;
  skills: {
    id: string;
    name: string;
    description: string;
    instructions: string;
    toolsRequired: string[];
  }[];
  tools: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  }[];
  behavior: {
    greeting: string;
    handoffTrigger: string;
    language: string;
    tone: string;
  };
  suggestedKnowledgeSources: {
    type: "url" | "text";
    value: string;
    description: string;
  }[];
  sampleConversations: {
    userMessage: string;
    agentResponse: string;
  }[];
}

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  agentId: string;
  channel: "livechat" | "widget" | "playground";
  status: "active" | "resolved" | "needs_human";
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}
