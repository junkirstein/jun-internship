import { useEffect, useRef, useState, type CSSProperties } from "react";
import { months } from "@/content/presentation";
import { plateau, useSceneProgress } from "@/hooks/use-scroll-scene";
import { useIsMobile } from "@/hooks/use-mobile";
import { MonthPhotos } from "@/components/presentation/MonthPhotos.tsx";

const STEP = 34; // degrees between cards

// One card per month. Photos live inside the card as a fixed-height,
// swipeable filmstrip, so the number of orbit items and the card size stay
// independent of how many photos a month has.
const items = months.map((m, i) => ({
  month: m,
  index: i,
  gallery: [...(m.images ?? []), ...(m.image ? [m.image] : [])].filter(Boolean),
}));

/** Measures the orbit stage so radius/card width scale with the real box. */
function useStageWidth<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      if (entry) setWidth(entry.contentRect.width);
    });
    ro.observe(el);
    setWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  return { ref, width };
}

export function OrbitScene() {
  const { ref, progress } = useSceneProgress<HTMLDivElement>();
  const { ref: stageRef, width: stageWidth } = useStageWidth<HTMLDivElement>();
  const isMobile = useIsMobile();

  const w = stageWidth || (isMobile ? 360 : 1024);
  // Radius follows the container instead of a hardcoded pixel value, so the
  // orbit never pushes cards off-screen on smaller laptops or phones.
  const RADIUS = Math.round(Math.min(320, Math.max(130, w * 0.42)));
  const cardWidth = Math.round(Math.min(480, w - (isMobile ? 24 : 40)));

  const count = items.length;
  const focus = Math.min(count - 1, plateau(Math.max(0, progress * (count - 1) * 1.12)));
  const activeMonthIndex = Math.round(focus);

  return (
    <section id="orbit" ref={ref} className="scene" style={{ height: `${count * 90 + 60}svh` }}>
      <div className="scene-sticky">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-10">
          <header className="flex items-baseline justify-between gap-4">
            <div>
              <p className="eyebrow">Month by month</p>
              <h2 className="mt-2 text-[clamp(1.6rem,4.5vw,2.6rem)]">Experience the journey</h2>
              <p className="text-muted-foreground md:text-base">Scroll, no swiping</p>
            </div>
            <p className="hidden text-xs text-muted-foreground sm:block">
              {activeMonthIndex + 1} / {months.length}
            </p>
          </header>

          <div className="mt-9 flex flex-wrap justify-center gap-1.5">
            {months.map((m, i) => (
              <span
                key={m.month}
                className={`rounded-full px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.14em] transition-all duration-300 ${
                  i === activeMonthIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-foreground/5 text-muted-foreground"
                }`}
              >
                {m.short}
              </span>
            ))}
          </div>

          {/* Orbit stage - fixed height, overflow-hidden ancestor (.scene-sticky).
              Cards are capped to the stage height and scroll internally. */}
          <div
            ref={stageRef}
            className="relative mt-3 h-[54svh] sm:h-[60svh] md:mt-8 md:h-[70svh]"
            style={{ perspective: "1400px", perspectiveOrigin: "50% 45%" }}
          >
            {items.map(({ month: m, index, gallery }, i) => {
              const d = i - focus;
              const abs = Math.abs(d);
              const angle = d * STEP;
              const rad = (angle * Math.PI) / 180;
              const r2 = (n: number) => Math.round(n * 100) / 100;
              const x = r2(Math.sin(rad) * RADIUS);
              const z = r2((Math.cos(rad) - 1) * RADIUS * 0.85);
              const visible = abs < (isMobile ? 2.2 : 3.2);
              const isFront = abs < 0.5;

              const cardStyle: CSSProperties = {
                width: cardWidth,
                transform: `translateX(-50%) translate3d(${x}px, ${r2(abs * 10)}px, ${z}px) rotateY(${r2(-angle * 0.85)}deg) scale(${r2(1 - abs * 0.04)})`,
                opacity: visible ? r2(Math.max(0, 1 - abs * 0.55)) : 0,
                zIndex: 100 - Math.round(abs * 10),
                boxShadow: isFront ? "var(--shadow-lift)" : "var(--shadow-soft)",
                filter: abs > 0.5 ? `blur(${r2(Math.min(4, (abs - 0.5) * 3))}px)` : "none",
                pointerEvents: isFront ? "auto" : "none",
                transition: "transform 200ms ease-out, opacity 200ms ease-out",
                transformStyle: "preserve-3d",
              };

              return (
                <article
                  key={m.month}
                  aria-hidden={!isFront}
                  className="absolute left-1/2 top-0 flex max-h-full flex-col overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-card p-5 md:p-8"
                  style={cardStyle}
                >
                  <div className="flex shrink-0 items-center justify-between">
                    <p className="eyebrow">{m.month}</p>
                    <span className="font-display text-sm text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-3 shrink-0 text-xl leading-snug md:text-2xl">{m.theme}</h3>

                  {/* Only this region scrolls, so text length can never blow up
                      the card height on short viewports. */}
                  <div className="mt-3 grid min-h-0 flex-1 content-start gap-2.5 overflow-y-auto overscroll-contain pr-0.5">
                    {m.details.map((det) => (
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

                  <MonthPhotos images={gallery} label={m.month} />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
