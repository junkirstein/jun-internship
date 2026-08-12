import { intro } from "@/content/presentation";

export function IntroScene() {
  return (
    <section id="intro" className="relative min-h-svh overflow-hidden">
      {/* soft ambient shapes */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-secondary/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-accent/40 blur-3xl" />

      <div className="relative mx-auto flex min-h-svh max-w-5xl flex-col justify-center px-6 py-24 md:px-10">
        <p className="eyebrow rise-in" style={{ animationDelay: "0.05s" }}>
          {intro.role}
        </p>

        <h1
          className="rise-in mt-6 text-[clamp(2.6rem,9vw,6.5rem)] leading-[0.95] text-foreground"
          style={{ animationDelay: "0.15s" }}
        >
          My Internship
          <br />
          <span className="italic text-primary">Experience</span>
        </h1>

        <div
          className="rise-in mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="h-px w-16 bg-foreground/20" />
          <p className="text-base text-muted-foreground md:text-lg">{intro.author}</p>
        </div>

        <div
          className="rise-in mt-16 flex items-center gap-3 text-sm text-muted-foreground"
          style={{ animationDelay: "0.5s" }}
        >
          <span className="relative flex h-8 w-5 items-start justify-center rounded-full border border-foreground/20 p-1">
            <span className="h-2 w-1 animate-bounce rounded-full bg-primary" />
          </span>
          {intro.scrollHint}
        </div>

        <div className="float-soft pointer-events-none absolute right-6 top-24 text-primary/70 md:right-16 md:top-32">
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M2.5 13.2 21 4 12.6 21.5l-1.9-6.4-6.4-1.9Z"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinejoin="round"
              fill="currentColor"
              fillOpacity="0.08"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
