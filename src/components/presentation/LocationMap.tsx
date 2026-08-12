// import mapAsset from "@/assets/malaysia-map.png.asset.json";

export type MapPoint = {
  label: string;
  lat: number;
  lng: number;
  kind: "guess" | "actual";
};

const W = 525;
const H = 240;
const Y0 = 62;


/**
 * Maps lat/lng onto the illustrated Malaysia map artwork.
 * Calibrated from Kuala Lumpur and Kuching on the illustration; Borneo is drawn
 * slightly higher than true scale, so it gets a small vertical offset.
 */
export function projectOnArtwork(lng: number, lat: number) {
  const x = 110.5 + (lng - 101.69) * 21.9;
  const y = 226 + (3.14 - lat) * 36 - (lng > 107 ? 34 : 0);
  return { x, y };
}

/**
 * Location reveal map drawn over the illustrated Malaysia artwork.
 */
export function LocationMap({ points }: { points: MapPoint[] }) {
  const placed = points.map((p) => ({ ...p, ...projectOnArtwork(p.lng, p.lat) }));

  const [a, b] = placed;
  const line = a && b ? { x1: a.x, y1: a.y, x2: b.x, y2: b.y } : null;
  const lineLen = line ? Math.hypot(line.x2 - line.x1, line.y2 - line.y1) : 0;

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-card shadow-soft">
      <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg
          viewBox={`0 ${Y0} ${W} ${H}`}
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="Illustrated map of Malaysia with the selected and actual locations"
        >
          <image
            href="/malaysia-map.png"
            x="0"
            y="62"
            width="525"
            height="240"
          />

          {line && (
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="var(--primary)"
              strokeWidth="1.8"
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
                style={{
                  animation: `pop-in 0.5s ${0.15 + i * 0.25}s cubic-bezier(.22,1,.36,1) both`,
                }}
              >
                <circle cx={p.x} cy={p.y} r="15" fill={color} opacity="0.12" />
                <circle cx={p.x} cy={p.y} r="6" fill={color} stroke="white" strokeWidth="2" />
                <g transform={`translate(${p.x}, ${p.y - 14})`}>
                  <rect
                    x={-(p.label.length * 3.4 + 15) / 2}
                    y={-15}
                    width={p.label.length * 3.4 + 15}
                    height={15}
                    rx={7.5}
                    fill="var(--card)"
                    stroke="var(--border)"
                    strokeWidth="0.8"
                  />
                  <text
                    x="0"
                    y="-4.5"
                    textAnchor="middle"
                    fontSize="8"
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
