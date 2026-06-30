import TerminalDemo from "@/components/TerminalDemo";
import InstallTabs from "@/components/InstallTabs";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Steps />
        <DiffSection />
        <AuditSection />
        <InstallSection />
      </main>
      <Footer />
    </>
  );
}

function Nav() {
  return (
    <header className="border-b border-paper-line">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <a href="#" className="font-display text-sm font-bold tracking-tight text-ink">
          tidy<span className="text-amber">-</span>deps
        </a>
        <nav className="hidden gap-8 font-code text-xs text-ink-dim sm:flex">
          <a className="focus-ring transition-colors hover:text-ink" href="#workflow">
            workflow
          </a>
          <a className="focus-ring transition-colors hover:text-ink" href="#what-it-removes">
            what it removes
          </a>
          <a className="focus-ring transition-colors hover:text-ink" href="#audit">
            audit
          </a>
          <a className="focus-ring transition-colors hover:text-ink" href="#install">
            install
          </a>
        </nav>
        <a
          href="https://www.npmjs.com/package/tidy-deps"
          target="_blank"
          rel="noreferrer"
          className="focus-ring rounded border border-paper-line px-3 py-1.5 font-code text-xs text-ink-dim transition-colors hover:border-amber hover:text-amber"
        >
          v2.0.2 on npm ↗
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-20 pt-16 sm:pt-24">
      <p className="font-code text-xs tracking-widest text-ink-dim">
        Local-first · MIT · v2.0.2
      </p>
      <div className="mt-6 grid items-start gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            Stop shipping
            <br />
            dependencies
            <br />
            you don&apos;t use.
          </h1>
          <p className="mt-6 max-w-md font-body text-base leading-relaxed text-ink-dim">
            tidy-deps scans your project, finds the packages nothing imports,
            and lets you remove them on the spot — then checks what&apos;s
            left for outdated, deprecated, and risky-licensed packages. No
            servers, no accounts, everything stays on your machine.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#install"
              className="focus-ring rounded bg-amber px-5 py-3 font-code text-sm font-medium text-paper transition-opacity hover:opacity-90"
            >
              Get started
            </a>
            <a
              href="https://www.npmjs.com/package/tidy-deps"
              target="_blank"
              rel="noreferrer"
              className="focus-ring rounded border border-paper-line px-5 py-3 font-code text-sm text-ink-dim transition-colors hover:border-ink-dim hover:text-ink"
            >
              View on npm
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-paper-line pt-6 font-code text-xs text-ink-dim">
            <div>
              <dt className="text-ink-dim">runs on</dt>
              <dd className="mt-1 text-ink">npm · yarn · pnpm · bun</dd>
            </div>
            <div>
              <dt className="text-ink-dim">requires</dt>
              <dd className="mt-1 text-ink">Node.js ≥ 16</dd>
            </div>
            <div>
              <dt className="text-ink-dim">license</dt>
              <dd className="mt-1 text-ink">MIT</dd>
            </div>
          </dl>
        </div>
        <TerminalDemo />
      </div>
    </section>
  );
}

const STEPS = [
  {
    n: "01",
    cmd: "npx tidy-deps",
    title: "Scan",
    body: "Walks your source files and cross-references every import against dependencies and devDependencies.",
  },
  {
    n: "02",
    cmd: "1,3 / all / none",
    title: "Choose",
    body: "Review what's unused and decide what goes — package by package, all at once, or not at all.",
  },
  {
    n: "03",
    cmd: "npx tidy-deps --audit",
    title: "Audit",
    body: "Check what's left for outdated versions, deprecated packages, risky licenses, and lockfile drift.",
  },
];

function Steps() {
  return (
    <section id="workflow" className="border-t border-paper-line">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Three commands
        </h2>
        <p className="mt-3 max-w-lg font-body text-ink-dim">
          That&apos;s the whole workflow — scan, choose, and audit what
          survives. Nothing runs without you confirming it.
        </p>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.n}>
              <p className="font-display text-sm font-bold text-amber">
                {step.n}
              </p>
              <p className="mt-3 font-code text-xs text-ink-dim">
                {step.cmd}
              </p>
              <p className="mt-2 font-display text-base font-bold text-ink">
                {step.title}
              </p>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink-dim">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type DiffRow = {
  marker: "-" | " ";
  text: string;
  note?: string;
};

const DIFF_ROWS: DiffRow[] = [
  { marker: " ", text: '"express": "^4.19.2",' },
  { marker: "-", text: '"@yarnpkg/lockfile": "^1.1.0",', note: "no longer imported anywhere" },
  { marker: " ", text: '"prisma": "^6.1.0",' },
  { marker: "-", text: '"chalk": "^5.0.0",', note: "unused after CLI refactor" },
  { marker: " ", text: '"resend": "^4.0.0",' },
  { marker: "-", text: '"yaml": "^2.8.1",', note: "config moved to JSON" },
];

