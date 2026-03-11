import { useState, useEffect, useCallback } from "react";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggle = useCallback(() => {
    const overlay = document.createElement("div");
    overlay.style.cssText =
      "position:fixed;inset:0;z-index:9999;pointer-events:none;" +
      "background:" + (isDark ? "#fafafa" : "#0a0a0a") + ";" +
      "opacity:0;transition:opacity 0.3s ease";
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      overlay.addEventListener("transitionend", () => {
        setIsDark((prev) => !prev);
        requestAnimationFrame(() => {
          overlay.style.opacity = "0";
          overlay.addEventListener("transitionend", () => {
            overlay.remove();
          }, { once: true });
        });
      }, { once: true });
    });
  }, [isDark]);

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      aria-pressed={isDark}
      style={{
        padding: "0.375rem",
        background: "transparent",
        border: "1px solid var(--p-border)",
        borderRadius: "6px",
        cursor: "pointer",
        color: "var(--p-text-muted)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "color 0.2s ease, border-color 0.2s ease",
        width: "32px",
        height: "32px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--p-text)";
        e.currentTarget.style.borderColor = "var(--p-text-muted)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--p-text-muted)";
        e.currentTarget.style.borderColor = "var(--p-border)";
      }}
    >
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
};

export default DarkModeToggle;
