"use client";

export default function BackgroundPaths() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute rounded-full blur-[120px] will-change-transform animate-blob-1"
        style={{
          top: "-20%",
          left: "-15%",
          width: "60vw",
          height: "60vw",
          background:
            "radial-gradient(circle at 30% 30%, rgba(196,255,0,0.38), rgba(196,255,0,0) 70%)",
        }}
      />
      <div
        className="absolute rounded-full blur-[140px] will-change-transform animate-blob-2"
        style={{
          top: "15%",
          right: "-20%",
          width: "55vw",
          height: "55vw",
          background:
            "radial-gradient(circle at 50% 50%, rgba(168,217,0,0.30), rgba(168,217,0,0) 70%)",
        }}
      />
      <div
        className="absolute rounded-full blur-[160px] will-change-transform animate-blob-3"
        style={{
          bottom: "-25%",
          left: "15%",
          width: "70vw",
          height: "70vw",
          background:
            "radial-gradient(circle at 50% 50%, rgba(245,240,232,0.10), rgba(245,240,232,0) 70%)",
        }}
      />
      <div
        className="absolute rounded-full blur-[110px] will-change-transform animate-blob-4"
        style={{
          top: "40%",
          left: "35%",
          width: "40vw",
          height: "40vw",
          background:
            "radial-gradient(circle at 50% 50%, rgba(196,255,0,0.18), rgba(196,255,0,0) 70%)",
        }}
      />
    </div>
  );
}
