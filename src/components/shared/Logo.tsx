import { Sparkles } from "lucide-react";

export function Logo({ size = "default" }: { size?: "default" | "large" }) {
  const iconSize = size === "large" ? 28 : 20;
  const textClass =
    size === "large" ? "text-2xl" : "text-lg";

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white">
        <Sparkles size={iconSize} />
      </div>
      <span className={`font-bold tracking-tight ${textClass}`}>
        Solvea
      </span>
    </div>
  );
}
