"use client";

export default function Footer() {
  return (
    <footer
      className="py-16 px-[clamp(20px,6vw,80px)]"
      style={{
        borderTop: "1px solid var(--t-border)",
      }}
    >
      <div className="max-w-[1300px] mx-auto">
        <div className="flex flex-wrap justify-between gap-12 mb-16">
          {/* Brand */}
          <div className="flex-[1_1_260px] max-w-[320px]">
            <div
              className="font-display text-xl font-bold mb-4"
              style={{ color: "var(--t-text)" }}
            >
              moonbrush
            </div>
            <p
              className="font-body text-sm leading-[1.7]"
              style={{ color: "var(--t-text-faint)" }}
            >
              Behavioral intelligence that sees people
              clearly — powering precision-targeted
              outcomes at national scale.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4
              className="font-body text-[11px] tracking-[3px] uppercase mb-5"
              style={{ color: "var(--t-accent-soft)" }}
            >
              Platform
            </h4>
            <ul className="space-y-3">
              {[
                "Embedded / API",
                "Moonbrush Platform",
                "Data Portal",
                "Psychographic Modeling",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-body text-sm transition-colors duration-300"
                    style={{ color: "var(--t-text-muted)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color =
                        "var(--t-accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color =
                        "var(--t-text-muted)";
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="font-body text-[11px] tracking-[3px] uppercase mb-5"
              style={{ color: "var(--t-accent-soft)" }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {["About", "Careers", "Press", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="font-body text-sm transition-colors duration-300"
                      style={{ color: "var(--t-text-muted)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color =
                          "var(--t-accent)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color =
                          "var(--t-text-muted)";
                      }}
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4
              className="font-body text-[11px] tracking-[3px] uppercase mb-5"
              style={{ color: "var(--t-accent-soft)" }}
            >
              Legal
            </h4>
            <ul className="space-y-3">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-body text-sm transition-colors duration-300"
                    style={{ color: "var(--t-text-muted)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color =
                        "var(--t-accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color =
                        "var(--t-text-muted)";
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-wrap justify-between items-center gap-4"
          style={{
            borderTop: "1px solid var(--t-border)",
          }}
        >
          <span
            className="font-body text-xs"
            style={{ color: "var(--t-text-faint)" }}
          >
            © {new Date().getFullYear()} Moonbrush Inc. All
            rights reserved.
          </span>
          <div className="flex gap-6">
            {["LinkedIn", "Twitter", "Instagram"].map(
              (social) => (
                <a
                  key={social}
                  href="#"
                  className="font-body text-xs transition-colors duration-300"
                  style={{ color: "var(--t-text-faint)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color =
                      "var(--t-accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color =
                      "var(--t-text-faint)";
                  }}
                >
                  {social}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
