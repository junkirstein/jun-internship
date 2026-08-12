import { useEffect, useRef, useState } from "react";

/**
 * Returns 0..1 progress of how far a tall "scene" element has been scrolled
 * through, assuming the scene uses a sticky inner viewport.
 */
export function useSceneProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        setProgress(rect.top < 0 ? 1 : 0);
        return;
      }
      const p = Math.min(1, Math.max(0, -rect.top / total));
      setProgress(p);
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
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress };
}

/** Reveals an element once it enters the viewport. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setShown(true);
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, shown };
}

export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

/**
 * Converts a continuous 0..count-1 position into one that rests (plateaus) on
 * each whole index and transitions quickly in between.
 */
export function plateau(pos: number) {
  const i = Math.floor(pos);
  const f = pos - i;
  const t = Math.min(1, Math.max(0, (f - 0.3) / 0.4));
  const eased = t * t * (3 - 2 * t);
  return i + eased;
}
