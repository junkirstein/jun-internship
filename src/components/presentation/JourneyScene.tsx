// import mapAsset from "@/assets/malaysia-map.png.asset.json";
import { journey } from "@/content/presentation";
import { useSceneProgress } from "@/hooks/use-scroll-scene";
import { projectOnArtwork } from "./LocationMap";

/** Quadratic bezier helpers for the flight path (map artwork coordinates). */
const P0 = projectOnArtwork(110.34, 1.55); // Kuching
const P1 = projectOnArtwork(101.61, 3.1); // Petaling Jaya
const C = { x: 200, y: 140 };

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

  const camX = lerp(-78, 68, ease(clamp01((progress - 0.1) / 0.75)));
  const camScale = lerp(1.18, 1.32, ease(clamp01((progress - 0.1) / 0.85)));

  const pinToOpacity = clamp01((flight - 0.72) / 0.2);
  const trail = 280;

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
              viewBox="0 55 525 255"
              className="h-[46svh] w-full md:h-[56svh]"
              role="img"
              aria-label="Illustrated map of a flight from Kuching, Sarawak to Petaling Jaya, Selangor"
            >
              <g
                style={{
                  transform: `translate(${camX}px, 0) scale(${camScale})`,
                  transformOrigin: "262px 180px",
                  transition: "transform 120ms linear",
                }}
              >
                {/* map artwork */}
                <image
                  href="/malaysia-map2.png"
                  x="0"
                  y="0"
                  width="525"
                  height="350"
                />

                {/* flight path */}
                <path
                  d={`M${P0.x} ${P0.y} Q ${C.x} ${C.y} ${P1.x} ${P1.y}`}
                  fill="none"
                  stroke="var(--primary)"
                  strokeOpacity="0.28"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  strokeLinecap="round"
                />
                <path
                  d={`M${P0.x} ${P0.y} Q ${C.x} ${C.y} ${P1.x} ${P1.y}`}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeDasharray={trail}
                  strokeDashoffset={trail * (1 - flight)}
                />

                {/* Kuching pin */}
                <g>
                  <circle cx={P0.x} cy={P0.y} r="4" fill="var(--primary)" />
                  <circle
                    cx={P0.x}
                    cy={P0.y}
                    r="8"
                    fill="none"
                    stroke="var(--primary)"
                    strokeOpacity="0.4"
                    strokeWidth="1"
                  />
                  <text
                    x={P0.x + 8}
                    y={P0.y + 14}
                    fill="var(--ink)"
                    fontSize="10"
                    fontFamily="var(--font-sans)"
                  >
                    Kuching
                  </text>
                </g>

                {/* Petaling Jaya pin */}
                <g opacity={pinToOpacity}>
                  <circle cx={P1.x} cy={P1.y} r="4" fill="var(--primary)" />
                  <circle
                    cx={P1.x}
                    cy={P1.y}
                    r="8"
                    fill="none"
                    stroke="var(--primary)"
                    strokeOpacity="0.4"
                    strokeWidth="1"
                  />
                  <text
                    x={P1.x - 2}
                    y={P1.y - 12}
                    fill="var(--ink)"
                    fontSize="10"
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
                    d="M-7 0 L6 -3.8 L2.7 0 L6 3.8 Z"
                    fill="var(--primary)"
                    stroke="var(--primary)"
                    strokeWidth="1.2"
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
