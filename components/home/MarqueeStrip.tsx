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

function Sep({ faint }: { faint?: boolean }) {
  return (
    <span aria-hidden="true" className={`mx-6 text-lg select-none ${faint ? "text-ink/30" : "text-ink/50"}`}>
      ·
    </span>
  );
}

function ItemList({ small }: { small?: boolean }) {
  return (
    <>
      {INDUSTRIES.map((name, i) => (
        <span key={i} className="inline-flex items-center">
          <span
            className={`font-display tracking-[0.12em] uppercase whitespace-nowrap ${
              small ? "text-base text-ink/50" : "text-2xl text-ink"
            }`}
          >
            {name}
          </span>
          <Sep faint={small} />
        </span>
      ))}
    </>
  );
}

export default function MarqueeStrip() {
  return (
    <div className="w-full bg-lime overflow-hidden">
      {/* Label row */}
      <div className="px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 pt-4 pb-1">
        <span className="font-body text-xs uppercase tracking-[0.25em] text-ink/50">
          Industries We&apos;ve Grown
        </span>
      </div>

      {/* Track 1 — forward, full size */}
      <div className="border-t border-ink/10 py-3 overflow-hidden" aria-hidden="true">
        <div className="animate-marquee group-hover:[animation-play-state:paused]">
          <ItemList />
          <ItemList />
        </div>
      </div>

      {/* Track 2 — reverse, smaller + dimmer, creates depth */}
      <div className="py-2 pb-4 overflow-hidden" aria-hidden="true">
        <div className="animate-marquee-reverse">
          <ItemList small />
          <ItemList small />
        </div>
      </div>
    </div>
  );
}