function DiffSection() {
  return (
    <section id="what-it-removes" className="border-t border-paper-line">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          What it removes
        </h2>
        <p className="mt-3 max-w-lg font-body text-ink-dim">
          tidy-deps checks both{" "}
          <code className="font-code text-sm text-ink">dependencies</code> and{" "}
          <code className="font-code text-sm text-ink">devDependencies</code>{" "}
          against what your code actually imports — anything declared but
          unused gets flagged.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-lg border border-paper-line bg-paper-raised">
            <div className="border-b border-paper-line px-4 py-2.5 font-code text-xs text-ink-dim">
              package.json
            </div>
            <pre className="overflow-x-auto px-4 py-4 font-code text-[13px] leading-7 sm:text-sm">
              {DIFF_ROWS.map((row, i) => (
                <div
                  key={i}
                  className={
                    row.marker === "-"
                      ? "bg-brick-soft text-brick"
                      : "text-ink-dim"
                  }
                >
                  <span className="select-none">{row.marker} </span>
                  {row.text}
                  {row.note && (
                    <span className="ml-3 text-xs text-ink-dim">
                      {`// ${row.note}`}
                    </span>
                  )}
                </div>
              ))}
            </pre>
          </div>

          <ul className="space-y-6">
            <Capability
              title="Selective removal"
              body="Review the list and choose exactly which packages go — by number, all at once, or none."
            />
            <Capability
              title="Cross-manager support"
              body="Detects whether you're on npm, yarn, pnpm, or bun and reads the right lockfile automatically."
            />
            <Capability
              title="Skip-the-prompt mode"
              body="Run with --no-remove to see what's unused without touching package.json — useful in CI."
            />
            <Capability
              title="Zero config"
              body="No setup file, no schema to learn. Point it at a project and it works."
            />
          </ul>
        </div>
      </div>
    </section>
  );
}

function Capability({ title, body }: { title: string; body: string }) {
  return (
    <li className="border-l-2 border-paper-line pl-5">
      <p className="font-display text-sm font-bold text-ink">{title}</p>
      <p className="mt-1.5 font-body text-sm leading-relaxed text-ink-dim">
        {body}
      </p>
    </li>
  );
}

function AuditSection() {
  return (
    <section id="audit" className="border-t border-paper-line">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="font-code text-xs tracking-widest text-moss">
              $ npx tidy-deps --audit
            </p>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              A full health check, not just a cleanup.
            </h2>
            <p className="mt-4 max-w-md font-body leading-relaxed text-ink-dim">
              Audit mode goes further than usage — it checks every dependency
              against the registry itself.
            </p>
            <ul className="mt-6 space-y-3 font-body text-sm text-ink-dim">
              <AuditItem label="Outdated" desc="patch, minor, and major versions available" />
              <AuditItem label="Deprecated" desc="packages flagged by their own authors" />
              <AuditItem label="Licenses" desc="risky copyleft terms — GPL, AGPL, LGPL" />
              <AuditItem label="Lockfile" desc="drift between the lockfile and package.json" />
            </ul>
          </div>

          <div className="overflow-x-auto rounded-lg border border-terminal-line bg-terminal p-5 font-code text-[12px] leading-6 text-terminal-text sm:text-[13px]">
            <p className="text-terminal-dim">🔍 Running audit...</p>
            <p className="mt-2 text-moss">
              ✔ [████████████████████] 100% — done
            </p>
            <pre className="mt-4 text-terminal-dim">{`┌─ Outdated ─────────────────────────────────────────────┐
│  `}<span className="text-brick">MAJOR</span>{`    commander            ^12.1.0 → 15.0.0        │
│  `}<span className="text-amber">MINOR</span>{`    chalk                ^5.0.0  → 5.6.2         │
└────────────────────────────────────────────────────────┘`}</pre>
            <pre className="mt-3 text-terminal-dim">{`┌─ Summary ──────────────────────────────────────────────┐
│  `}<span className="text-brick">5 errors</span>{` · `}<span className="text-amber">3 warnings</span>{` · 0 info                        │
└────────────────────────────────────────────────────────┘`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function AuditItem({ label, desc }: { label: string; desc: string }) {
  return (
    <li className="flex gap-3">
      <span className="font-code text-xs font-medium text-ink">{label}</span>
      <span className="text-ink-dim">— {desc}</span>
    </li>
  );
}

function InstallSection() {
  return (
    <section id="install" className="border-t border-paper-line">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Run it once. No install required.
        </h2>
        <p className="mt-3 max-w-lg font-body text-ink-dim">
          tidy-deps is built to run with your package manager&apos;s
          execute-on-demand command — nothing to add to your project.
        </p>
        <div className="mt-8">
          <InstallTabs />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-paper-line">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-6 py-8 font-code text-xs text-ink-dim sm:flex-row sm:items-center">
        <p>MIT © 2026 Tariq Yunusa</p>
        <div className="flex gap-6">
          <a
            href="https://www.npmjs.com/package/tidy-deps"
            target="_blank"
            rel="noreferrer"
            className="focus-ring transition-colors hover:text-ink"
          >
            npm ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
