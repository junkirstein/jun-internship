import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Photo presentation for the MonthlyOrbit.
 *
 * - `PhotoStrip` is a fixed-height, horizontally scrollable filmstrip that
 *   lives at the bottom of a month card. Its height never depends on the
 *   images, so cards can never grow tall or clip on small screens.
 * - `PhotoViewer` is a full-screen, swipeable/draggable viewer opened from the
 *   strip. It re-uses the app's own tokens (card, border, radius, shadow) so
 *   it belongs to the existing visual language.
 */

type Props = {
  images: string[];
  label: string;
};

export function MonthPhotos({ images, label }: Props) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  if (images.length === 0) return null;

  return (
    <>
      <div className="mt-4 shrink-0">
        <div className="flex items-center justify-between">
          <p className="text-[0.62rem] uppercase tracking-[0.18em] text-primary">Photos</p>
          <p className="text-[0.62rem] text-muted-foreground">
            
          </p>
        </div>
        <div
          className="mt-2 flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setOpenAt(i)}
              aria-label={`Open ${label} photo ${i + 1}`}
              className="h-16 w-24 shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-background/60 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-20 sm:w-28"
            >
              <img
                src={src}
                alt={`${label} photo ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {openAt !== null && (
        <PhotoViewer
          images={images}
          label={label}
          startIndex={openAt}
          onClose={() => setOpenAt(null)}
        />
      )}
    </>
  );
}

function PhotoViewer({
  images,
  label,
  startIndex,
  onClose,
}: Props & { startIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(startIndex);
  const [drag, setDrag] = useState(0);
  const startX = useRef<number | null>(null);

  const go = useCallback(
    (delta: number) => setIndex((i) => Math.min(images.length - 1, Math.max(0, i + delta))),
    [images.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [go, onClose]);

  const endDrag = () => {
    if (startX.current === null) return;
    if (Math.abs(drag) > 60) go(drag < 0 ? 1 : -1);
    startX.current = null;
    setDrag(0);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${label} photos`}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-3 bg-foreground/70 p-4 backdrop-blur-sm"
      style={{ animation: "rise-in 0.25s cubic-bezier(0.22,1,0.36,1) both" }}
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-3xl flex-col overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-card"
        style={{ boxShadow: "var(--shadow-lift)", maxHeight: "min(80svh, 44rem)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <p className="eyebrow truncate">{label}</p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              {index + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-foreground/5"
            >
              Close
            </button>
          </div>
        </div>

        <div
          className="relative min-h-0 flex-1 touch-pan-y select-none overflow-hidden bg-background/60"
          onPointerDown={(e) => {
            startX.current = e.clientX;
          }}
          onPointerMove={(e) => {
            if (startX.current !== null) setDrag(e.clientX - startX.current);
          }}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
        >
          <img
            key={images[index]}
            src={images[index]}
            alt={`${label} photo ${index + 1}`}
            draggable={false}
            className="mx-auto h-full max-h-[62svh] w-full object-contain"
            style={{
              transform: `translateX(${drag * 0.25}px)`,
              transition: startX.current === null ? "transform 200ms ease-out" : "none",
            }}
          />

          {images.length > 1 && (
            <>
              <ViewerArrow side="left" disabled={index === 0} onClick={() => go(-1)} />
              <ViewerArrow
                side="right"
                disabled={index === images.length - 1}
                onClick={() => go(1)}
              />
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex justify-center gap-1.5 py-3">
            {images.map((src, i) => (
              <button
                key={src + i}
                type="button"
                aria-label={`Photo ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-primary" : "w-1.5 bg-foreground/20"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ViewerArrow({
  side,
  disabled,
  onClick,
}: {
  side: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={side === "left" ? "Previous photo" : "Next photo"}
      className={`absolute top-1/2 -translate-y-1/2 rounded-full border border-border bg-card/90 p-2 text-foreground transition-opacity ${
        side === "left" ? "left-2" : "right-2"
      } ${disabled ? "pointer-events-none opacity-0" : "opacity-90 hover:opacity-100"}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {side === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}
