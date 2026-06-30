"use client";

import { useEffect, useRef, useState } from "react";

type Line = {
  text: string;
  tone?: "default" | "muted" | "brick" | "moss" | "amber";
  delay?: number;
  typeSpeed?: number;
};

const RUNNERS = [
  { id: "npm", label: "npm", run: "npx tidy-deps" },
  { id: "yarn", label: "yarn", run: "yarn dlx tidy-deps" },
  { id: "pnpm", label: "pnpm", run: "pnpm dlx tidy-deps" },
  { id: "bun", label: "bun", run: "bunx tidy-deps" },
] as const;

type RunnerId = (typeof RUNNERS)[number]["id"];

function buildSession(run: string): Line[] {
  return [
    { text: `$ ${run}`, tone: "amber", typeSpeed: 32 },
    { text: "", delay: 200 },
    { text: "Detected package manager: npm", tone: "muted", delay: 300, typeSpeed: 0 },
    { text: "", delay: 150 },
    { text: "Found 3 unused dependencies:", typeSpeed: 0, delay: 100 },
    { text: "", delay: 80 },
    { text: "  · @yarnpkg/lockfile", tone: "brick", typeSpeed: 0, delay: 60 },
    { text: "  · chalk", tone: "brick", typeSpeed: 0, delay: 60 },
    { text: "  · yaml", tone: "brick", typeSpeed: 0, delay: 60 },
    { text: "", delay: 150 },
    { text: 'Enter numbers to remove (e.g. 1,3) or "all" or "none":', tone: "muted", typeSpeed: 0, delay: 100 },
    { text: "$ all", tone: "amber", delay: 500, typeSpeed: 55 },
    { text: "", delay: 250 },
    { text: "✔ Removed 3 packages — package.json updated", tone: "moss", typeSpeed: 0, delay: 100 },
  ];
}

const toneClass: Record<NonNullable<Line["tone"]>, string> = {
  default: "text-terminal-text",
  muted: "text-terminal-dim",
  brick: "text-brick",
  moss: "text-moss",
  amber: "text-amber",
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function TerminalSession({ run, active }: { run: string; active: boolean }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [session] = useState(() => buildSession(run));

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    async function run() {
      if (prefersReduced) {
        setVisibleLines(session.map((l) => l.text));
        setDone(true);
        return;
      }
      const built: string[] = [];
      for (const line of session) {
        if (cancelled) return;
        if (line.delay) await sleep(line.delay);
        if (line.typeSpeed) {
          let current = "";
          for (const ch of line.text) {
            if (cancelled) return;
            current += ch;
            built[built.length] = current;
            setVisibleLines([...built.slice(0, -1), current]);
            await sleep(line.typeSpeed);
          }
          built[built.length - 1] = line.text;
        } else {
          built.push(line.text);
          setVisibleLines([...built]);
        }
      }
      if (!cancelled) setDone(true);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [active, session]);

  return (
    <div className="min-h-[300px] px-5 py-5 font-code text-[13px] leading-7 sm:text-sm">
      {session.map((line, i) => {
        const text = visibleLines[i];
        if (text === undefined) return null;
        return (
          <div key={i} className={toneClass[line.tone ?? "default"]}>
            {text || "\u00A0"}
          </div>
        );
      })}
      {!done && active && (
        <span className="cursor-blink inline-block h-4 w-2 translate-y-0.5 bg-amber" />
      )}
    </div>
  );
}

export default function TerminalDemo() {
  const [runner, setRunner] = useState<RunnerId>("npm");
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const current = RUNNERS.find((r) => r.id === runner)!;

  return (
    <div
      ref={containerRef}
      className="w-full rounded-lg border border-terminal-line bg-terminal shadow-[0_30px_80px_-30px_rgba(28,26,22,0.35)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-terminal-line px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-brick/70" />
          <span className="h-3 w-3 rounded-full bg-amber/70" />
          <span className="h-3 w-3 rounded-full bg-moss/70" />
        </div>
        <div className="flex gap-1 font-code text-[11px]">
          {RUNNERS.map((r) => (
            <button
              key={r.id}
              onClick={() => setRunner(r.id)}
              className={`focus-ring rounded px-2 py-1 transition-colors ${
                runner === r.id
                  ? "bg-terminal-raised text-terminal-text"
                  : "text-terminal-dim hover:text-terminal-text"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
      <TerminalSession key={runner} run={current.run} active={hasStarted} />
    </div>
  );
}
