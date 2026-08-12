import { skills } from "@/content/presentation";
import { plateau, useSceneProgress } from "@/hooks/use-scroll-scene";
import { Bug, FlaskConical, Sparkles } from "lucide-react";

const icons = {
  beaker: FlaskConical,
  bug: Bug,
  sparkles: Sparkles,
} as const;

export function SkillsScene() {
  const { ref, progress } = useSceneProgress<HTMLDivElement>();
  const count = skills.items.length;
  // 0..count-1 continuous focus index
  const focus = Math.min(count - 1, plateau(Math.max(0, progress * (count - 1) * 1.2)));

  return (
    <section id="skills" ref={ref} className="scene h-[300svh]">
      <div className="scene-sticky">
        <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
          <header className="text-center">
            <p className="eyebrow">Skills</p>
            <h2 className="mt-3 text-[clamp(2rem,5.5vw,3.4rem)]">{skills.title}</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground md:text-base">
              {skills.subtitle}
            </p>
          </header>

          <div className="relative mx-auto mt-10 h-[46svh] max-w-xl md:h-[42svh]">
            {skills.items.map((item, i) => {
              const d = i - focus; // 0 = focused
              const abs = Math.abs(d);
              const Icon = icons[item.icon as keyof typeof icons] ?? Sparkles;
              return (
                <article
                  key={item.number}
                  className="panel absolute inset-x-0 top-0 p-7 md:p-9"
                  style={{
                    zIndex: 10 + (d >= 0 ? -Math.round(d * 10) : -50),
                    transform:
                      d < 0
                        ? `translateY(${-46 - abs * 26}px) scale(${1 - abs * 0.05})`
                        : `translateY(${d * 26}px) scale(${1 - d * 0.06}) rotate(${d * -1.2}deg)`,
                    opacity:
                      d < 0
                        ? 0
                        : Math.max(0, Math.min(1, 1 - Math.max(0, d - 0.15) * 1.6)) *
                          (d > 1.2 ? 0 : 1) +
                          (d > 0.7 && d < 2.2 ? 0.12 : 0),
                    filter: d > 0.4 ? `blur(${Math.min(3, (d - 0.4) * 4)}px)` : "none",
                    transition: "transform 200ms ease-out, opacity 200ms ease-out",
                    boxShadow: abs < 0.5 ? "var(--shadow-lift)" : "var(--shadow-soft)",
                  }}
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="font-display text-4xl text-primary md:text-5xl">
                      {item.number}
                    </span>
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-secondary/70 text-secondary-foreground">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl md:text-3xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {skills.items.map((s, i) => (
              <span
                key={s.number}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  Math.round(focus) === i ? "w-8 bg-primary" : "w-3 bg-foreground/15"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
