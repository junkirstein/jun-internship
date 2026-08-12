import { useMemo } from "react";

export type MapPoint = {
  label: string;
  lat: number;
  lng: number;
  kind: "guess" | "actual";
};

const W = 900;
const H = 560;
const TILE = 512;

/** Web Mercator projection into pixel space at a given zoom. */
function project(lng: number, lat: number, zoom: number) {
  const scale = TILE * Math.pow(2, zoom);
  const x = ((lng + 180) / 360) * scale;
  const s = Math.sin((lat * Math.PI) / 180);
  const y = (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * scale;
  return { x, y };
}

function fit(points: MapPoint[]) {
  const lngs = points.map((p) => p.lng);
  const lats = points.map((p) => p.lat);
  const center = {
    lng: (Math.min(...lngs) + Math.max(...lngs)) / 2,
    lat: (Math.min(...lats) + Math.max(...lats)) / 2,
  };
  let zoom = 12;
  for (let z = 12; z >= 3; z -= 0.25) {
    const pts = points.map((p) => project(p.lng, p.lat, z));
    const dx = Math.max(...pts.map((p) => p.x)) - Math.min(...pts.map((p) => p.x));
    const dy = Math.max(...pts.map((p) => p.y)) - Math.min(...pts.map((p) => p.y));
    if (dx < W * 0.62 && dy < H * 0.58) {
      zoom = z;
      break;
    }
    zoom = z;
  }
  return { center, zoom: Math.max(4, Math.min(9.5, zoom)) };
}

/**
 * Location reveal map.
 * Uses MapTiler static maps when VITE_MAPTILER_API_KEY is set; otherwise falls
 * back to a simplified illustrated Borneo backdrop. Markers are always drawn by
 * us so the map stays part of the site's design.
 */
export function LocationMap({ points }: { points: MapPoint[] }) {
  const key = import.meta.env["VITE_MAPTILER_API_KEY"] as string | undefined;
  const { center, zoom } = useMemo(() => fit(points), [points]);

  const origin = project(center.lng, center.lat, zoom);
  const placed = points.map((p) => {
    const q = project(p.lng, p.lat, zoom);
    return { ...p, x: q.x - origin.x + W / 2, y: q.y - origin.y + H / 2 };
  });

  const tileUrl = key
    ? `https://api.maptiler.com/maps/dataviz-light/static/${center.lng},${center.lat},${zoom}/${W}x${H}@2x.png?key=${key}`
    : null;

  const [a, b] = placed;
  const line =
    a && b ? { x1: a.x, y1: a.y, x2: b.x, y2: b.y } : null;
  const lineLen = line
    ? Math.hypot(line.x2 - line.x1, line.y2 - line.y1)
    : 0;

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-secondary/30 shadow-soft">
      <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
        {tileUrl ? (
          <img
            src={tileUrl}
            alt="Map showing the selected and actual locations"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <IllustratedBorneo />
        )}

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {line && (
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="var(--primary)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${lineLen}`}
              style={{
                ["--dash-len" as string]: lineLen,
                animation: "dash-draw 1.1s 0.25s ease-out both",
              }}
            />
          )}

          {placed.map((p, i) => {
            const color = p.kind === "actual" ? "var(--success)" : "var(--primary)";
            return (
              <g
                key={p.label + p.kind}
                style={{ animation: `pop-in 0.5s ${0.15 + i * 0.25}s cubic-bezier(.22,1,.36,1) both` }}
              >
                <circle cx={p.x} cy={p.y} r="26" fill={color} opacity="0.12" />
                <circle cx={p.x} cy={p.y} r="10" fill={color} stroke="white" strokeWidth="3.5" />
                <g transform={`translate(${p.x}, ${p.y - 24})`}>
                  <rect
                    x={-(p.label.length * 5.6 + 26) / 2}
                    y={-26}
                    width={p.label.length * 5.6 + 26}
                    height={26}
                    rx={13}
                    fill="var(--card)"
                    stroke="var(--border)"
                  />
                  <text
                    x="0"
                    y="-8"
                    textAnchor="middle"
                    fontSize="13"
                    fontFamily="var(--font-sans)"
                    fill="var(--ink)"
                  >
                    {p.label}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 text-[0.65rem]">
          <Legend color="var(--primary)" text="Your answer" />
          <Legend color="var(--success)" text="Actual hometown" />
        </div>
        {!tileUrl && (
          <p className="absolute right-3 top-3 rounded-full bg-card/90 px-3 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
            Illustrated view
          </p>
        )}
      </div>
    </div>
  );
}

function Legend({ color, text }: { color: string; text: string }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-card/90 px-2.5 py-1 text-muted-foreground">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {text}
    </span>
  );
}

/** Fallback backdrop: simplified Borneo shape, no map UI. */
function IllustratedBorneo() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
      <rect width={W} height={H} fill="var(--sea)" opacity="0.35" />
      <g opacity="0.45" stroke="var(--sea)" strokeWidth="3" fill="none" strokeLinecap="round">
        {[...Array(6)].map((_, i) => (
          <path key={i} d={`M${60 + (i % 2) * 40} ${70 + i * 82} q 26 -14 52 0 t 52 0`} />
        ))}
      </g>
      <path
        d="M120 420 c-30 -40 10 -96 70 -128 c70 -38 130 -104 220 -122 c96 -20 190 -34 268 6 c56 28 78 92 52 140 c-26 48 -92 46 -146 66 c-62 22 -104 76 -180 96 c-84 22 -232 26 -284 -58 Z"
        fill="var(--secondary)"
        stroke="var(--ink)"
        strokeOpacity="0.2"
        strokeWidth="2"
      />
    </svg>
  );
}
