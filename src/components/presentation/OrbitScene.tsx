import { months } from "@/content/presentation";
import { plateau, useSceneProgress } from "@/hooks/use-scroll-scene";
import { useIsMobile } from "@/hooks/use-mobile";

const STEP = 34; // degrees between cards

export function OrbitScene() {
  const { ref, progress } = useSceneProgress<HTMLDivElement>();
  const isMobile = useIsMobile();
  const RADIUS = isMobile ? 150 : 300;
  const count = months.length;
  const focus = Math.min(count - 1, plateau(Math.max(0, progress * (count - 1) * 1.12)));
  const activeIndex = Math.round(focus);

  return (
    <section id="orbit" ref={ref} className="scene" style={{ height: `${count * 90 + 60}svh` }}>
      <div className="scene-sticky">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-10">
          <header className="flex items-baseline justify-between gap-4">
            <div>
              <p className="eyebrow">Month by month</p>
              <h2 className="mt-2 text-[clamp(1.6rem,4.5vw,2.6rem)]">The monthly orbit</h2>
            </div>
            <p className="hidden text-xs text-muted-foreground sm:block">
              {activeIndex + 1} / {count}
            </p>
          </header>

          {/* orbit stage */}
          <div
            className="relative mt-6 h-[62svh] md:mt-8"
            style={{ perspective: "1400px", perspectiveOrigin: "50% 45%" }}
          >
            {months.map((m, i) => {
              const d = i - focus;
              const abs = Math.abs(d);
              const angle = d * STEP;
              const rad = (angle * Math.PI) / 180;
              const r2 = (n: number) => Math.round(n * 100) / 100;
              const x = r2(Math.sin(rad) * RADIUS);
              const z = r2((Math.cos(rad) - 1) * RADIUS * 0.85);
              const visible = abs < (isMobile ? 2.2 : 3.2);
              const isFront = abs < 0.5;

              return (
                <article
                  key={m.month}
                  aria-hidden={!isFront}
                  className="absolute left-1/2 top-0 w-[min(92vw,30rem)] rounded-[var(--radius-2xl)] border border-border bg-card p-6 md:p-8"
                  style={{
                    transform: `translateX(-50%) translate3d(${x}px, ${r2(abs * 10)}px, ${z}px) rotateY(${r2(-angle * 0.85)}deg) scale(${r2(1 - abs * 0.04)})`,
                    opacity: visible ? r2(Math.max(0, 1 - abs * 0.55)) : 0,
                    zIndex: 100 - Math.round(abs * 10),
                    boxShadow: isFront ? "var(--shadow-lift)" : "var(--shadow-soft)",
                    filter: abs > 0.5 ? `blur(${r2(Math.min(4, (abs - 0.5) * 3))}px)` : "none",
                    pointerEvents: isFront ? "auto" : "none",
                    transition: "transform 200ms ease-out, opacity 200ms ease-out",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <p className="eyebrow">{m.month}</p>
                    <span className="font-display text-sm text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl leading-snug md:text-2xl">{m.theme}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{m.summary}</p>

                  <div className="mt-5 grid gap-2.5">
                    {m.details.slice(0, 3).map((det) => (
                      <div
                        key={det.label}
                        className="rounded-xl border border-border/70 bg-background/60 px-4 py-3"
                      >
                        <p className="text-[0.62rem] uppercase tracking-[0.18em] text-primary">
                          {det.label}
                        </p>
                        <p className="mt-1 text-[0.84rem] leading-relaxed text-muted-foreground">
                          {det.body}
                        </p>
                      </div>
                    ))}
                  </div>

                  {m.image ? (
                    <img
                      src={m.image}
                      alt={`${m.month} — ${m.theme}`}
                      loading="lazy"
                      className="mt-4 h-32 w-full rounded-xl object-cover"
                    />
                  ) : (
                    <div className="mt-4 grid h-20 place-items-center rounded-xl border border-dashed border-border text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                      [Photo / screenshot]
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {months.map((m, i) => (
              <span
                key={m.month}
                className={`rounded-full px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.14em] transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-foreground/5 text-muted-foreground"
                }`}
              >
                {m.short}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
