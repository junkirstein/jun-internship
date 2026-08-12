import { ending } from "@/content/presentation";
import { useReveal } from "@/hooks/use-scroll-scene";

export function EndingScene() {
  const { ref, shown } = useReveal<HTMLDivElement>(0.3);

  return (
    <section
      id="ending"
      ref={ref}
      className="relative flex min-h-svh items-center overflow-hidden py-24"
    >
      <div className="pointer-events-none absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-accent/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-6 h-80 w-80 rounded-full bg-secondary/50 blur-3xl" />

      <div className="relative mx-auto w-full max-w-4xl px-6 text-center md:px-10">
        <svg
          viewBox="0 0 400 120"
          className="mx-auto h-20 w-full max-w-md text-primary"
          aria-hidden="true"
        >
          <path
            d="M12 100 Q 160 -10 330 44"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="2"
            strokeDasharray="6 9"
          />
          <g
            transform="translate(330 44) rotate(20)"
            style={{ animation: shown ? "pop-in 0.7s 0.4s ease-out both" : undefined }}
          >
            <path d="M-11 0 L10 -6 L4 0 L10 6 Z" fill="currentColor" />
          </g>
        </svg>

        <p
          className="eyebrow mt-6 transition-all duration-700"
          style={{ opacity: shown ? 1 : 0 }}
        >
          {ending.subtitle}
        </p>
        <h2
          className="mt-4 text-[clamp(2.6rem,10vw,6rem)] leading-[0.95] transition-all duration-700"
          style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(24px)" }}
        >
          Thank <span className="italic text-primary">You</span>
        </h2>
        <p
          className="mt-8 text-base text-muted-foreground transition-all delay-200 duration-700 md:text-lg"
          style={{ opacity: shown ? 1 : 0 }}
        >
          {ending.author}
        </p>
        <p
          className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground/80 transition-all delay-300 duration-700"
          style={{ opacity: shown ? 1 : 0 }}
        >
          {ending.note}
        </p>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-12 rounded-full border border-border bg-card px-5 py-2.5 text-sm text-foreground transition-transform hover:-translate-y-0.5 hover:shadow-soft"
        >
          Back to the beginning
        </button>
      </div>
    </section>
  );
}
