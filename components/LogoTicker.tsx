"use client";

const logos = [
  { name: "CVS Health", file: "cvs-health.png" },
  { name: "San Diego Padres", file: "san-diego-padres.png" },
  { name: "Karl Strauss", file: "karl-strauss.png" },
  { name: "Buc-ee's", file: "buc-ees.png" },
  { name: "Ministry of Hajj and Umrah", file: "ministry-hajj-umrah.png" },
  { name: "Indian Gaming Association", file: "indian-gaming-association.png" },
  { name: "ALDI", file: "aldi.png" },
  { name: "UAE Ministry of Industry", file: "uae-ministry-industry.png" },
  { name: "Dine Brands", file: "dine-brands.png" },
  { name: "KIPP", file: "kipp.png" },
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
          animation: "ticker 35s linear infinite",
          width: "max-content",
        }}
      >
        {doubled.map((logo, i) => (
          <img
            key={`${logo.name}-${i}`}
            src={`/logos/${logo.file}`}
            alt={logo.name}
            style={{
              height: 40,
              width: "auto",
              objectFit: "contain",
              opacity: 0.85,
              transition: "opacity 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "0.7";
            }}
          />
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
