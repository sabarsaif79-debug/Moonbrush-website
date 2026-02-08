"use client";

export interface SectionItem {
  label: string;
  id: string;
  color: string;
}

export const sectionItems: SectionItem[] = [
  { label: "Search", id: "search-discover", color: "#93c5fd" },
  { label: "Model", id: "model-understand", color: "#c084fc" },
  { label: "Optimize", id: "optimize-decide", color: "#6ee7b7" },
  { label: "Activate", id: "personalize-activate", color: "#fcd34d" },
];

interface SectionNavProps {
  visible: boolean;
  activeId: string;
  onSelect: (id: string) => void;
}

export default function SectionNav({
  visible,
  activeId,
  onSelect,
}: SectionNavProps) {
  const activeItem = sectionItems.find((s) => s.id === activeId);
  const activeColor = activeItem?.color || "#ffffff";

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          backgroundColor: "rgba(6, 6, 15, 0.85)",
          borderBottom: "1px solid rgba(147, 197, 253, 0.08)",
        }}
      >
        <div
          style={{
            maxWidth: 1300,
            margin: "0 auto",
            padding: "0 clamp(20px, 6vw, 80px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            height: 56,
          }}
        >
          {sectionItems.map(({ label, id, color }) => {
            const isActive = activeId === id;
            return (
              <button
                key={id}
                onClick={() => onSelect(id)}
                style={{
                  background: isActive
                    ? `${color}18`
                    : "transparent",
                  border: isActive
                    ? `1px solid ${color}40`
                    : "1px solid transparent",
                  color: isActive ? color : "rgba(255, 255, 255, 0.45)",
                  padding: "8px 20px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontFamily: "var(--font-body, Outfit, sans-serif)",
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                  boxShadow: isActive
                    ? `0 0 20px ${color}25`
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = color;
                    e.currentTarget.style.background = `${color}10`;
                    e.currentTarget.style.boxShadow = `0 0 15px ${color}20`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.45)";
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
