/* ─────────────────────────────────────────────────────────────────────────────
   MarqueeStrip — full-width ticker sitting immediately below the Hero.
   Two tracks: forward (28 s, default) + reverse (22 s, opposite direction).
   Pure CSS — no "use client", no Framer Motion. Pause on hover via Tailwind
   group-hover utility.
───────────────────────────────────────────────────────────────────────────── */

const INDUSTRIES = [
  "QSR",
  "Healthcare",
  "Real Estate",
  "FMCG",
  "Architecture",
  "Media",
  "Hospitality",
  "Education",
  "Automotive",
  "Fitness",
] as const;

/* Separator rendered between every item */
function Sep() {
  return (
    <span aria-hidden="true" className="mx-6 text-ink/60 text-xl select-none">
      ◆
    </span>
  );
}

/* One full pass of industry labels + separators */
function ItemList() {
  return (
    <>
      {INDUSTRIES.map((name, i) => (
        <span key={i} className="inline-flex items-center">
          <span className="font-display text-2xl tracking-[0.12em] uppercase text-ink whitespace-nowrap">
            {name}
          </span>
          <Sep />
        </span>
      ))}
    </>
  );
}

export default function MarqueeStrip() {
  return (
    /* aria-hidden: content is decorative — industries are listed in Services section */
    <div aria-hidden="true" className="w-full bg-lime overflow-hidden">

      {/* ── Track 1 — left-to-right (default marquee direction) ── */}
      <div className="group border-b border-ink/10 py-4 overflow-hidden">
        {/*
          Two copies of ItemList in a single flex container.
          `.animate-marquee` scrolls exactly -50% (one copy width), then
          jumps back to 0 — creating a seamless infinite loop.
          `group-hover:[animation-play-state:paused]` freezes on hover.
        */}
        <div
          className="animate-marquee group-hover:[animation-play-state:paused]"
          aria-hidden="true"
        >
          <ItemList />
          <ItemList />
        </div>
      </div>

      {/* ── Track 2 — right-to-left (reverse + faster speed) ── */}
      <div className="group py-4 overflow-hidden">
        <div
          className="animate-marquee group-hover:[animation-play-state:paused]"
          style={{
            animationDirection: "reverse",
            animationDuration: "22s",
          }}
          aria-hidden="true"
        >
          <ItemList />
          <ItemList />
        </div>
      </div>

    </div>
  );
}
