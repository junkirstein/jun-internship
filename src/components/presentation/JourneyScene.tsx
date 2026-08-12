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

// Map dimensions
const MAP_WIDTH = 1000;
const MAP_HEIGHT = 560;

export function JourneyScene() {
  const { ref, progress } = useSceneProgress<HTMLDivElement>();
  // Temporarily hard-code for testing - REMOVE LATER
  const apiKey = "iJdpqCTruwtXUzj4bNy4";

  // MapTiler parameters - centered between Kuching and Petaling Jaya
  const mapCenter = { lng: 101.5, lat: 3.5 };
  const mapZoom = 6;

  // Generate MapTiler static map URL
  const mapTileUrl = apiKey
    ? `https://api.maptiler.com/maps/basic-v2/static/${mapCenter.lng},${mapCenter.lat},${mapZoom}/${MAP_WIDTH}x${MAP_HEIGHT}@2x.png?key=${apiKey}`
    : null;

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
            {/* MapTiler Background */}
            <div
              className="relative w-full overflow-hidden rounded-lg"
              style={{ aspectRatio: `${MAP_WIDTH} / ${MAP_HEIGHT}` }}
            >
              {mapTileUrl ? (
                <img
                  src={mapTileUrl}
                  alt="Map of Malaysia"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center text-muted-foreground">
                  <p>Map loading... (Add VITE_MAPTILER_API_KEY to .env.local)</p>
                </div>
              )}

              {/* SVG Animation Overlay */}
              <svg
                viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label="Animated flight path from Kuching to Petaling Jaya"
              >
                <g
                  style={{
                    transform: `translate(${camX}px, 0) scale(${camScale})`,
                    transformOrigin: "500px 280px",
                    transition: "transform 120ms linear",
                  }}
                >
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
                      fontWeight="500"
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
                      fontWeight="500"
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
            </div>

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
