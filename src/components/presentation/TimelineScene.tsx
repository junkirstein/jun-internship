import { months, timeline } from "@/content/presentation";
import { useEffect, useRef, useState } from "react";

export function TimelineScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const nodes = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>("[data-month]") ?? [],
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      const target = window.innerHeight * 0.45;
      let best = 0;
      let bestDist = Infinity;
      nodes.forEach((n, i) => {
        const r = n.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - target);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="timeline" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <header>
          <p className="eyebrow">{timeline.eyebrow}</p>
          <h2 className="mt-3 text-[clamp(2rem,5.5vw,3.4rem)] leading-[1.05]">{timeline.title}</h2>
          <p className="mt-3 text-sm text-muted-foreground">{timeline.hint}</p>
        </header>

        <div ref={containerRef} className="relative mt-14 pl-10 md:pl-16">
          <div className="absolute left-[13px] top-2 bottom-2 w-px bg-foreground/12 md:left-[21px]" />
          <div
            className="absolute left-[13px] top-2 w-px bg-primary transition-all duration-500 md:left-[21px]"
            style={{ height: `${((active + 0.5) / months.length) * 100}%` }}
          />

          {months.map((m, i) => {
            const isActive = i === active;
            const isOpen = open === i;
            return (
              <div key={m.month} data-month className="relative pb-12 last:pb-0">
                <span
                  className={`absolute -left-10 top-1.5 grid place-items-center rounded-full transition-all duration-500 md:-left-16 ${
                    isActive ? "h-4 w-4 bg-primary" : "h-3 w-3 bg-background ring-1 ring-foreground/20"
                  }`}
                  style={{ marginLeft: isActive ? 4 : 5 }}
                >
                  {isActive && (
                    <span
                      className="absolute h-4 w-4 rounded-full bg-primary"
                      style={{ animation: "pulse-ring 1.8s ease-out infinite" }}
                    />
                  )}
                </span>

                <div
                  className="transition-all duration-500"
                  style={{ opacity: isActive ? 1 : 0.45 }}
                >
                  <p
                    className={`text-[0.7rem] uppercase tracking-[0.24em] transition-colors ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {m.month}
                  </p>
                  <h3 className="mt-1.5 text-xl md:text-2xl">{m.theme}</h3>
                  <p className="mt-1.5 max-w-lg text-sm text-muted-foreground">{m.summary}</p>

                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="mt-3 inline-flex items-center gap-1.5 text-[0.78rem] font-medium text-primary underline-offset-4 hover:underline"
                    aria-expanded={isOpen}
                  >
                    {isOpen ? "Show less" : "Learn more"}
                    <span
                      className="transition-transform duration-300"
                      style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                    >
                      ↓
                    </span>
                  </button>

                  <div
                    className="grid overflow-hidden transition-all duration-500"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="min-h-0">
                      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                        {m.details.map((d) => (
                          <li key={d.label} className="panel p-4">
                            <p className="text-[0.65rem] uppercase tracking-[0.18em] text-primary">
                              {d.label}
                            </p>
                            <p className="mt-1.5 text-sm text-muted-foreground">{d.body}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
