"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";
import { KeyRound, AlertCircle } from "lucide-react";

export function ApiKeyDialog() {
  const { apiKey, setApiKey } = useAppStore();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const isOpen = apiKey === null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();

    if (!trimmed.startsWith("sk-ant-")) {
      setError("API key must start with sk-ant-");
      return;
    }
    if (trimmed.length < 20) {
      setError("API key seems too short");
      return;
    }

    setError("");
    setApiKey(trimmed);
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-indigo-600" />
            Enter your Anthropic API Key
          </DialogTitle>
          <DialogDescription>
            Your key is stored locally in your browser and never sent to our
            servers. It&apos;s used to power the AI agent directly from your account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="sk-ant-api03-..."
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError("");
              }}
              className="font-mono text-sm"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {error}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
            Save & Continue
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Get your key at{" "}
            <span className="font-medium">console.anthropic.com</span>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
