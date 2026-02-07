"use client";

const logos = [
  "Walmart",
  "Deloitte",
  "NBA",
  "Kroger",
  "Live Nation",
  "Publicis",
  "iHeart",
  "Zillow",
];

export default function LogoTicker() {
  const doubled = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden py-10">
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, var(--t-bg), transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, var(--t-bg), transparent)",
        }}
      />

      <div
        className="flex gap-16 items-center"
        style={{
          animation: "ticker 30s linear infinite",
          width: "max-content",
        }}
      >
        {doubled.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="font-display text-[15px] font-semibold tracking-[2px] uppercase whitespace-nowrap select-none"
            style={{
              color: "var(--t-text-faint)",
              transition: "color 0.5s ease",
            }}
          >
            {name}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
