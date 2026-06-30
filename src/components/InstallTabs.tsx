"use client";

import { useState } from "react";

const MANAGERS = [
  { id: "npm", label: "npm", cmd: "npx tidy-deps" },
  { id: "yarn", label: "yarn", cmd: "yarn dlx tidy-deps" },
  { id: "pnpm", label: "pnpm", cmd: "pnpm dlx tidy-deps" },
  { id: "bun", label: "bun", cmd: "bunx tidy-deps" },
] as const;

export default function InstallTabs() {
  const [active, setActive] = useState<(typeof MANAGERS)[number]["id"]>("npm");
  const [copied, setCopied] = useState(false);
  const current = MANAGERS.find((m) => m.id === active)!;

  async function copy() {
    try {
      await navigator.clipboard.writeText(current.cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable — silently ignore
    }
  }

  return (
    <div className="w-full max-w-xl rounded-lg border border-paper-line bg-paper-raised">
      <div className="flex border-b border-paper-line">
        {MANAGERS.map((m) => (
          <button
            key={m.id}
            onClick={() => setActive(m.id)}
            className={`focus-ring flex-1 cursor-pointer px-4 py-3 font-code text-sm transition-colors ${
              active === m.id
                ? "border-b-2 border-amber bg-paper text-ink"
                : "text-ink-dim hover:text-ink"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-4">
        <code className="font-code text-sm text-ink sm:text-base">
          <span className="text-ink-dim">$ </span>
          {current.cmd}
        </code>
        <button
          onClick={copy}
          className="focus-ring shrink-0 cursor-pointer rounded border border-paper-line px-3 py-1.5 font-code text-xs text-ink-dim transition-colors hover:border-amber hover:text-amber"
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>
    </div>
  );
}
