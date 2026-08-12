import { journey } from "@/content/presentation";
import { useSceneProgress } from "@/hooks/use-scroll-scene";

/** Quadratic bezier helpers for the flight path. */
const P0 = { x: 640, y: 340 };
const C = { x: 460, y: 130 };
const P1 = { x: 262, y: 262 };

function bez(t: number) {
  const mt = 1 - t;
  return {
    x: mt * mt * P0.x + 2 * mt * t * C.x + t * t * P1.x,
    y: mt * mt * P0.y + 2 * mt * t * C.y + t * t * P1.y,
  };
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export function JourneyScene() {
  const { ref, progress } = useSceneProgress<HTMLDivElement>();

  // Story beats
  const flight = ease(clamp01((progress - 0.14) / 0.62));
  const plane = bez(flight);
  const next = bez(Math.min(1, flight + 0.02));
  const angle = (Math.atan2(next.y - plane.y, next.x - plane.x) * 180) / Math.PI;

  const camX = lerp(-150, 130, ease(clamp01((progress - 0.1) / 0.75)));
  const camScale = lerp(1.18, 1.32, ease(clamp01((progress - 0.1) / 0.85)));

  const pinToOpacity = clamp01((flight - 0.72) / 0.2);
  const trail = 470;

  return (
    <section id="journey" ref={ref} className="scene h-[320svh]">
      <div className="scene-sticky">
        <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">
          <header className="relative z-10">
            <p className="eyebrow">{journey.eyebrow}</p>
            <h2 className="mt-3 max-w-xl text-[clamp(2rem,5.5vw,3.6rem)] leading-[1.02]">
              {journey.title}
            </h2>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground md:text-base">
              {journey.caption}
            </p>
          </header>

          <div className="relative mt-6 md:mt-2">
            <svg
              viewBox="0 0 1000 560"
              className="h-[46svh] w-full md:h-[56svh]"
              role="img"
              aria-label="Illustrated map of a flight from Kuching, Sarawak to Petaling Jaya, Selangor"
            >
              <defs>
                <linearGradient id="landGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--secondary)" />
                  <stop offset="100%" stopColor="var(--sage)" stopOpacity="0.55" />
                </linearGradient>
              </defs>

              <g
                style={{
                  transform: `translate(${camX}px, 0) scale(${camScale})`,
                  transformOrigin: "500px 300px",
                  transition: "transform 120ms linear",
                }}
              >
                {/* sea texture */}
                <g opacity="0.5" stroke="var(--sea)" strokeWidth="3" strokeLinecap="round">
                  {[...Array(7)].map((_, i) => (
                    <path
                      key={i}
                      d={`M${330 + (i % 3) * 26} ${170 + i * 48} q 22 -12 44 0 t 44 0`}
                      fill="none"
                    />
                  ))}
                </g>

                {/* Peninsular Malaysia (simplified) */}
                <path
                  d="M232 96 c26 8 40 34 36 62 c-4 30 12 44 16 72 c4 30 -8 48 -22 74 c-14 26 -18 56 -40 66 c-22 10 -34 -12 -30 -38 c4 -28 -6 -44 -6 -72 c0 -34 12 -58 18 -90 c6 -32 4 -66 28 -74 Z"
                  fill="url(#landGrad)"
                  stroke="var(--ink)"
                  strokeOpacity="0.25"
                  strokeWidth="2"
                />

                {/* Borneo / Sarawak (simplified) */}
                <path
                  d="M556 372 c-24 -22 -18 -52 8 -70 c34 -24 62 -56 104 -74 c46 -20 88 -46 140 -44 c44 2 76 22 92 56 c14 30 -6 54 -34 66 c-40 18 -74 12 -114 26 c-44 16 -74 46 -122 56 c-32 6 -56 4 -74 -16 Z"
                  fill="url(#landGrad)"
                  stroke="var(--ink)"
                  strokeOpacity="0.25"
                  strokeWidth="2"
                />

                {/* flight path */}
                <path
                  d={`M${P0.x} ${P0.y} Q ${C.x} ${C.y} ${P1.x} ${P1.y}`}
                  fill="none"
                  stroke="var(--primary)"
                  strokeOpacity="0.28"
                  strokeWidth="2.5"
                  strokeDasharray="7 10"
                  strokeLinecap="round"
                />
                <path
                  d={`M${P0.x} ${P0.y} Q ${C.x} ${C.y} ${P1.x} ${P1.y}`}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={trail}
                  strokeDashoffset={trail * (1 - flight)}
                />

                {/* Kuching pin */}
                <g>
                  <circle cx={P0.x} cy={P0.y} r="7" fill="var(--primary)" />
                  <circle cx={P0.x} cy={P0.y} r="7" fill="none" stroke="var(--primary)" />
                  <text
                    x={P0.x + 14}
                    y={P0.y + 26}
                    fill="var(--ink)"
                    fontSize="19"
                    fontFamily="var(--font-sans)"
                  >
                    Kuching
                  </text>
                </g>

                {/* Petaling Jaya pin */}
                <g opacity={pinToOpacity}>
                  <circle cx={P1.x} cy={P1.y} r="7" fill="var(--primary)" />
                  <circle
                    cx={P1.x}
                    cy={P1.y}
                    r="14"
                    fill="none"
                    stroke="var(--primary)"
                    strokeOpacity="0.4"
                  />
                  <text
                    x={P1.x - 4}
                    y={P1.y - 22}
                    fill="var(--ink)"
                    fontSize="19"
                    fontFamily="var(--font-sans)"
                  >
                    Petaling Jaya
                  </text>
                </g>

                {/* airplane */}
                <g
                  style={{
                    transform: `translate(${plane.x}px, ${plane.y}px) rotate(${angle}deg)`,
                    transition: "transform 120ms linear",
                  }}
                >
                  <path
                    d="M-13 0 L11 -7 L5 0 L11 7 Z"
                    fill="var(--primary)"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
            </svg>

            <div className="mt-4 flex flex-wrap items-stretch justify-between gap-3 text-left md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:items-end">
              <div className="panel flex-1 px-4 py-3">
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {journey.from.note}
                </p>
                <p className="mt-1 text-sm font-medium">{journey.from.label}</p>
              </div>
              <div
                className="panel flex-1 px-4 py-3 transition-all duration-500"
                style={{
                  opacity: pinToOpacity,
                  transform: `translateY(${(1 - pinToOpacity) * 12}px)`,
                }}
              >
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {journey.to.note}
                </p>
                <p className="mt-1 text-sm font-medium">{journey.to.label}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
