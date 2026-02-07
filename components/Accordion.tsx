"use client";

import { useState, useRef, useEffect } from "react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  delay?: number;
}

function AccordionRow({
  item,
  isOpen,
  onToggle,
  index,
  visible,
  delay,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  visible: boolean;
  delay: number;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  const stagger = delay + index * 0.08;

  return (
    <div
      style={{
        borderBottom: "1px solid var(--t-card-border)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0)"
          : "translateY(20px)",
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${stagger}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${stagger}s`,
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left cursor-pointer group"
        style={{ background: "none", border: "none" }}
      >
        <span
          className="font-display text-[17px] font-semibold pr-4"
          style={{
            color: isOpen ? "var(--t-accent)" : "var(--t-text)",
            transition: "color 0.3s ease",
          }}
        >
          {item.question}
        </span>

        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "1px solid var(--t-card-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            backgroundColor: isOpen
              ? "var(--t-accent-faint)"
              : "transparent",
            transition: "all 0.3s ease",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            style={{
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <line
              x1="7"
              y1="1"
              x2="7"
              y2="13"
              stroke={isOpen ? "var(--t-accent)" : "var(--t-text-muted)"}
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ transition: "stroke 0.3s ease" }}
            />
            <line
              x1="1"
              y1="7"
              x2="13"
              y2="7"
              stroke={isOpen ? "var(--t-accent)" : "var(--t-text-muted)"}
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ transition: "stroke 0.3s ease" }}
            />
          </svg>
        </div>
      </button>

      <div
        style={{
          height,
          overflow: "hidden",
          transition: "height 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          ref={contentRef}
          className="font-body text-[15px] leading-[1.8] pb-6"
          style={{
            color: "var(--t-text-muted)",
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(-8px)",
            transition: "opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s",
          }}
        >
          {item.answer}
        </div>
      </div>
    </div>
  );
}

export default function Accordion({ items, delay = 0 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {items.map((item, i) => (
        <AccordionRow
          key={i}
          item={item}
          index={i}
          isOpen={openIndex === i}
          onToggle={() =>
            setOpenIndex(openIndex === i ? null : i)
          }
          visible={visible}
          delay={delay}
        />
      ))}
    </div>
  );
}
