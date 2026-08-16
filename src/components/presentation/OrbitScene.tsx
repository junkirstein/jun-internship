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
              <p className="text-muted-foreground md:text-base">Scroll, no swiping</p>
            </div>
            <p className="hidden text-xs text-muted-foreground sm:block"> 
              {activeIndex + 1} / {count}
            </p>
            
          </header>

          {/* orbit stage */}
          <div
            className="relative mt-6 h-[70svh] md:mt-8"
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
                  className="absolute left-1/2 top-0 w-[calc(100vw-2rem)] max-w-[30rem] rounded-[var(--radius-2xl)] border border-border bg-card p-5 md:p-8"
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

                  <div className="mt-1 grid gap-2.5">
                    {m.details.slice(0, isMobile ? 2 : 3).map((det) => (
                      <div
                        key={det.label}
                        className="rounded-xl border border-border/70 bg-background/60 px-3 py-2.5 md:px-4 md:py-3"
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
                  {(() => {
                    const gallery = [...(m.images ?? []), ...(m.image ? [m.image] : [])].slice(0, 3);

                    

                    return (
                      <div
                        
                        className={gallery.length === 1 ? "mt-4" : "mt-4 grid gap-2"}
                        style={{
                          gridTemplateColumns: gallery.length === 1 ? undefined : `repeat(${Math.min(gallery.length,3)}, minmax(0, 1fr))`,
                          
                        }}
                      >
                        {gallery.map((src, idx) => (
                          <img
                            key={`${m.month}-${idx}`}
                            src={src}
                            alt={`${m.month} — ${m.theme} ${idx + 1}`}
                            loading="lazy"
                            className={`w-full rounded-xl object-cover ${
                                        gallery.length === 1
                                          ? "h-30 md:h-50"
                                          : "h-28 md:h-50"
                                      }`}
                          />
                        ))}
                      </div>
                    );
                  })()}
                </article>
              );
            })}
          </div>

          <div className="flex justify-center gap-1.5">
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
