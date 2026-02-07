interface LogoProps {
  size?: number;
}

export default function Logo({ size = 36 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle
        cx="18"
        cy="18"
        r="16"
        stroke="rgba(147,197,253,0.6)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M18 4 C12 4, 7 10, 7 18 C7 26, 12 32, 18 32 C14 28, 12 23, 12 18 C12 13, 14 8, 18 4Z"
        fill="rgba(147,197,253,0.4)"
      />
      <circle cx="18" cy="18" r="3" fill="rgba(147,197,253,0.8)" />
    </svg>
  );
}
