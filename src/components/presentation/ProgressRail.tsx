import { sections } from "@/content/presentation";
import { useEffect, useState } from "react";

export function ProgressRail() {
  const [active, setActive] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      let current = 0;
      els.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (r.top <= mid) current = i;
      });
      setActive(current);
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* Mobile: thin top bar */}
      <div className="fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent md:hidden">
        <div
          className="h-full bg-primary transition-[width] duration-200 ease-out"
          style={{ width: `${pct * 100}%` }}
        />
      </div>
      <div className="pointer-events-none fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 md:block">
        <ul className="flex flex-col gap-3">
          {sections.map((s, i) => (
            <li key={s.id} className="flex items-center gap-3">
              <span
                className={`block rounded-full transition-all duration-500 ${
                  i === active
                    ? "h-2.5 w-2.5 bg-primary"
                    : i < active
                      ? "h-1.5 w-1.5 bg-primary/40"
                      : "h-1.5 w-1.5 bg-foreground/15"
                }`}
              />
              <span
                className={`text-[0.68rem] uppercase tracking-[0.2em] transition-all duration-500 ${
                  i === active ? "text-foreground opacity-100" : "text-muted-foreground opacity-0"
                }`}
              >
                {s.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
