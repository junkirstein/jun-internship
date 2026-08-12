import { quiz } from "@/content/presentation";
import { useReveal } from "@/hooks/use-scroll-scene";
import { useState } from "react";
import { LocationMap, type MapPoint } from "./LocationMap";

export function QuizScene() {
  const { ref, shown } = useReveal<HTMLDivElement>(0.2);
  const [selected, setSelected] = useState<string | null>(null);

  const correct = quiz.options.find((o) => o.key === quiz.correctKey)!;
  const chosen = quiz.options.find((o) => o.key === selected) ?? null;
  const isCorrect = selected === quiz.correctKey;

  const points: MapPoint[] = chosen
    ? isCorrect
      ? [{ label: correct.label, lat: correct.lat, lng: correct.lng, kind: "actual" }]
      : [
          { label: chosen.label, lat: chosen.lat, lng: chosen.lng, kind: "guess" },
          { label: correct.label, lat: correct.lat, lng: correct.lng, kind: "actual" },
        ]
    : [];

  return (
    <section id="quiz" ref={ref} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <div
          className="transition-all duration-700"
          style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(20px)" }}
        >
          <p className="eyebrow">Quick pause</p>
          <h2 className="mt-3 text-[clamp(1.9rem,5vw,3.2rem)] leading-[1.05]">{quiz.intro}</h2>
          <p className="mt-6 text-lg font-medium md:text-xl">{quiz.question}</p>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {quiz.options.map((o) => {
            const isSelected = selected === o.key;
            const state = !isSelected
              ? "idle"
              : o.key === quiz.correctKey
                ? "correct"
                : "wrong";
            return (
              <button
                key={o.key}
                type="button"
                onClick={() => setSelected(o.key)}
                aria-pressed={isSelected}
                className={`group flex items-center gap-4 rounded-[var(--radius-xl)] border p-4 text-left transition-all duration-500 md:p-5 ${
                  state === "correct"
                    ? "border-success bg-success/10"
                    : state === "wrong"
                      ? "border-destructive bg-destructive/8"
                      : "border-border bg-card hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-soft"
                } ${isSelected ? "sm:col-span-2" : ""} ${
                  selected && !isSelected ? "opacity-55" : ""
                }`}
                style={
                  isSelected
                    ? { animation: "pop-in 0.45s cubic-bezier(.22,1,.36,1) both" }
                    : undefined
                }
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-medium transition-colors ${
                    state === "correct"
                      ? "bg-success text-primary-foreground"
                      : state === "wrong"
                        ? "bg-destructive text-destructive-foreground"
                        : "bg-secondary/70 text-secondary-foreground"
                  }`}
                >
                  {state === "correct" ? "✓" : state === "wrong" ? "✕" : o.key}
                </span>
                <span className="flex-1">
                  <span className="block text-base font-medium md:text-lg">{o.label}</span>
                  {isSelected && (
                    <span
                      className={`mt-1 block text-sm ${
                        state === "correct" ? "text-success" : "text-muted-foreground"
                      }`}
                    >
                      {state === "correct" ? quiz.correctNote : quiz.wrongNote}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Location reveal */}
        <div
          className="grid overflow-hidden transition-all duration-700"
          style={{ gridTemplateRows: chosen ? "1fr" : "0fr", opacity: chosen ? 1 : 0 }}
        >
          <div className="min-h-0">
            <div className="pt-8">
              <p className="eyebrow">Location reveal</p>
              <h3 className="mb-4 mt-2 text-xl md:text-2xl">
                {isCorrect
                  ? `Correct — ${correct.label}`
                  : `Not quite — here is ${chosen?.label} vs ${correct.label}`}
              </h3>
              {chosen && <LocationMap points={points} />}
              {!isCorrect && (
                <button
                  type="button"
                  onClick={() => setSelected(quiz.correctKey)}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Show me the real answer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
