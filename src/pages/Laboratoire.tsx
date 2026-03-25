import { useState, useRef, useCallback, useEffect } from "react";
import CodePreview from "../components/CodePreview";
import { X } from "lucide-react";
import { useSEO } from "../hooks/useSEO";

/* ---- Experiment 1: Hold to Delete Button ---- */
const HoldToDeleteButton = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [deleted, setDeleted] = useState(false);
  const [pressing, setPressing] = useState(false);

  const handleTransitionEnd = useCallback((e: React.TransitionEvent) => {
    if (e.propertyName !== "clip-path") return;
    const overlay = overlayRef.current;
    if (!overlay) return;
    const clip = getComputedStyle(overlay).clipPath;
    if (clip === "inset(0px)" || clip === "inset(0px 0px 0px 0px)") {
      setDeleted(true);
      setPressing(false);
    }
  }, []);

  const startPress = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if ("touches" in e) e.preventDefault();
    setPressing(true);
  }, []);
  const endPress = useCallback(() => setPressing(false), []);

  if (deleted) {
    return (
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#e5484d", fontWeight: 500, fontSize: "0.9rem", marginBottom: "0.75rem" }}>
          Supprimé !
        </p>
        <button
          onClick={() => setDeleted(false)}
          style={{
            padding: "0.4rem 1rem",
            border: "1px solid var(--p-border)",
            background: "transparent",
            color: "var(--p-text)",
            cursor: "pointer",
            fontSize: "0.8rem",
            borderRadius: "9999px",
          }}
        >
          Réessayer
        </button>
      </div>
    );
  }

  const trashIcon = (
    <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.75 2.75C6.75 2.05964 7.30964 1.5 8 1.5C8.69036 1.5 9.25 2.05964 9.25 2.75V3H6.75V2.75ZM5.25 3V2.75C5.25 1.23122 6.48122 0 8 0C9.51878 0 10.75 1.23122 10.75 2.75V3H12.9201H14.25H15V4.5H14.25H13.8846L13.1776 13.6917C13.0774 14.9942 11.9913 16 10.6849 16H5.31508C4.00874 16 2.92263 14.9942 2.82244 13.6917L2.11538 4.5H1.75H1V3H1.75H3.07988H5.25ZM4.31802 13.5767L3.61982 4.5H12.3802L11.682 13.5767C11.6419 14.0977 11.2075 14.5 10.6849 14.5H5.31508C4.79254 14.5 4.3581 14.0977 4.31802 13.5767Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <button
      ref={btnRef}
      className={`hold-delete-btn${pressing ? " is-pressing" : ""}`}
      onMouseDown={startPress}
      onMouseUp={endPress}
      onMouseLeave={endPress}
      onTouchStart={startPress}
      onTouchEnd={endPress}
      onTouchCancel={endPress}
    >
      <div
        ref={overlayRef}
        className="hold-delete-overlay"
        onTransitionEnd={handleTransitionEnd}
      >
        {trashIcon}
        Hold to Delete
      </div>
      {trashIcon}
      Hold to Delete
    </button>
  );
};

const holdToDeleteCode = `/* CSS */
.button {
  position: relative;
  display: flex;
  height: 40px;
  align-items: center;
  gap: 8px;
  border-radius: 9999px;
  background-color: #f6f5f5;
  padding-inline: 24px;
  font-weight: 500;
  color: #21201c;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: transform 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.hold-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 9999px;
  background-color: #ffdbdc;
  color: #e5484d;
  clip-path: inset(0px 100% 0px 0px);
  transition: clip-path 0.2s ease-out;
}

.button:active .hold-overlay {
  transition: clip-path 1.5s linear;
  clip-path: inset(0px 0px 0px 0px);
}

.button:active {
  transform: scale(0.97);
}

/* HTML */
<button class="button">
  <div class="hold-overlay">
    <TrashIcon /> Hold to Delete
  </div>
  <TrashIcon /> Hold to Delete
</button>

/* JS */
overlay.addEventListener("transitionend", (e) => {
  if (e.propertyName !== "clip-path") return;
  const clip = getComputedStyle(overlay).clipPath;
  if (clip === "inset(0px)") {
    console.log("Delete triggered!");
  }
});`;

/* ---- Experiment 5: Clip-Reveal Theme Transition ---- */
const CLIP_REVEAL_CSS = `
  [data-theme="light"] { --cr-bg: 0 0% 100%; --cr-fg: 240 10% 3.9%; --cr-card: 0 0% 100%; --cr-card-fg: 240 10% 3.9%; --cr-primary: 240 5.9% 10%; --cr-primary-fg: 0 0% 98%; --cr-secondary: 240 4.8% 95.9%; --cr-secondary-fg: 240 5.9% 10%; --cr-muted: 240 4.8% 95.9%; --cr-muted-fg: 240 3.8% 46.1%; --cr-accent: 240 4.8% 95.9%; --cr-accent-fg: 240 5.9% 10%; --cr-border: 240 5.9% 90%; --cr-input: 240 5.9% 90%; }
  [data-theme="dark"] { --cr-bg: 240 10% 3.9%; --cr-fg: 0 0% 98%; --cr-card: 240 10% 3.9%; --cr-card-fg: 0 0% 98%; --cr-primary: 0 0% 98%; --cr-primary-fg: 240 5.9% 10%; --cr-secondary: 240 3.7% 15.9%; --cr-secondary-fg: 0 0% 98%; --cr-muted: 240 3.7% 15.9%; --cr-muted-fg: 240 5% 64.9%; --cr-accent: 240 3.7% 15.9%; --cr-accent-fg: 0 0% 98%; --cr-border: 240 3.7% 15.9%; --cr-input: 240 3.7% 15.9%; }
  .cr-root { position: relative; border-radius: 8px; overflow: hidden; }
  .cr-layer { background: hsl(var(--cr-bg)); color: hsl(var(--cr-fg)); }
  .cr-layer.cr-overlay { position: absolute; inset: 0; z-index: 10; overflow: hidden; pointer-events: none; visibility: hidden; clip-path: inset(0 0 0 0); }
  .cr-layer.cr-overlay.cr-animating { visibility: visible; transition: clip-path 0.75s cubic-bezier(0.65,0,0.35,1); }
  .cr-header { border-bottom: 1px solid hsl(var(--cr-border)); padding: 0.75rem 1rem; display: flex; align-items: center; justify-content: space-between; background: hsl(var(--cr-bg)); }
  .cr-logo { display: flex; align-items: center; gap: 0.4rem; font-weight: 600; font-size: 0.8rem; color: hsl(var(--cr-fg)); }
  .cr-toggle { background: hsl(var(--cr-bg)); border: 1px solid hsl(var(--cr-input)); color: hsl(var(--cr-fg)); border-radius: 6px; width: 32px; height: 32px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.15s; }
  .cr-toggle:hover { transform: scale(1.1); }
  .cr-toggle:active { transform: scale(0.95); }
  .cr-icon-sun { display: none; }
  .cr-icon-moon { display: block; }
  [data-theme="dark"] .cr-icon-sun { display: block; }
  [data-theme="dark"] .cr-icon-moon { display: none; }
  .cr-main { padding: 1rem; }
  .cr-hero h3 { font-size: 1.1rem; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 0.25rem; color: hsl(var(--cr-fg)); }
  .cr-hero p { font-size: 0.8rem; color: hsl(var(--cr-muted-fg)); margin-bottom: 1rem; }
  .cr-hero code { font-family: "SF Mono","Fira Code",monospace; font-size: 0.75em; background: hsl(var(--cr-muted)); color: hsl(var(--cr-muted-fg)); padding: 0.1em 0.35em; border-radius: 3px; }
  .cr-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 1rem; }
  .cr-card { border-radius: 6px; border: 1px solid hsl(var(--cr-border)); background: hsl(var(--cr-card)); padding: 0.75rem; }
  .cr-card h4 { font-size: 0.8rem; font-weight: 600; color: hsl(var(--cr-fg)); margin-bottom: 0.2rem; display: flex; align-items: center; gap: 0.35rem; }
  .cr-card p { font-size: 0.7rem; color: hsl(var(--cr-muted-fg)); line-height: 1.5; }
  .cr-badge { display: inline-flex; border-radius: 9999px; padding: 0.15rem 0.5rem; font-size: 0.65rem; font-weight: 600; background: hsl(var(--cr-secondary)); color: hsl(var(--cr-secondary-fg)); margin-right: 0.25rem; }
  .cr-badge-outline { background: transparent; border: 1px solid hsl(var(--cr-border)); color: hsl(var(--cr-fg)); }
  .cr-sep { border: none; height: 1px; background: hsl(var(--cr-border)); margin: 0.75rem 0; }
  .cr-steps h4 { font-size: 0.85rem; font-weight: 600; color: hsl(var(--cr-fg)); margin-bottom: 0.5rem; }
  .cr-step { display: flex; gap: 0.6rem; align-items: flex-start; padding: 0.6rem; border-radius: 6px; border: 1px solid hsl(var(--cr-border)); background: hsl(var(--cr-card)); margin-bottom: 0.4rem; }
  .cr-step-num { display: flex; align-items: center; justify-content: center; width: 1.5rem; height: 1.5rem; border-radius: 50%; background: hsl(var(--cr-primary)); color: hsl(var(--cr-primary-fg)); font-size: 0.7rem; font-weight: 700; flex-shrink: 0; }
  .cr-step-title { font-size: 0.75rem; font-weight: 500; color: hsl(var(--cr-fg)); }
  .cr-step-desc { font-size: 0.7rem; color: hsl(var(--cr-muted-fg)); }
  .cr-footer { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem; }
  .cr-footer p { font-size: 0.7rem; color: hsl(var(--cr-muted-fg)); }
  .cr-btn { display: inline-flex; align-items: center; justify-content: center; border-radius: 4px; font-size: 0.7rem; font-weight: 500; cursor: default; border: none; height: 1.75rem; padding: 0 0.6rem; }
  .cr-btn-primary { background: hsl(var(--cr-primary)); color: hsl(var(--cr-primary-fg)); }
  .cr-btn-secondary { background: hsl(var(--cr-secondary)); color: hsl(var(--cr-secondary-fg)); }
  .cr-btn-outline { background: hsl(var(--cr-bg)); color: hsl(var(--cr-fg)); border: 1px solid hsl(var(--cr-input)); }
  .cr-btn-ghost { background: transparent; color: hsl(var(--cr-fg)); }
  .cr-btn-group { display: flex; gap: 0.3rem; }
`;

const CLIP_REVEAL_HTML = `
<header class="cr-header">
  <div class="cr-logo">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22.4 10.08-8.58 3.91a2 2 0 0 1-1.66 0l-8.58-3.9"/><path d="m22.4 14.08-8.58 3.91a2 2 0 0 1-1.66 0l-8.58-3.9"/></svg>
    <span>clip-reveal</span>
  </div>
  <button class="cr-toggle" aria-label="Toggle theme">
    <svg class="cr-icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
    <svg class="cr-icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
  </button>
</header>
<div class="cr-main">
  <div class="cr-hero">
    <h3>Theme Transition</h3>
    <p>Un reveal vertical via <code>clip-path: inset()</code> — les deux thèmes coexistent pendant la transition.</p>
  </div>
  <div class="cr-cards">
    <div class="cr-card">
      <h4><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg> Design</h4>
      <p>Dual render light &amp; dark. Le clip-path rétracte l'ancien thème.</p>
      <div style="margin-top:0.4rem"><span class="cr-badge">clip-path</span><span class="cr-badge">inset()</span><span class="cr-badge cr-badge-outline">dual render</span></div>
    </div>
    <div class="cr-card">
      <h4><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> Technique</h4>
      <p>L'overlay se rétracte de <code>inset(0)</code> à <code>inset(100% 0 0 0)</code>.</p>
      <div style="margin-top:0.4rem"><span class="cr-badge">HTML</span><span class="cr-badge">CSS</span><span class="cr-badge cr-badge-outline">vanilla JS</span></div>
    </div>
  </div>
  <hr class="cr-sep">
  <div class="cr-steps">
    <h4>Comment ça marche</h4>
    <div class="cr-step"><div class="cr-step-num">1</div><div><p class="cr-step-title">Dual render</p><p class="cr-step-desc">Deux copies superposées, chacune avec son thème.</p></div></div>
    <div class="cr-step"><div class="cr-step-num">2</div><div><p class="cr-step-title">Clip l'ancien</p><p class="cr-step-desc">L'ancien thème se rétracte via clip-path.</p></div></div>
    <div class="cr-step"><div class="cr-step-num">3</div><div><p class="cr-step-title">Swap</p><p class="cr-step-desc">L'overlay est retiré, le nouveau thème reste.</p></div></div>
  </div>
  <hr class="cr-sep">
  <div class="cr-footer">
    <p>Essaie le toggle en haut à droite →</p>
    <div class="cr-btn-group">
      <span class="cr-btn cr-btn-primary">Primary</span>
      <span class="cr-btn cr-btn-secondary">Secondary</span>
      <span class="cr-btn cr-btn-outline">Outline</span>
      <span class="cr-btn cr-btn-ghost">Ghost</span>
    </div>
  </div>
</div>`;

const ClipRevealDemo = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Inject scoped style
    const style = document.createElement("style");
    style.textContent = CLIP_REVEAL_CSS;
    root.appendChild(style);

    // Create base layer
    const baseLayer = document.createElement("div");
    baseLayer.className = "cr-layer";
    baseLayer.setAttribute("data-theme", "light");
    baseLayer.innerHTML = CLIP_REVEAL_HTML;
    root.appendChild(baseLayer);

    // Create overlay layer
    const overlayLayer = document.createElement("div");
    overlayLayer.className = "cr-layer cr-overlay";
    overlayLayer.setAttribute("data-theme", "light");
    overlayLayer.setAttribute("aria-hidden", "true");
    root.appendChild(overlayLayer);

    let currentTheme = "light";
    let isAnimating = false;

    const handleClick = (e: Event) => {
      const btn = (e.target as HTMLElement).closest(".cr-toggle");
      if (!btn || isAnimating) return;

      isAnimating = true;
      const oldTheme = currentTheme;
      const newTheme = oldTheme === "dark" ? "light" : "dark";

      // 1. Clone current into overlay (old theme snapshot)
      overlayLayer.innerHTML = baseLayer.innerHTML;
      overlayLayer.setAttribute("data-theme", oldTheme);

      // 2. Switch base to new theme
      currentTheme = newTheme;
      baseLayer.setAttribute("data-theme", newTheme);

      // 3. Show overlay fully
      overlayLayer.style.clipPath = "inset(0 0 0 0)";
      overlayLayer.style.visibility = "visible";
      overlayLayer.classList.remove("cr-animating");

      // Force reflow
      overlayLayer.offsetHeight;

      // 4. Animate: old theme peels away
      overlayLayer.classList.add("cr-animating");
      overlayLayer.style.clipPath = "inset(100% 0 0 0)";

      // 5. Cleanup
      overlayLayer.addEventListener("transitionend", function handler() {
        overlayLayer.classList.remove("cr-animating");
        overlayLayer.style.visibility = "hidden";
        overlayLayer.style.clipPath = "inset(0 0 0 0)";
        overlayLayer.innerHTML = "";
        isAnimating = false;
        overlayLayer.removeEventListener("transitionend", handler);
      });
    };

    baseLayer.addEventListener("click", handleClick);

    return () => {
      baseLayer.removeEventListener("click", handleClick);
      root.innerHTML = "";
    };
  }, []);

  return <div ref={rootRef} className="cr-root" />;
};

const clipRevealCode = `<!-- Deux couches superposées avec des thèmes inversés -->
<div class="theme-layer" id="baseLayer" data-theme="light">
  <!-- contenu de la page -->
</div>
<div class="theme-layer overlay" id="overlayLayer" data-theme="light">
  <!-- copie du contenu -->
</div>

<style>
  .theme-layer.overlay {
    position: fixed; inset: 0; z-index: 9999;
    visibility: hidden;
    clip-path: inset(0 0 0 0);
  }
  .theme-layer.overlay.is-animating {
    visibility: visible;
    transition: clip-path 0.75s cubic-bezier(0.65, 0, 0.35, 1);
  }
</style>

<script>
  // 1. Copier le contenu dans l'overlay (ancien thème)
  overlayLayer.innerHTML = baseLayer.innerHTML;
  overlayLayer.setAttribute("data-theme", oldTheme);

  // 2. Appliquer le nouveau thème sur la base
  baseLayer.setAttribute("data-theme", newTheme);

  // 3. Animer l'overlay qui se rétracte
  overlayLayer.style.clipPath = "inset(0 0 0 0)";
  overlayLayer.classList.add("is-animating");
  overlayLayer.style.clipPath = "inset(100% 0 0 0)";

  // 4. Cleanup à la fin de la transition
  overlayLayer.addEventListener("transitionend", () => {
    overlayLayer.classList.remove("is-animating");
    overlayLayer.innerHTML = "";
  });
</script>`;

/* ---- Experiment 6: Morph Checkbox ---- */
const MORPH_CSS = `
  .morph-root { font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; }
  .morph-card { width: 100%; max-width: 320px; border: 1px solid #e4e4e7; border-radius: 12px; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.04); margin: 0 auto; }
  .morph-card-header { padding: 16px 20px 8px; }
  .morph-card-title { font-size: 14px; font-weight: 500; color: #71717a; margin: 0; }
  .morph-card-content { padding: 0 20px 20px; display: flex; flex-direction: column; gap: 16px; }
  .morph-task { display: flex; align-items: center; gap: 14px; cursor: pointer; user-select: none; }
  .morph-cb-wrap { flex-shrink: 0; width: 22px; height: 22px; cursor: pointer; }
  .morph-cb-wrap svg { display: block; overflow: visible; }
  .morph-task-label { font-size: 14px; font-weight: 500; color: #18181b; position: relative; transition: color 0.3s 0.35s; }
  .morph-task-label.done { color: #a1a1aa; }
  .morph-task-label .morph-strike { position: absolute; left: 0; top: 50%; height: 1px; width: 100%; background: #a1a1aa; pointer-events: none; transform-origin: left; transform: scaleX(0); transition: transform 0.4s 0.3s cubic-bezier(0.22,1,0.36,1); }
  .morph-task-label.done .morph-strike { transform: scaleX(1); }
  .morph-slow .morph-task-label { transition: color 0.4s 1.2s; }
  .morph-slow .morph-task-label .morph-strike { transition: transform 0.8s 1s cubic-bezier(0.22,1,0.36,1); }
  .morph-divider { height: 1px; background: #f4f4f5; }
  .morph-switch-row { display: flex; align-items: center; justify-content: space-between; }
  .morph-switch-row label { font-size: 12px; color: #71717a; font-weight: 500; cursor: pointer; }
  .morph-switch { width: 36px; height: 20px; border-radius: 9999px; background: #e4e4e7; cursor: pointer; position: relative; border: none; padding: 0; transition: background 0.2s; }
  .morph-switch.on { background: #18181b; }
  .morph-switch .morph-thumb { position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 9999px; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.15); transition: transform 0.2s; }
  .morph-switch.on .morph-thumb { transform: translateX(16px); }
`;

const MORPH_TRACKS: Record<string, { t: number; x: number; y: number }[]> = {
  top_p1:    [{ t: 0, x: 4, y: 4 },   { t: 0.38, x: 24, y: 4 },  { t: 1, x: 25, y: 4 }],
  top_p2:    [{ t: 0, x: 24, y: 4 },   { t: 0.38, x: 24, y: 4 },  { t: 1, x: 25, y: 4 }],
  left_p1:   [{ t: 0, x: 4, y: 24 },   { t: 0.38, x: 4, y: 24 },  { t: 1, x: 2, y: 13 }],
  left_p2:   [{ t: 0, x: 4, y: 4 },    { t: 0.38, x: 4, y: 24 },  { t: 1, x: 2, y: 13 }],
  right_p1:  [{ t: 0, x: 24, y: 4 },   { t: 0.35, x: 24, y: 4 },  { t: 0.45, x: 23, y: 6 },  { t: 1, x: 10, y: 21 }],
  right_p2:  [{ t: 0, x: 24, y: 24 },  { t: 0.35, x: 24, y: 24 }, { t: 0.45, x: 24, y: 20 }, { t: 1, x: 25, y: 4 }],
  bottom_p1: [{ t: 0, x: 24, y: 24 },  { t: 0.35, x: 24, y: 24 }, { t: 0.45, x: 20, y: 24 }, { t: 1, x: 2, y: 13 }],
  bottom_p2: [{ t: 0, x: 4, y: 24 },   { t: 0.35, x: 4, y: 24 },  { t: 0.45, x: 6, y: 23 },  { t: 1, x: 10, y: 21 }],
};

const NS = "http://www.w3.org/2000/svg";

function sampleTrack(track: { t: number; x: number; y: number }[], t: number) {
  if (t <= track[0].t) return { x: track[0].x, y: track[0].y };
  if (t >= track[track.length - 1].t) return { x: track[track.length - 1].x, y: track[track.length - 1].y };
  let i = 0;
  while (i < track.length - 1 && track[i + 1].t < t) i++;
  const a = track[i], b = track[i + 1];
  const s = (t - a.t) / (b.t - a.t);
  const smooth = s * s * (3 - 2 * s);
  return { x: a.x + (b.x - a.x) * smooth, y: a.y + (b.y - a.y) * smooth };
}

function getMorphLines(t: number) {
  const s = (n: string) => sampleTrack(MORPH_TRACKS[n], t);
  return {
    top:    { x1: s("top_p1").x,    y1: s("top_p1").y,    x2: s("top_p2").x,    y2: s("top_p2").y },
    right:  { x1: s("right_p1").x,  y1: s("right_p1").y,  x2: s("right_p2").x,  y2: s("right_p2").y },
    bottom: { x1: s("bottom_p1").x, y1: s("bottom_p1").y, x2: s("bottom_p2").x, y2: s("bottom_p2").y },
    left:   { x1: s("left_p1").x,   y1: s("left_p1").y,   x2: s("left_p2").x,   y2: s("left_p2").y },
  };
}

function lineLen(l: { x1: number; y1: number; x2: number; y2: number }) {
  return Math.sqrt((l.x2 - l.x1) ** 2 + (l.y2 - l.y1) ** 2);
}

function easeInOutQuart(t: number) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

const MorphCheckboxDemo = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const style = document.createElement("style");
    style.textContent = MORPH_CSS;
    root.appendChild(style);

    const tasks = ["Push to staging branch", "Write ReadMe", "Update documentation", "Review pull request"];
    let slow = false;

    const wrapper = document.createElement("div");
    wrapper.className = "morph-root";
    wrapper.innerHTML = `
      <div class="morph-card">
        <div class="morph-card-header"><h2 class="morph-card-title">Task</h2></div>
        <div class="morph-card-content">
          ${tasks.map(t => `
            <div class="morph-task" data-morph-task role="checkbox" aria-checked="false" tabindex="0">
              <div class="morph-cb-wrap" aria-hidden="true"><svg viewBox="0 0 28 28" width="22" height="22"></svg></div>
              <span class="morph-task-label">${t}<span class="morph-strike"></span></span>
            </div>
          `).join("")}
          <div class="morph-divider"></div>
          <div class="morph-switch-row">
            <label>Slow motion</label>
            <button class="morph-switch" aria-label="Slow motion" aria-pressed="false"><span class="morph-thumb"></span></button>
          </div>
        </div>
      </div>
    `;
    root.appendChild(wrapper);

    // Init each checkbox
    wrapper.querySelectorAll("[data-morph-task]").forEach((row) => {
      const svg = row.querySelector("svg")!;
      const label = row.querySelector(".morph-task-label")!;
      const lines: Record<string, SVGLineElement> = {};
      let checked = false;
      let progress = 0;
      let animId: number | null = null;

      ["top", "right", "bottom", "left"].forEach(name => {
        const line = document.createElementNS(NS, "line");
        line.setAttribute("stroke-linecap", "round");
        svg.appendChild(line);
        lines[name] = line;
      });

      function render(t: number) {
        const data = getMorphLines(t);
        const r = Math.round(212 + (22 - 212) * t);
        const g = Math.round(212 + (163 - 212) * t);
        const b = Math.round(216 + (74 - 216) * t);
        const color = `rgb(${r},${g},${b})`;
        const sw = 1.8 + 0.5 * t;

        for (const [name, l] of Object.entries(data)) {
          const el = lines[name];
          el.setAttribute("x1", String(l.x1));
          el.setAttribute("y1", String(l.y1));
          el.setAttribute("x2", String(l.x2));
          el.setAttribute("y2", String(l.y2));
          el.setAttribute("stroke", color);
          el.setAttribute("stroke-width", String(sw));
          if (name === "top" || name === "left") {
            el.setAttribute("opacity", String(Math.min(1, lineLen(l) / 3)));
          }
        }
      }

      function animate() {
        if (animId) cancelAnimationFrame(animId);
        const duration = slow ? 1800 : 700;
        const startTime = performance.now();
        const startVal = progress;
        const endVal = checked ? 1 : 0;

        function tick(now: number) {
          const rawT = Math.min((now - startTime) / duration, 1);
          progress = startVal + (endVal - startVal) * easeInOutQuart(rawT);
          render(progress);
          if (rawT < 1) animId = requestAnimationFrame(tick);
        }
        animId = requestAnimationFrame(tick);
      }

      const toggle = () => {
        checked = !checked;
        label.classList.toggle("done", checked);
        row.setAttribute("aria-checked", String(checked));
        animate();
      };
      row.addEventListener("click", toggle);
      row.addEventListener("keydown", (e: Event) => {
        if ((e as KeyboardEvent).key === "Enter" || (e as KeyboardEvent).key === " ") {
          (e as KeyboardEvent).preventDefault();
          toggle();
        }
      });

      render(0);
    });

    // Slow motion toggle
    const switchBtn = wrapper.querySelector(".morph-switch")!;
    switchBtn.addEventListener("click", () => {
      slow = !slow;
      switchBtn.classList.toggle("on", slow);
      switchBtn.setAttribute("aria-pressed", String(slow));
      wrapper.classList.toggle("morph-slow", slow);
    });

    return () => { root.innerHTML = ""; };
  }, []);

  return <div ref={rootRef} />;
};

const morphCheckboxCode = `const TRACKS = {
  top_p1:    [{ t: 0, x: 4, y: 4 },   { t: 0.38, x: 24, y: 4 },  { t: 1, x: 25, y: 4 }],
  left_p1:   [{ t: 0, x: 4, y: 24 },   { t: 0.38, x: 4, y: 24 },  { t: 1, x: 2, y: 13 }],
  right_p1:  [{ t: 0, x: 24, y: 4 },   { t: 0.35, x: 24, y: 4 },  { t: 0.45, x: 23, y: 6 },  { t: 1, x: 10, y: 21 }],
  bottom_p1: [{ t: 0, x: 24, y: 24 },  { t: 0.35, x: 24, y: 24 }, { t: 0.45, x: 20, y: 24 }, { t: 1, x: 2, y: 13 }],
  // ... + p2 endpoints for each side
};

// Interpolate track keyframes with smoothstep
function sampleTrack(track, t) {
  // find segment, interpolate with s*s*(3-2*s)
}

// Get all 4 line positions at time t
function getLines(t) {
  return { top, right, bottom, left }; // each { x1, y1, x2, y2 }
}

// Render SVG lines with animated color (gray → green)
function render(t) {
  const r = 212 + (22 - 212) * t;   // gray → green
  const g = 212 + (163 - 212) * t;
  const b = 216 + (74 - 216) * t;
  // update line positions, stroke color, stroke-width
}

// Animate checkbox with easeInOutQuart
row.addEventListener("click", () => {
  checked = !checked;
  label.classList.toggle("done", checked);
  // requestAnimationFrame loop from 0→1 or 1→0
});`;

/* ---- Experiment 7: Scrubber Input ---- */
const SCRUBBER_CSS = `
  .scrub-root { font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; }
  .scrub-workspace { display: flex; align-items: stretch; gap: 12px; }
  .scrub-canvas { width: 160px; border-radius: 10px; display: flex; align-items: center; justify-content: center; background-color: #e5e5ea; background-image: linear-gradient(45deg,#b8b8bc 25%,transparent 25%),linear-gradient(-45deg,#b8b8bc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#b8b8bc 75%),linear-gradient(-45deg,transparent 75%,#b8b8bc 75%); background-size: 14px 14px; background-position: 0 0,0 7px,7px -7px,-7px 0; }
  .scrub-shape { width: 72px; height: 72px; background: rgba(96,165,250,1); border-radius: 10px; box-shadow: 0 2px 12px rgba(0,0,0,0.18); }
  .scrub-panel { width: 220px; background: #fff; border: 1px solid #e4e4e7; border-radius: 10px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden; }
  .scrub-panel-header { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border-bottom: 1px solid #f4f4f5; }
  .scrub-panel-title { font-size: 10px; font-weight: 600; color: #71717a; letter-spacing: 0.06em; text-transform: uppercase; }
  .scrub-section { padding: 6px 12px; border-bottom: 1px solid #f4f4f5; }
  .scrub-section:last-child { border-bottom: none; }
  .scrub-row { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
  .scrub-row:last-child { margin-bottom: 0; }
  .scrub-row-label { font-size: 10px; color: #71717a; width: 48px; flex-shrink: 0; }
  .scrub-input { flex: 1; height: 24px; background: #fafafa; border: 1px solid #e4e4e7; border-radius: 5px; padding: 0 6px; font-size: 11px; font-weight: 500; color: #18181b; display: flex; align-items: center; font-family: inherit; }
  .scrub-el { position: relative; width: 56px; height: 24px; cursor: e-resize; user-select: none; -webkit-user-select: none; flex-shrink: 0; }
  .scrub-box { position: absolute; inset: 0; background: #fafafa; border: 1px solid #e4e4e7; border-radius: 5px; overflow: hidden; display: flex; align-items: center; justify-content: center; transition: border-color 120ms ease, box-shadow 120ms ease; }
  .scrub-el.is-dragging .scrub-box, .scrub-el.is-editing .scrub-box { border-color: #a1a1aa; box-shadow: 0 0 0 3px rgba(0,0,0,0.06); }
  .scrub-fill { position: absolute; top: 0; left: 0; height: 100%; width: 0; background: rgba(0,0,0,0.07); pointer-events: none; }
  .scrub-el.is-editing .scrub-fill { display: none; }
  .scrub-label-text { position: relative; z-index: 1; font-size: 11px; font-weight: 500; color: #18181b; pointer-events: none; font-family: inherit; }
  .scrub-el.is-editing .scrub-label-text { visibility: hidden; }
  .scrub-thumb { position: absolute; top: 50%; transform: translate(-50%,-50%); width: 2px; height: 10px; background: #18181b; border-radius: 99px; pointer-events: none; z-index: 10; }
  .scrub-el.is-editing .scrub-thumb, .scrub-el.is-editing .scrub-fill { display: none; }
  .scrub-edit-input { position: absolute; inset: 0; width: 100%; height: 100%; border: none; background: transparent; text-align: center; font-size: 11px; font-weight: 500; color: #18181b; font-family: inherit; outline: none; display: none; z-index: 20; padding: 0; -moz-appearance: textfield; appearance: textfield; }
  .scrub-edit-input::-webkit-outer-spin-button, .scrub-edit-input::-webkit-inner-spin-button { -webkit-appearance: none; }
  .scrub-el.is-editing .scrub-edit-input { display: block; }
  .scrub-add-row { display: flex; align-items: center; justify-content: space-between; padding: 2px 0; }
  .scrub-add-label { font-size: 10px; font-weight: 600; color: #18181b; }
  .scrub-fill-row { display: flex; align-items: center; gap: 6px; margin-top: 4px; }
  .scrub-swatch { width: 14px; height: 14px; border-radius: 3px; border: 1px solid rgba(0,0,0,0.1); flex-shrink: 0; }
  .scrub-hex { flex: 1; height: 24px; background: #fafafa; border: 1px solid #e4e4e7; border-radius: 5px; padding: 0 6px; font-size: 11px; font-weight: 500; color: #18181b; display: flex; align-items: center; font-family: ui-monospace, monospace; }
`;

const ScrubberInputDemo = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const style = document.createElement("style");
    style.textContent = SCRUBBER_CSS;
    root.appendChild(style);

    const wrapper = document.createElement("div");
    wrapper.className = "scrub-root";
    wrapper.innerHTML = `
      <div class="scrub-workspace">
        <div class="scrub-canvas"><div class="scrub-shape" id="scrub-shape"></div></div>
        <div class="scrub-panel">
          <div class="scrub-panel-header"><span class="scrub-panel-title">Design</span></div>
          <div class="scrub-section">
            <div class="scrub-row"><span class="scrub-row-label">W</span><div class="scrub-input">160</div><span class="scrub-row-label" style="width:14px;text-align:center">H</span><div class="scrub-input">90</div></div>
            <div class="scrub-row"><span class="scrub-row-label">X</span><div class="scrub-input">0</div><span class="scrub-row-label" style="width:14px;text-align:center">Y</span><div class="scrub-input">0</div></div>
          </div>
          <div class="scrub-section">
            <div class="scrub-row"><span class="scrub-row-label">Opacity</span><div class="scrub-el" data-scrub data-value="100" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="100" aria-label="Opacity"><div class="scrub-box"><div class="scrub-fill"></div><span class="scrub-label-text"></span><input class="scrub-edit-input" type="number" min="0" max="100"></div><div class="scrub-thumb"></div></div></div>
            <div class="scrub-row"><span class="scrub-row-label">Blur</span><div class="scrub-el" data-scrub data-value="0" data-max="40" data-unit="px" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="40" aria-label="Blur"><div class="scrub-box"><div class="scrub-fill"></div><span class="scrub-label-text"></span><input class="scrub-edit-input" type="number" min="0" max="40"></div><div class="scrub-thumb"></div></div></div>
          </div>
          <div class="scrub-section">
            <div class="scrub-add-row"><span class="scrub-add-label">Fill</span></div>
            <div class="scrub-fill-row">
              <div class="scrub-swatch" style="background:#60a5fa"></div>
              <div class="scrub-hex">60A5FA</div>
              <div class="scrub-el" data-scrub data-value="100" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="100" aria-label="Fill opacity"><div class="scrub-box"><div class="scrub-fill"></div><span class="scrub-label-text"></span><input class="scrub-edit-input" type="number" min="0" max="100"></div><div class="scrub-thumb"></div></div>
            </div>
          </div>
        </div>
      </div>
    `;
    root.appendChild(wrapper);

    const shape = wrapper.querySelector("#scrub-shape") as HTMLElement;
    const EASE = "cubic-bezier(0.4,0,0.2,1)";
    const SNAP_MS = 200;

    function initScrubber(el: HTMLElement, onPreview?: (v: number) => void) {
      const fillRight = el.querySelector(".scrub-fill") as HTMLElement;
      const labelEl = el.querySelector(".scrub-label-text") as HTMLElement;
      const inputEl = el.querySelector(".scrub-edit-input") as HTMLInputElement;
      const thumbEl = el.querySelector(".scrub-thumb") as HTMLElement;
      const MAX = parseFloat(el.dataset.max ?? "100");
      const UNIT = el.dataset.unit ?? "%";
      let value = parseFloat(el.dataset.value ?? "0");
      let isDragging = false;
      let startX = 0, boxWidth = 0, thumbX = 0, hasMoved = false;

      function setDisplay(v: number) {
        labelEl.textContent = Math.round(v) + UNIT;
        el.setAttribute("aria-valuenow", String(Math.round(v)));
      }
      function resetToNeutral() {
        thumbEl.style.transition = `left ${SNAP_MS}ms ${EASE}`;
        thumbEl.style.left = "0px";
        fillRight.style.width = "0";
        thumbX = 0;
        setTimeout(() => { thumbEl.style.transition = "none"; }, SNAP_MS);
      }
      function enterEditMode() {
        el.classList.add("is-editing");
        inputEl.value = String(Math.round(value));
        setTimeout(() => { inputEl.focus(); inputEl.select(); }, 0);
      }
      function exitEditMode() {
        el.classList.remove("is-editing");
        const parsed = parseFloat(inputEl.value);
        if (!isNaN(parsed)) { value = Math.max(0, Math.min(MAX, parsed)); onPreview?.(value); }
        setDisplay(value);
      }

      el.addEventListener("pointerdown", (e) => {
        if (el.classList.contains("is-editing")) return;
        boxWidth = el.getBoundingClientRect().width;
        startX = e.clientX; thumbX = 0; hasMoved = false; isDragging = true;
        el.setPointerCapture(e.pointerId);
        el.classList.add("is-dragging");
        thumbEl.style.transition = "none"; thumbEl.style.left = "0px"; fillRight.style.width = "0";
      });
      el.addEventListener("pointermove", (e) => {
        if (!isDragging) return;
        const rawDelta = Math.max(0, e.clientX - startX);
        if (rawDelta > 4) hasMoved = true;
        thumbX = Math.min(rawDelta, boxWidth);
        value = (thumbX / boxWidth) * MAX;
        thumbEl.style.left = thumbX + "px";
        fillRight.style.width = thumbX + "px";
        setDisplay(value);
        onPreview?.(value);
      });
      el.addEventListener("pointerup", () => {
        if (!isDragging) return;
        isDragging = false; el.classList.remove("is-dragging");
        if (!hasMoved) { resetToNeutral(); enterEditMode(); } else { resetToNeutral(); }
      });
      el.addEventListener("pointercancel", () => {
        if (!isDragging) return;
        isDragging = false; el.classList.remove("is-dragging"); resetToNeutral();
      });
      inputEl.addEventListener("blur", exitEditMode);
      inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === "Tab") { e.preventDefault(); exitEditMode(); }
        if (e.key === "Escape") { inputEl.value = String(Math.round(value)); exitEditMode(); }
      });
      setDisplay(value);
    }

    const scrubbers = wrapper.querySelectorAll("[data-scrub]");
    const callbacks = [
      (v: number) => { shape.style.opacity = String(v / 100); },
      (v: number) => { shape.style.filter = `blur(${v}px)`; },
      (v: number) => { shape.style.backgroundColor = `rgba(96,165,250,${v / 100})`; },
    ];
    scrubbers.forEach((el, i) => initScrubber(el as HTMLElement, callbacks[i]));

    return () => { root.innerHTML = ""; };
  }, []);

  return <div ref={rootRef} />;
};

const scrubberInputCode = `// Scrubber: drag-to-set or click-to-type input
function initScrubber(el, onPreview) {
  const fill = el.querySelector(".fill");
  const thumb = el.querySelector(".thumb");
  const label = el.querySelector(".label");
  const input = el.querySelector("input");
  let value = 0, isDragging = false, startX, hasMoved;

  el.addEventListener("pointerdown", (e) => {
    startX = e.clientX; hasMoved = false;
    isDragging = true;
    el.setPointerCapture(e.pointerId);
  });

  el.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const delta = Math.max(0, e.clientX - startX);
    if (delta > 4) hasMoved = true;
    const thumbX = Math.min(delta, el.offsetWidth);
    value = (thumbX / el.offsetWidth) * MAX;
    thumb.style.left = thumbX + "px";
    fill.style.width = thumbX + "px";
    onPreview?.(value);
  });

  el.addEventListener("pointerup", () => {
    isDragging = false;
    // Click without move → edit mode (text input)
    if (!hasMoved) enterEditMode();
    resetThumb(); // snap back to 0
  });
}`;

/* ---- Experiment 8: Dynamic Island Emoji Sender ---- */
const DYNAMIC_ISLAND_CSS = `
  .di-root { --ease-out-quint: cubic-bezier(0.23,1,0.32,1); --ease-out-circ: cubic-bezier(0.075,0.82,0.165,1); --spring: cubic-bezier(0.22,1.12,0.36,1); font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif; }
  .di-page { display: flex; flex-direction: column; align-items: center; gap: 24px; }
  .di-header { text-align: center; }
  .di-title { font-size: 16px; font-weight: 700; letter-spacing: -0.02em; color: hsl(0 0% 9%); }
  .di-subtitle { margin-top: 4px; font-size: 12px; color: hsl(0 0% 45%); }
  .di-layout { display: flex; align-items: flex-start; gap: 24px; }
  .di-phone-clip { flex-shrink: 0; overflow: hidden; padding: 20px 20px 0; margin: -20px -20px 0; }
  .di-phone-frame { width: 220px; height: 420px; background: hsl(0 0% 8%); border-radius: 34px; padding: 3px; box-shadow: inset 0 0 0 1px hsl(0 0% 20%), 0 6px 20px rgba(0,0,0,0.18); }
  .di-phone-screen { width: 214px; height: 100%; background: linear-gradient(170deg, hsl(230 15% 92%), hsl(250 10% 88%)); border-radius: 31px; overflow: hidden; display: flex; flex-direction: column; align-items: center; }
  .di-island-wrap { position: relative; width: 100%; height: 90px; display: flex; flex-direction: column; align-items: center; margin-top: 7px; filter: url(#di-gooey); }
  .di-island { position: absolute; top: 0; background: #000; color: #fff; border-radius: 14px; overflow: hidden; display: flex; align-items: center; justify-content: center; z-index: 2; width: 72px; height: 22px; transition: width 650ms var(--spring), height 650ms var(--spring), border-radius 650ms var(--spring), transform 500ms var(--ease-out-quint); will-change: width, height, transform; transform: scale(1); }
  @keyframes di-breathe { 0%,100% { transform: scaleX(1) scaleY(1); } 50% { transform: scaleX(1.04) scaleY(1.02); } }
  .di-island.di-idle { animation: di-breathe 3.5s ease-in-out infinite; }
  .di-island.di-show { animation: none; transform: scale(1); width: 180px; height: 34px; border-radius: 18px; transition: width 600ms var(--spring), height 600ms var(--spring), border-radius 600ms var(--spring); }
  @keyframes di-settle { 0% { transform: scale(1); } 25% { transform: scale(0.92,0.94); } 50% { transform: scale(1.04,1.02); } 75% { transform: scale(0.98,0.99); } 100% { transform: scale(1); } }
  .di-island.di-settle { animation: di-settle 700ms var(--ease-out-quint) both; }
  .di-island-inner { display: flex; align-items: center; justify-content: center; gap: 5px; padding: 0 10px; white-space: nowrap; transition: opacity 200ms ease-out; }
  .di-island-inner:empty { padding: 0; }
  .di-i-emoji { font-size: 14px; line-height: 1; flex-shrink: 0; }
  @keyframes di-pop-in { 0% { transform: scale(0.3); opacity: 0; } 45% { transform: scale(1.25); opacity: 1; } 70% { transform: scale(0.92); } 100% { transform: scale(1); } }
  .di-i-emoji.di-pop { animation: di-pop-in 500ms var(--ease-out-circ) both; }
  .di-i-label { font-size: 8px; font-weight: 600; opacity: 0; letter-spacing: -0.01em; }
  @keyframes di-slide-in { 0% { opacity: 0; transform: translateX(-4px); } 100% { opacity: 1; transform: translateX(0); } }
  .di-i-label.di-enter { animation: di-slide-in 300ms var(--ease-out-quint) 100ms both; }
  .di-i-progress { position: absolute; bottom: 0; left: 0; height: 2px; background: rgba(255,255,255,0.25); border-radius: 0 0 18px 18px; }
  @keyframes di-fill-bar { 0% { width: 0; } 100% { width: 100%; } }
  .di-i-progress.di-run { animation: di-fill-bar 2s linear both; }
  .di-phrase-box { position: absolute; top: 10px; background: #000; color: rgba(255,255,255,0.8); border-radius: 10px; padding: 0; font-size: 8px; font-style: italic; font-weight: 500; text-align: center; white-space: nowrap; z-index: 1; pointer-events: none; opacity: 0; transform: scaleX(0.4) scaleY(0.1); transform-origin: center top; max-height: 0; overflow: hidden; transition: opacity 300ms var(--ease-out-quint), transform 650ms var(--spring), max-height 650ms var(--spring), padding 650ms var(--spring), top 650ms var(--spring); }
  .di-phrase-box.di-visible { opacity: 1; max-height: 40px; padding: 5px 12px; top: 42px; }
  @keyframes di-gooey-drip { 0% { transform: scaleX(0.4) scaleY(0.1); } 25% { transform: scaleX(0.6) scaleY(1.3); } 50% { transform: scaleX(1.08) scaleY(1.1); } 75% { transform: scaleX(0.96) scaleY(0.95); } 100% { transform: scaleX(1) scaleY(1); } }
  .di-phrase-box.di-spring { animation: di-gooey-drip 700ms var(--ease-out-quint) both; }
  .di-emoji-panel { display: flex; flex-direction: column; gap: 5px; flex-shrink: 0; }
  .di-emoji-btn { display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; background: hsl(0 0% 100%); border: 1px solid hsl(0 0% 90%); border-radius: 6px; cursor: pointer; font-family: inherit; transition: background 150ms ease, border-color 150ms ease; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
  .di-emoji-btn:hover { background: hsl(0 0% 97%); border-color: hsl(0 0% 82%); }
  .di-emoji-btn:active { background: hsl(0 0% 95%); }
  .di-emoji-icon { font-size: 14px; line-height: 1; }
  .di-emoji-label { font-size: 11px; font-weight: 500; color: hsl(0 0% 25%); }
  @keyframes di-launch { 0% { transform: scale(0.92); opacity: 0.5; } 50% { transform: scale(1.03); } 100% { transform: scale(1); opacity: 1; } }
  .di-emoji-btn.di-launched { animation: di-launch 300ms var(--ease-out-quint) both; }
`;

const DynamicIslandDemo = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const style = document.createElement("style");
    style.textContent = DYNAMIC_ISLAND_CSS;
    root.appendChild(style);

    const wrapper = document.createElement("div");
    wrapper.className = "di-root";
    wrapper.innerHTML = `
      <svg style="position:absolute;width:0;height:0">
        <defs>
          <filter id="di-gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur"/>
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo"/>
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
        </defs>
      </svg>
      <div class="di-page">
        <div class="di-header">
          <div class="di-title">Send good vibes</div>
          <p class="di-subtitle">Pick an emoji and send it through the Dynamic Island</p>
        </div>
        <div class="di-layout">
          <div class="di-emoji-panel" id="di-emoji-grid">
            <button class="di-emoji-btn" data-emoji="❤️" data-msg="love"><span class="di-emoji-icon">❤️</span><span class="di-emoji-label">Love</span></button>
            <button class="di-emoji-btn" data-emoji="💪" data-msg="strength"><span class="di-emoji-icon">💪</span><span class="di-emoji-label">Strength</span></button>
            <button class="di-emoji-btn" data-emoji="🍀" data-msg="luck"><span class="di-emoji-icon">🍀</span><span class="di-emoji-label">Luck</span></button>
            <button class="di-emoji-btn" data-emoji="🔥" data-msg="fire"><span class="di-emoji-icon">🔥</span><span class="di-emoji-label">Fire</span></button>
          </div>
          <div class="di-phone-clip">
            <div class="di-phone-frame">
              <div class="di-phone-screen">
                <div class="di-island-wrap" id="di-island-wrap">
                  <div class="di-island di-idle" id="di-island">
                    <div class="di-island-inner" id="di-island-inner"></div>
                  </div>
                  <div class="di-phrase-box" id="di-phrase-box"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    root.appendChild(wrapper);

    const island = wrapper.querySelector("#di-island") as HTMLElement;
    const inner = wrapper.querySelector("#di-island-inner") as HTMLElement;
    const emojiGrid = wrapper.querySelector("#di-emoji-grid") as HTMLElement;
    const phraseBox = wrapper.querySelector("#di-phrase-box") as HTMLElement;

    let busy = false;

    const NAMES = ["Lea","Hugo","Emma","Louis","Chloe","Lucas","Jade","Nathan","Lily","Raphael","Camille","Theo","Ines","Jules","Sarah","Matt","Zoe","Axel"];
    const PHRASES: Record<string, string[]> = {
      love: ["Love makes everything better","Your heart shines bright","With all my heart"],
      strength: ["You're stronger than you think","Nothing can stop you","Go go go!"],
      luck: ["May fortune smile on you","The stars are aligned","It's your lucky day"],
      fire: ["You're on fire today","It's lit!","Hot hot hot"],
    };

    function pickRandom(arr: string[]) { return arr[Math.floor(Math.random() * arr.length)]; }

    function receiveEmoji(emoji: string, msg: string) {
      const name = pickRandom(NAMES);
      const phrases = PHRASES[msg] || ["✨"];
      const phrase = pickRandom(phrases);

      island.classList.remove("di-idle", "di-settle");
      island.classList.add("di-show");
      const label = `${name} sends you ${msg}`;
      inner.innerHTML =
        `<span class="di-i-emoji di-pop">${emoji}</span>` +
        `<span class="di-i-label di-enter">${label}</span>` +
        `<div class="di-i-progress di-run"></div>`;

      setTimeout(() => {
        phraseBox.textContent = `"${phrase}"`;
        phraseBox.classList.add("di-visible", "di-spring");
      }, 600);

      setTimeout(() => {
        phraseBox.classList.remove("di-spring", "di-visible");
        inner.style.opacity = "0";
        setTimeout(() => {
          island.classList.remove("di-show");
          inner.innerHTML = "";
          inner.style.opacity = "";
          phraseBox.textContent = "";
          island.classList.add("di-settle");
          setTimeout(() => {
            island.classList.remove("di-settle");
            island.classList.add("di-idle");
          }, 700);
          busy = false;
        }, 400);
      }, 2800);
    }

    const handleClick = (e: Event) => {
      const btn = (e.target as HTMLElement).closest(".di-emoji-btn") as HTMLElement;
      if (!btn || busy) return;
      busy = true;
      btn.classList.add("di-launched");
      setTimeout(() => btn.classList.remove("di-launched"), 350);
      receiveEmoji(btn.dataset.emoji!, btn.dataset.msg!);
    };

    emojiGrid.addEventListener("click", handleClick);
    return () => { root.innerHTML = ""; };
  }, []);

  return <div ref={rootRef} />;
};

const dynamicIslandCode = `// Dynamic Island — Emoji Sender
const island = document.getElementById("island");
const inner = document.getElementById("island-inner");

// SVG gooey filter for the drip effect
<svg><filter id="gooey">
  <feGaussianBlur stdDeviation="6" />
  <feColorMatrix values="1 0 0 0 0  0 1 0 0 0
    0 0 1 0 0  0 0 0 19 -9" />
  <feComposite in="SourceGraphic" operator="atop" />
</filter></svg>

// Receive emoji → expand island with spring
function receiveEmoji(emoji, msg) {
  island.classList.add("show");   // width: 250px, spring transition
  inner.innerHTML = \`<span class="pop">\${emoji}</span>
    <span class="label">\${name} sends you \${msg}</span>\`;

  // Phrase box drips below via gooey filter
  setTimeout(() => {
    phraseBox.classList.add("visible", "spring");
  }, 600);

  // Collapse back after 2.8s
  setTimeout(() => {
    island.classList.remove("show");
    island.classList.add("settle"); // spring bounce back
  }, 2800);
}`;

/* ---- Experiment 9: Chat Split-Flap Status ---- */
const CHAT_FLAP_CSS = `
  .cf-root { --cf-bg: 220, 30%, 92%; --cf-fg: 240 10% 3.9%; --cf-card: 0 0% 100%; --cf-muted: 240 4.8% 95.9%; --cf-muted-fg: 240 3.8% 46.1%; --cf-border: 240 5.9% 90%; --cf-input: 240 5.9% 90%; --cf-ring: 240 5.9% 10%; --cf-primary: 240 5.9% 10%; --cf-primary-fg: 0 0% 98%; --cf-accent: 240 4.8% 95.9%; --cf-radius: 0.75rem; --cf-font-mono: "SF Mono","Fira Code","Cascadia Code","JetBrains Mono",Menlo,Consolas,monospace; font-family: "Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; -webkit-font-smoothing: antialiased; }
  .cf-wrapper { width: 100%; max-width: 400px; display: flex; flex-direction: column; gap: 16px; margin: 0 auto; }
  .cf-msg-user { display: flex; align-items: flex-end; justify-content: flex-end; gap: 10px; }
  .cf-bubble { background: hsl(var(--cf-primary)); color: hsl(var(--cf-primary-fg)); padding: 8px 14px; border-radius: var(--cf-radius) var(--cf-radius) 4px var(--cf-radius); max-width: 80%; font-size: 0.8rem; line-height: 1.6; }
  .cf-avatar { width: 28px; height: 28px; border-radius: var(--cf-radius); border: 1px solid hsl(var(--cf-border)); background: hsl(var(--cf-card)); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: hsl(var(--cf-muted-fg)); }
  .cf-msg-bot { display: flex; align-items: flex-start; gap: 10px; }
  .cf-bot-content { flex: 1; min-width: 0; }
  .cf-response-card { border: 1px solid hsl(var(--cf-border)); border-radius: var(--cf-radius); background: hsl(var(--cf-card)); padding: 14px 16px; display: flex; flex-direction: column; gap: 14px; }
  .cf-status-line { font-family: var(--cf-font-mono); font-size: 11px; color: hsl(var(--cf-muted-fg)); display: flex; height: 1.4em; overflow: hidden; }
  .cf-flap-char { display: inline-block; width: 0.62em; text-align: center; transition: opacity 80ms ease; will-change: transform, opacity; }
  .cf-flap-char.cf-rolling { opacity: 0.3; animation: cf-flap-tick 130ms ease-in-out; }
  .cf-flap-char.cf-resolved { opacity: 1; }
  .cf-flap-char.cf-space { width: 0.35em; }
  @keyframes cf-flap-tick { 0% { transform: translateY(-40%); opacity: 0.1; } 40% { transform: translateY(5%); opacity: 0.4; } 100% { transform: translateY(0); opacity: 0.3; } }
  .cf-skeleton-lines { display: flex; flex-direction: column; gap: 8px; }
  .cf-skeleton-line { height: 8px; border-radius: 999px; background: linear-gradient(90deg, hsl(var(--cf-muted)) 0%, hsl(var(--cf-border)) 50%, hsl(var(--cf-muted)) 100%); background-size: 200% 100%; animation: cf-shimmer 1.8s ease-in-out infinite; }
  .cf-skeleton-line:nth-child(2) { animation-delay: 0.15s; }
  .cf-skeleton-line:nth-child(3) { animation-delay: 0.3s; }
  .cf-skeleton-line:nth-child(4) { animation-delay: 0.45s; }
  @keyframes cf-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
  .cf-input-area { margin-top: 4px; }
  .cf-input-container { display: flex; align-items: center; gap: 0; border: 1px solid hsl(var(--cf-border)); border-radius: var(--cf-radius); background: hsl(var(--cf-card)); padding: 5px; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.04); }
  .cf-icon-btn { width: 30px; height: 30px; border-radius: calc(var(--cf-radius) - 4px); border: none; background: transparent; color: hsl(var(--cf-muted-fg)); display: flex; align-items: center; justify-content: center; flex-shrink: 0; opacity: 0.5; }
  .cf-fake-input { flex: 1; padding: 4px 6px; font-size: 0.8rem; color: hsl(var(--cf-muted-fg)); }
  .cf-send-btn { width: 30px; height: 30px; border-radius: calc(var(--cf-radius) - 4px); border: none; background: hsl(var(--cf-primary)); color: hsl(var(--cf-primary-fg)); display: flex; align-items: center; justify-content: center; flex-shrink: 0; opacity: 0.4; }
`;

const ChatFlapDemo = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const style = document.createElement("style");
    style.textContent = CHAT_FLAP_CSS;
    root.appendChild(style);

    const wrapper = document.createElement("div");
    wrapper.className = "cf-root";
    wrapper.innerHTML = `
      <div class="cf-wrapper">
        <div class="cf-msg-user">
          <div class="cf-bubble">What are the main differences between quantum computing and classical computing?</div>
          <div class="cf-avatar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M5 20c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </div>
        </div>
        <div class="cf-msg-bot">
          <div class="cf-avatar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.5" fill="currentColor"/><ellipse cx="12" cy="5" rx="2" ry="2.5" fill="currentColor" opacity="0.8"/><ellipse cx="12" cy="19" rx="2" ry="2.5" fill="currentColor" opacity="0.8"/><ellipse cx="5.5" cy="8.5" rx="2" ry="2.5" transform="rotate(-60 5.5 8.5)" fill="currentColor" opacity="0.8"/><ellipse cx="18.5" cy="15.5" rx="2" ry="2.5" transform="rotate(-60 18.5 15.5)" fill="currentColor" opacity="0.8"/><ellipse cx="5.5" cy="15.5" rx="2" ry="2.5" transform="rotate(60 5.5 15.5)" fill="currentColor" opacity="0.8"/><ellipse cx="18.5" cy="8.5" rx="2" ry="2.5" transform="rotate(60 18.5 8.5)" fill="currentColor" opacity="0.8"/></svg>
          </div>
          <div class="cf-bot-content">
            <div class="cf-response-card">
              <div class="cf-status-line" id="cf-status-line" aria-hidden="true"></div>
              <div class="cf-skeleton-lines">
                <div class="cf-skeleton-line" style="width:92%"></div>
                <div class="cf-skeleton-line" style="width:78%"></div>
                <div class="cf-skeleton-line" style="width:85%"></div>
                <div class="cf-skeleton-line" style="width:45%"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="cf-input-area">
          <div class="cf-input-container">
            <div class="cf-icon-btn" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
            <div class="cf-fake-input" aria-hidden="true">Ask anything...</div>
            <div class="cf-send-btn" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 19V5m0 0-5 5m5-5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
          </div>
        </div>
      </div>
    `;
    root.appendChild(wrapper);

    const statusLine = wrapper.querySelector("#cf-status-line") as HTMLElement;
    const PHRASES = ["Pulling at threads","Sifting through noise","Connecting fragments","Weighing perspectives","Tracing the outline","Letting it crystallize","Almost there"];
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,-!?";
    const TICK_MS = 60;
    const STAGGER_MS = 55;
    const SETTLE_TICKS = 5;
    const PHRASE_HOLD_MS = 3500;

    interface Slot { el: HTMLSpanElement; interval: ReturnType<typeof setInterval> | null; resolved: boolean; }
    let slots: Slot[] = [];
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    function randomChar() { return CHARS[Math.floor(Math.random() * CHARS.length)]; }

    function createSlot(): Slot {
      const span = document.createElement("span");
      span.className = "cf-flap-char cf-rolling";
      span.textContent = randomChar();
      return { el: span, interval: null, resolved: false };
    }

    function transitionTo(phrase: string) {
      const target = phrase.split("");
      const prevLen = slots.length;
      const newLen = target.length;

      while (slots.length < newLen) {
        const slot = createSlot();
        statusLine.appendChild(slot.el);
        slots.push(slot);
      }

      for (let i = 0; i < newLen; i++) {
        const slot = slots[i];
        const char = target[i];
        if (slot.interval) clearInterval(slot.interval);
        slot.resolved = false;
        slot.el.className = "cf-flap-char cf-rolling" + (char === " " ? " cf-space" : "");
        slot.interval = setInterval(() => { slot.el.textContent = randomChar(); }, TICK_MS);
        const tid = setTimeout(() => {
          if (slot.interval) clearInterval(slot.interval);
          slot.interval = null;
          slot.resolved = true;
          slot.el.textContent = char === " " ? "\u00A0" : char;
          slot.el.className = "cf-flap-char cf-resolved" + (char === " " ? " cf-space" : "");
        }, STAGGER_MS * i + TICK_MS * SETTLE_TICKS);
        timeouts.push(tid);
      }

      for (let i = newLen; i < prevLen; i++) {
        const slot = slots[i];
        if (slot.interval) clearInterval(slot.interval);
        slot.interval = setInterval(() => { slot.el.textContent = randomChar(); }, TICK_MS);
        const removeDelay = STAGGER_MS * i + TICK_MS * SETTLE_TICKS;
        const tid = setTimeout(() => {
          if (slot.interval) clearInterval(slot.interval);
          slot.el.textContent = "\u00A0";
          slot.el.style.transition = "opacity 200ms ease, width 200ms ease";
          slot.el.style.opacity = "0";
          slot.el.style.width = "0";
          const tid2 = setTimeout(() => slot.el.remove(), 220);
          timeouts.push(tid2);
        }, removeDelay);
        timeouts.push(tid);
      }

      if (newLen < prevLen) slots.length = newLen;
    }

    let phraseIndex = 0;
    function nextPhrase() {
      transitionTo(PHRASES[phraseIndex]);
      phraseIndex = (phraseIndex + 1) % PHRASES.length;
    }
    nextPhrase();
    const intervalId = setInterval(nextPhrase, PHRASE_HOLD_MS);

    return () => {
      clearInterval(intervalId);
      timeouts.forEach(clearTimeout);
      slots.forEach(s => { if (s.interval) clearInterval(s.interval); });
      root.innerHTML = "";
    };
  }, []);

  return <div ref={rootRef} />;
};

const chatFlapCode = `// Split-flap display — cycle through thinking phrases
const PHRASES = ["Pulling at threads", "Sifting through noise",
  "Connecting fragments", "Letting it crystallize"];
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const TICK_MS = 60, STAGGER_MS = 55, SETTLE_TICKS = 5;

function transitionTo(phrase) {
  const target = phrase.split("");

  // Grow/shrink slot spans to match phrase length
  while (slots.length < target.length) {
    const span = document.createElement("span");
    span.className = "flap-char rolling";
    statusLine.appendChild(span);
    slots.push({ el: span, interval: null });
  }

  // Roll each slot through random chars, then settle
  for (let i = 0; i < target.length; i++) {
    const slot = slots[i];
    slot.interval = setInterval(() => {
      slot.el.textContent = randomChar();
    }, TICK_MS);

    // Resolve with left-to-right stagger
    setTimeout(() => {
      clearInterval(slot.interval);
      slot.el.textContent = target[i];
      slot.el.className = "flap-char resolved";
    }, STAGGER_MS * i + TICK_MS * SETTLE_TICKS);
  }
}

setInterval(nextPhrase, 3500);`;

/* ---- Experiment: Variable Font Animator ---- */
const variableFontHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Variable Font Animator</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,slnt,wdth,wght,GRAD,ROND@6..144,-10..0,25..151,1..1000,0..100,0..100&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,slnt,wdth,wght,GRAD@8..144,-10..0,25..151,100..1000,-200..150&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { height: 100%; overflow: hidden; }
    body { font-family: 'Google Sans Flex', system-ui, sans-serif; font-weight: 400; color: #000; background: #ece8e1; }
    .app { display: grid; grid-template-columns: 1fr 440px; height: 100vh; max-width: 1400px; margin: 0 auto; border-left: 4px solid #000; border-right: 4px solid #000; }
    .col-preview { background: #faf8f5; border-right: 4px solid #000; display: flex; flex-direction: column; overflow: hidden; }
    .panel-input { background: #faf8f5; padding: 16px 24px; border-bottom: 3px solid #000; }
    .preview { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; flex: 1; padding: 32px 24px; }
    .letter { font-family: 'Google Sans Flex', sans-serif; font-size: 160px; line-height: 1; transition: none; display: inline-block; }
    .col-settings { background: #f5f2ed; display: flex; flex-direction: column; height: 100vh; }
    .panel { padding: 18px 24px; border-bottom: 2px solid #000; }
    .panel:last-child { border-bottom: none; flex: 1; display: flex; flex-direction: column; }
    h2 { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.18em; color: #fff; background: #000; padding: 5px 10px; display: inline-block; margin-bottom: 16px; }
    .control-row { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
    .control-row:last-child { margin-bottom: 0; }
    .control-row label { min-width: 105px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #444; }
    .char-input { flex: 1; text-align: center; font-size: 20px; font-family: 'Google Sans Flex', sans-serif; font-weight: 700; padding: 10px 14px; border: 3px solid #000; border-radius: 0; outline: none; background: #faf8f5; transition: background 0.1s; }
    .char-input:focus { background: #d4ff00; }
    .dual-range { flex: 1; position: relative; height: 16px; }
    .dual-range input[type="range"] { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; background: transparent; }
    .dual-range input[type="range"]::-webkit-slider-thumb { pointer-events: all; }
    .dual-range input[type="range"]::-moz-range-thumb { pointer-events: all; }
    .dual-range input[type="range"]:first-child { background: #c5c0b8; }
    input[type="range"] { flex: 1; -webkit-appearance: none; appearance: none; height: 2px; background: #c5c0b8; border-radius: 0; outline: none; cursor: pointer; }
    input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 0; background: #000; cursor: pointer; border: none; transition: background 0.1s; }
    input[type="range"]::-webkit-slider-thumb:hover { background: #d4ff00; box-shadow: 0 0 0 2px #000; }
    input[type="range"]::-webkit-slider-thumb:active { background: #d4ff00; box-shadow: 0 0 0 2px #000; }
    input[type="range"]::-moz-range-thumb { width: 16px; height: 16px; border-radius: 0; background: #000; cursor: pointer; border: none; }
    input[type="range"]::-moz-range-thumb:hover { background: #d4ff00; box-shadow: 0 0 0 2px #000; }
    .value { min-width: 40px; text-align: center; font-size: 12px; font-weight: 800; font-variant-numeric: tabular-nums; color: #000; background: #faf8f5; border: 2px solid #000; padding: 3px 6px; }
    .unit { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #999; min-width: 32px; }
    .custom-select { flex: 1; position: relative; user-select: none; }
    .custom-select-trigger { font-size: 11px; font-family: 'Google Sans Flex', sans-serif; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; padding: 8px 12px; border: 2px solid #000; background: #faf8f5; cursor: pointer; display: flex; align-items: center; justify-content: space-between; }
    .custom-select-trigger::after { content: ''; width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid #000; margin-left: 10px; }
    .custom-select.open .custom-select-trigger { background: #d4ff00; }
    .custom-select.open .custom-select-trigger::after { border-top: none; border-bottom: 5px solid #000; }
    .custom-select-options { display: none; position: absolute; top: 100%; left: 0; right: 0; border: 2px solid #000; border-top: none; background: #faf8f5; z-index: 100; }
    .custom-select.open .custom-select-options { display: block; }
    .custom-select-option { font-size: 11px; font-family: 'Google Sans Flex', sans-serif; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; padding: 8px 12px; cursor: pointer; transition: background 0.08s; }
    .custom-select-option:hover { background: #d4ff00; }
    .custom-select-option.selected { background: #000; color: #d4ff00; }
    .buttons { display: flex; gap: 0; margin-top: auto; padding-top: 14px; }
    button, .btn-link { font-family: 'Google Sans Flex', sans-serif; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; padding: 12px 24px; border: 3px solid #000; border-radius: 0; background: #faf8f5; cursor: pointer; color: #000; text-decoration: none; transition: all 0.08s; display: inline-flex; align-items: center; }
    button + .btn-link { border-left: none; }
    button:hover, .btn-link:hover { background: #d4ff00; }
    button:active, .btn-link:active { background: #000; color: #d4ff00; }
    button.paused { background: #000; color: #d4ff00; border-color: #000; }
    button.paused:hover { background: #1a1a1a; }
    @media (max-width: 860px) { html, body { overflow: auto; } .app { grid-template-columns: 1fr; height: auto; } .col-preview { min-height: 240px; border-right: none; border-bottom: 6px solid #000; } .col-settings { height: auto; } }
  </style>
</head>
<body>
  <div class="app">
    <div class="col-preview">
      <div class="panel panel-input">
        <div class="control-row">
          <label>Typo</label>
          <div class="custom-select" id="fontSelect" data-value="Google Sans Flex">
            <div class="custom-select-trigger">Google Sans Flex</div>
            <div class="custom-select-options">
              <div class="custom-select-option selected" data-value="Google Sans Flex">Google Sans Flex</div>
              <div class="custom-select-option" data-value="Roboto Flex">Roboto Flex</div>
            </div>
          </div>
        </div>
        <div class="control-row">
          <label>Mot</label>
          <input type="text" id="wordInput" value="Hello" class="char-input">
        </div>
      </div>
      <div class="preview" id="preview">
        <span class="letter">H</span><span class="letter">e</span><span class="letter">l</span><span class="letter">l</span><span class="letter">o</span>
      </div>
    </div>
    <div class="col-settings">
      <div class="panel">
        <h2>Axes variables anim\\u00e9s</h2>
        <div class="control-row">
          <label>Weight</label>
          <span class="value" id="wghtMinVal">100</span>
          <div class="dual-range">
            <input type="range" id="wghtMin" min="1" max="1000" value="100" step="1">
            <input type="range" id="wghtMax" min="1" max="1000" value="900" step="1">
          </div>
          <span class="value" id="wghtMaxVal">900</span>
        </div>
        <div class="control-row">
          <label>Grade</label>
          <span class="value" id="gradMinVal">0</span>
          <div class="dual-range">
            <input type="range" id="gradMin" min="0" max="100" value="0" step="1">
            <input type="range" id="gradMax" min="0" max="100" value="100" step="1">
          </div>
          <span class="value" id="gradMaxVal">100</span>
        </div>
        <div class="control-row">
          <label>Slant</label>
          <span class="value" id="slntMinVal">-10</span>
          <div class="dual-range">
            <input type="range" id="slntMin" min="-10" max="0" value="-10" step="0.5">
            <input type="range" id="slntMax" min="-10" max="0" value="0" step="0.5">
          </div>
          <span class="value" id="slntMaxVal">0</span>
        </div>
        <div class="control-row" id="rondRow">
          <label>Roundness</label>
          <span class="value" id="rondMinVal">0</span>
          <div class="dual-range">
            <input type="range" id="rondMin" min="0" max="100" value="0" step="1">
            <input type="range" id="rondMax" min="0" max="100" value="100" step="1">
          </div>
          <span class="value" id="rondMaxVal">100</span>
        </div>
      </div>
      <div class="panel">
        <h2>Animation</h2>
        <div class="control-row">
          <label>Vitesse</label>
          <input type="range" id="speed" min="0.1" max="10" value="1.0" step="0.1">
          <span class="value" id="speedVal">1.0</span>
          <span class="unit">s/cycle</span>
        </div>
        <div class="control-row">
          <label>Taille</label>
          <input type="range" id="size" min="20" max="600" value="160" step="1">
          <span class="value" id="sizeVal">160</span>
          <span class="unit">px</span>
        </div>
        <div class="control-row">
          <label>Easing</label>
          <div class="custom-select" id="easing" data-value="cubic">
            <div class="custom-select-trigger">Cubique</div>
            <div class="custom-select-options">
              <div class="custom-select-option" data-value="linear">Lin\\u00e9aire</div>
              <div class="custom-select-option selected" data-value="cubic">Cubique</div>
              <div class="custom-select-option" data-value="sine">Sinuso\\u00efdal</div>
              <div class="custom-select-option" data-value="elastic">\\u00c9lastique</div>
              <div class="custom-select-option" data-value="bounce">Rebond</div>
            </div>
          </div>
        </div>
        <div class="control-row">
          <label>D\\u00e9calage lettres</label>
          <input type="range" id="letterOffset" min="0" max="100" value="15" step="1">
          <span class="value" id="letterOffsetVal">15</span>
          <span class="unit">%</span>
        </div>
        <div class="buttons">
          <button id="pauseBtn">Pause</button>
          <a href="https://fonts.google.com/specimen/Google+Sans+Flex" target="_blank" class="btn-link">Google Sans Flex \\u2197</a>
        </div>
      </div>
    </div>
  </div>
  <script>
    const preview = document.getElementById('preview');
    const wordInput = document.getElementById('wordInput');
    const pauseBtn = document.getElementById('pauseBtn');
    const fontSelectEl = document.getElementById('fontSelect');
    const easingEl = document.getElementById('easing');
    function initCustomSelect(el, onChange) {
      const trigger = el.querySelector('.custom-select-trigger');
      const options = el.querySelectorAll('.custom-select-option');
      trigger.addEventListener('click', (e) => { e.stopPropagation(); document.querySelectorAll('.custom-select.open').forEach(s => { if (s !== el) s.classList.remove('open'); }); el.classList.toggle('open'); });
      options.forEach(opt => { opt.addEventListener('click', (e) => { e.stopPropagation(); const val = opt.dataset.value; el.dataset.value = val; trigger.textContent = opt.textContent; el.querySelectorAll('.custom-select-option').forEach(o => o.classList.remove('selected')); opt.classList.add('selected'); el.classList.remove('open'); if (onChange) onChange(val); }); });
    }
    document.addEventListener('click', () => { document.querySelectorAll('.custom-select.open').forEach(s => s.classList.remove('open')); });
    const controls = { wghtMin: document.getElementById('wghtMin'), wghtMax: document.getElementById('wghtMax'), gradMin: document.getElementById('gradMin'), gradMax: document.getElementById('gradMax'), slntMin: document.getElementById('slntMin'), slntMax: document.getElementById('slntMax'), rondMin: document.getElementById('rondMin'), rondMax: document.getElementById('rondMax'), speed: document.getElementById('speed'), size: document.getElementById('size'), letterOffset: document.getElementById('letterOffset') };
    const fontConfigs = { 'Google Sans Flex': { axes: ['wght', 'GRAD', 'slnt', 'ROND'], ranges: { wght: [1, 1000], GRAD: [0, 100], slnt: [-10, 0], ROND: [0, 100] } }, 'Roboto Flex': { axes: ['wght', 'GRAD', 'slnt'], ranges: { wght: [100, 1000], GRAD: [-200, 150], slnt: [-10, 0] } } };
    function getFont() { return fontSelectEl.dataset.value; }
    function getEasing() { return easingEl.dataset.value; }
    function applyFontConfig(fontName) { const config = fontConfigs[fontName]; if (!config) return; const r = config.ranges; if (r.wght) { controls.wghtMin.min = r.wght[0]; controls.wghtMin.max = r.wght[1]; controls.wghtMax.min = r.wght[0]; controls.wghtMax.max = r.wght[1]; } if (r.GRAD) { controls.gradMin.min = r.GRAD[0]; controls.gradMin.max = r.GRAD[1]; controls.gradMax.min = r.GRAD[0]; controls.gradMax.max = r.GRAD[1]; controls.gradMin.value = r.GRAD[0]; controls.gradMax.value = r.GRAD[1]; values.gradMin.textContent = r.GRAD[0]; values.gradMax.textContent = r.GRAD[1]; } if (r.slnt) { controls.slntMin.min = r.slnt[0]; controls.slntMin.max = r.slnt[1]; controls.slntMax.min = r.slnt[0]; controls.slntMax.max = r.slnt[1]; } const hasRond = config.axes.includes('ROND'); const rondRow = document.getElementById('rondRow'); if (rondRow) rondRow.style.display = hasRond ? '' : 'none'; preview.querySelectorAll('.letter').forEach(el => { el.style.fontFamily = "'" + fontName + "', sans-serif"; }); }
    initCustomSelect(fontSelectEl, (val) => applyFontConfig(val));
    initCustomSelect(easingEl);
    const values = { wghtMin: document.getElementById('wghtMinVal'), wghtMax: document.getElementById('wghtMaxVal'), gradMin: document.getElementById('gradMinVal'), gradMax: document.getElementById('gradMaxVal'), slntMin: document.getElementById('slntMinVal'), slntMax: document.getElementById('slntMaxVal'), rondMin: document.getElementById('rondMinVal'), rondMax: document.getElementById('rondMaxVal'), speed: document.getElementById('speedVal'), size: document.getElementById('sizeVal'), letterOffset: document.getElementById('letterOffsetVal') };
    Object.keys(controls).forEach(key => { controls[key].addEventListener('input', () => { values[key].textContent = controls[key].value; }); });
    function buildLetters(word) { preview.innerHTML = ''; const fontName = getFont(); for (const ch of word) { const span = document.createElement('span'); span.className = 'letter'; span.style.fontFamily = "'" + fontName + "', sans-serif"; if (ch === ' ') { span.innerHTML = '&nbsp;'; } else { span.textContent = ch; } preview.appendChild(span); } updateSize(); }
    function updateSize() { const size = controls.size.value + 'px'; preview.querySelectorAll('.letter').forEach(el => { el.style.fontSize = size; }); }
    wordInput.addEventListener('input', () => { const word = wordInput.value || 'A'; buildLetters(word); });
    controls.size.addEventListener('input', updateSize);
    const easings = { linear: t => t, cubic: t => t < 0.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2, sine: t => -(Math.cos(Math.PI*t)-1)/2, elastic: t => { if (t===0||t===1) return t; return t<0.5 ? -(Math.pow(2,20*t-10)*Math.sin((20*t-11.125)*(2*Math.PI)/4.5))/2 : (Math.pow(2,-20*t+10)*Math.sin((20*t-11.125)*(2*Math.PI)/4.5))/2+1; }, bounce: t => { const bounceOut = t => { const n1=7.5625,d1=2.75; if(t<1/d1) return n1*t*t; if(t<2/d1) return n1*(t-=1.5/d1)*t+0.75; if(t<2.5/d1) return n1*(t-=2.25/d1)*t+0.9375; return n1*(t-=2.625/d1)*t+0.984375; }; return t<0.5 ? (1-bounceOut(1-2*t))/2 : (1+bounceOut(2*t-1))/2; } };
    function getPingPong(time, cycleDuration) { const raw = ((time%(cycleDuration*2))+cycleDuration*2)%(cycleDuration*2)/cycleDuration; return raw<=1?raw:2-raw; }
    function lerp(a,b,t) { return a+(b-a)*t; }
    let paused = false; let startTime = performance.now(); let pauseTime = 0;
    pauseBtn.addEventListener('click', () => { paused=!paused; pauseBtn.textContent=paused?'Lecture':'Pause'; pauseBtn.classList.toggle('paused',paused); if(paused){pauseTime=performance.now()}else{startTime+=performance.now()-pauseTime} });
    function animate(now) { requestAnimationFrame(animate); if(paused) return; const letters=preview.querySelectorAll('.letter'); if(letters.length===0) return; const cycleDuration=parseFloat(controls.speed.value)*1000; const letterOffsetRatio=parseFloat(controls.letterOffset.value)/100; const easeFn=easings[getEasing()]||easings.cubic; const wghtMin=parseFloat(controls.wghtMin.value); const wghtMax=parseFloat(controls.wghtMax.value); const gradMin=parseFloat(controls.gradMin.value); const gradMax=parseFloat(controls.gradMax.value); const slntMin=parseFloat(controls.slntMin.value); const slntMax=parseFloat(controls.slntMax.value); const rondMin=parseFloat(controls.rondMin.value); const rondMax=parseFloat(controls.rondMax.value); const elapsed=now-startTime; const count=letters.length; letters.forEach((el,i) => { const letterPhase=count>1?(i/(count-1))*letterOffsetRatio*cycleDuration:0; const t=easeFn(getPingPong(elapsed+letterPhase,cycleDuration)); const wght=lerp(wghtMin,wghtMax,t); const grad=lerp(gradMin,gradMax,t); const slnt=lerp(slntMin,slntMax,t); const rond=lerp(rondMin,rondMax,t); const config=fontConfigs[getFont()]; let fvs='"wght" '+wght+', "GRAD" '+grad+', "slnt" '+slnt; if(config&&config.axes.includes('ROND')){fvs+=', "ROND" '+rond} el.style.fontVariationSettings=fvs; }); }
    requestAnimationFrame(animate);
  </script>
</body>
</html>`;

const VariableFontDemo = () => {
  return (
    <iframe
      srcDoc={variableFontHtml}
      style={{
        width: "100%",
        height: 600,
        border: "none",
        borderRadius: 12,
        background: "#ece8e1",
      }}
      title="Variable Font Animator"
    />
  );
};

const variableFontCode = variableFontHtml;

/* ---- Experiment 7: Daily UI #001 — Sign Up (Liquid Glass) ---- */
const signUpGlassHtml = `<!DOCTYPE html>
<html lang="fr" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daily UI #001 — Sign Up</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --cols: 12; --col-gap: 12px; --margin: 16px; --grid-max: 1200px;
      --col-color: rgba(255, 59, 48, 0.06); --baseline: 8px;
      --baseline-color: rgba(0, 122, 255, 0.04);
      --label-color: rgba(255, 59, 48, 0.35);
      --bg: #e8e4e0;
      --glass-bg: rgba(255,255,255,0.32);
      --glass-border: rgba(255,255,255,0.60);
      --glass-border-top: rgba(255,255,255,0.80);
      --glass-border-bottom: rgba(0,0,0,0.03);
      --glass-shadow: 0 0 0 0.5px rgba(255,255,255,0.5), 0 1px 1px rgba(0,0,0,0.02), 0 4px 8px rgba(0,0,0,0.03), 0 16px 40px rgba(0,0,0,0.05), inset 0 0.5px 0 rgba(255,255,255,0.7);
      --clear-bg: rgba(255,255,255,0.45);
      --clear-border: rgba(255,255,255,0.65);
      --clear-shadow: inset 0 0.5px 0 rgba(255,255,255,0.7), 0 1px 2px rgba(0,0,0,0.03);
      --active-bg: rgba(0,0,0,0.72);
      --active-border: rgba(255,255,255,0.06);
      --active-text: #fff;
      --text: #1a1a1a;
      --text-secondary: rgba(0,0,0,0.48);
      --text-tertiary: rgba(0,0,0,0.25);
      --link: rgba(0,0,0,0.55);
      --link-hover: #000;
      --divider: rgba(0,0,0,0.05);
      --focus-ring: rgba(0,122,255,0.20);
      --focus-border: rgba(0,122,255,0.45);
      --avatar-text: rgba(0,0,0,0.45);
      --blob-1: rgba(139,92,246,0.20);
      --blob-2: rgba(251,113,133,0.15);
      --blob-3: rgba(56,189,248,0.13);
      --blob-4: rgba(250,204,21,0.10);
      --theme-btn-bg: rgba(255,255,255,0.40);
      --theme-btn-border: rgba(255,255,255,0.60);
      --theme-btn-hover: rgba(255,255,255,0.60);
      --theme-btn-color: rgba(0,0,0,0.35);
    }
    [data-theme="dark"] {
      --col-color: rgba(255, 59, 48, 0.04);
      --baseline-color: rgba(0, 122, 255, 0.03);
      --label-color: rgba(255, 59, 48, 0.22);
      --bg: #111113;
      --glass-bg: rgba(255,255,255,0.05);
      --glass-border: rgba(255,255,255,0.08);
      --glass-border-top: rgba(255,255,255,0.12);
      --glass-border-bottom: rgba(255,255,255,0.03);
      --glass-shadow: 0 0 0 0.5px rgba(255,255,255,0.06), 0 1px 1px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1), 0 16px 40px rgba(0,0,0,0.18), inset 0 0.5px 0 rgba(255,255,255,0.06);
      --clear-bg: rgba(255,255,255,0.04);
      --clear-border: rgba(255,255,255,0.07);
      --clear-shadow: inset 0 0.5px 0 rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.12);
      --active-bg: rgba(255,255,255,0.13);
      --active-border: rgba(255,255,255,0.10);
      --active-text: #fff;
      --text: #f2f2f2;
      --text-secondary: rgba(255,255,255,0.48);
      --text-tertiary: rgba(255,255,255,0.20);
      --link: rgba(255,255,255,0.55);
      --link-hover: #fff;
      --divider: rgba(255,255,255,0.05);
      --focus-ring: rgba(50,140,255,0.12);
      --focus-border: rgba(50,140,255,0.42);
      --avatar-text: rgba(255,255,255,0.4);
      --blob-1: rgba(139,92,246,0.24);
      --blob-2: rgba(251,113,133,0.17);
      --blob-3: rgba(56,189,248,0.14);
      --blob-4: rgba(250,204,21,0.08);
      --theme-btn-bg: rgba(255,255,255,0.04);
      --theme-btn-border: rgba(255,255,255,0.07);
      --theme-btn-hover: rgba(255,255,255,0.08);
      --theme-btn-color: rgba(255,255,255,0.30);
    }
    body { font-family: 'Inter', -apple-system, system-ui, sans-serif; min-height: 100vh; background: var(--bg); overflow: auto; transition: background 0.4s; -webkit-font-smoothing: antialiased; }
    .grid-overlay { position: fixed; inset: 0; z-index: 1; display: flex; justify-content: center; pointer-events: none; }
    .grid-container { width: 100%; max-width: var(--grid-max); margin: 0 var(--margin); position: relative; display: grid; grid-template-columns: repeat(var(--cols), 1fr); grid-template-rows: 1fr; gap: 0 var(--col-gap); align-items: center; }
    .grid-col { background: var(--col-color); position: relative; height: 100%; }
    .grid-col::before { content: attr(data-col); position: absolute; top: 6px; left: 50%; transform: translateX(-50%); font-family: 'Inter', sans-serif; font-size: 9px; font-weight: 500; color: var(--label-color); line-height: 1; }
    .grid-baseline { position: fixed; inset: 0; z-index: 0; pointer-events: none; background-image: repeating-linear-gradient(0deg, var(--baseline-color) 0px, var(--baseline-color) 1px, transparent 1px, transparent var(--baseline)); }
    .grid-margin-left, .grid-margin-right { position: fixed; top: 0; bottom: 0; width: var(--margin); z-index: 0; pointer-events: none; border-style: solid; border-color: rgba(255, 59, 48, 0.08); border-width: 0; }
    .grid-margin-left { left: 0; border-right-width: 1px; }
    .grid-margin-right { right: 0; border-left-width: 1px; }
    .bg-blobs { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
    .blob { position: absolute; border-radius: 50%; filter: blur(90px); will-change: transform; transition: background 0.4s; }
    .blob-1 { width: 500px; height: 500px; background: var(--blob-1); top: -12%; left: -6%; animation: d1 20s ease-in-out infinite; }
    .blob-2 { width: 420px; height: 420px; background: var(--blob-2); bottom: -10%; right: -7%; animation: d2 24s ease-in-out infinite; }
    .blob-3 { width: 340px; height: 340px; background: var(--blob-3); top: 35%; left: 58%; animation: d3 17s ease-in-out infinite; }
    .blob-4 { width: 260px; height: 260px; background: var(--blob-4); top: 62%; left: 12%; animation: d4 22s ease-in-out infinite; }
    @keyframes d1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(65px,35px) scale(1.06)} }
    @keyframes d2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-50px,-20px) scale(1.1)} }
    @keyframes d3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-35px,25px) scale(0.9)} }
    @keyframes d4 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-30px) scale(1.07)} }
    .theme-toggle { position: fixed; top: 1.2rem; right: 1.2rem; z-index: 10; width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--theme-btn-border); background: var(--theme-btn-bg); backdrop-filter: blur(24px) saturate(1.6); -webkit-backdrop-filter: blur(24px) saturate(1.6); box-shadow: var(--clear-shadow); color: var(--theme-btn-color); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.25s; }
    .theme-toggle:hover { background: var(--theme-btn-hover); }
    .theme-toggle svg { width: 14px; height: 14px; }
    .theme-toggle .icon-moon { display: none; }
    [data-theme="dark"] .theme-toggle .icon-sun { display: none; }
    [data-theme="dark"] .theme-toggle .icon-moon { display: block; }
    .card { position: relative; z-index: 2; pointer-events: auto; padding: 32px var(--col-gap) 24px; border-radius: 20px; backdrop-filter: blur(50px) saturate(1.8); -webkit-backdrop-filter: blur(50px) saturate(1.8); background: var(--glass-bg); border: 1px solid var(--glass-border); border-top-color: var(--glass-border-top); border-bottom-color: var(--glass-border-bottom); box-shadow: var(--glass-shadow); transition: background 0.4s, border-color 0.4s, box-shadow 0.4s; }
    .card::before { content: ''; position: absolute; top: 0; left: 10%; right: 10%; height: 1px; background: var(--glass-border-top); opacity: 0.6; pointer-events: none; }
    .avatar-area { display: flex; flex-direction: column; align-items: center; margin-bottom: 20px; position: relative; z-index: 1; }
    .avatar { width: 64px; height: 64px; border-radius: 16px; background: var(--clear-bg); border: 1px solid var(--clear-border); border-top-color: var(--glass-border-top); border-bottom-color: var(--glass-border-bottom); backdrop-filter: blur(20px) saturate(1.5); -webkit-backdrop-filter: blur(20px) saturate(1.5); box-shadow: var(--clear-shadow); display: flex; align-items: center; justify-content: center; margin-bottom: 8px; transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); position: relative; }
    .avatar::before { content: ''; position: absolute; top: 0; left: 15%; right: 15%; height: 1px; background: var(--clear-border); opacity: 0.5; pointer-events: none; }
    .avatar.has-initials { transform: scale(1.06); }
    .avatar-placeholder { color: var(--text-tertiary); transition: opacity 0.3s; }
    .avatar-placeholder svg { width: 24px; height: 24px; }
    .avatar-initials { font-size: 1.2rem; font-weight: 600; color: var(--avatar-text); letter-spacing: 0.02em; position: relative; z-index: 1; opacity: 0; transform: scale(0.5); transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
    .avatar.has-initials .avatar-initials { opacity: 1; transform: scale(1); }
    .avatar.has-initials .avatar-placeholder { opacity: 0; position: absolute; }
    .avatar-label { font-size: 0.68rem; font-weight: 500; color: var(--text-tertiary); transition: all 0.3s; height: 16px; line-height: 16px; }
    .avatar-label.active { color: var(--text-secondary); }
    .header { text-align: center; margin-bottom: 24px; position: relative; z-index: 1; }
    .header h1 { font-size: 1.28rem; font-weight: 600; color: var(--text); margin-bottom: 4px; letter-spacing: -0.01em; }
    .header p { font-size: 0.76rem; color: var(--text-secondary); }
    .header p a { color: var(--link); text-decoration: none; transition: color 0.2s; }
    .header p a:hover { color: var(--link-hover); }
    .social-row { display: flex; gap: var(--col-gap); margin-bottom: 16px; position: relative; z-index: 1; }
    .social-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; height: 40px; border-radius: 10px; border: 1px solid var(--clear-border); border-top-color: var(--glass-border-top); border-bottom-color: var(--glass-border-bottom); background: var(--clear-bg); backdrop-filter: blur(16px) saturate(1.4); -webkit-backdrop-filter: blur(16px) saturate(1.4); box-shadow: var(--clear-shadow); color: var(--text-secondary); font-size: 0.76rem; font-weight: 500; font-family: inherit; cursor: pointer; transition: all 0.2s; position: relative; }
    .social-btn::before { content: ''; position: absolute; top: 0; left: 18%; right: 18%; height: 1px; background: var(--clear-border); opacity: 0.4; pointer-events: none; }
    .social-btn:hover { background: rgba(255,255,255,0.55); }
    [data-theme="dark"] .social-btn:hover { background: rgba(255,255,255,0.07); }
    .social-btn svg { width: 15px; height: 15px; flex-shrink: 0; position: relative; z-index: 1; }
    .social-btn span { position: relative; z-index: 1; }
    .divider { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; position: relative; z-index: 1; }
    .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: var(--divider); }
    .divider span { font-size: 0.62rem; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.1em; }
    .form-wrap { position: relative; z-index: 1; }
    .row { display: flex; gap: var(--col-gap); }
    .field { margin-bottom: 12px; flex: 1; }
    .field label { display: block; font-size: 0.66rem; font-weight: 500; color: var(--text-secondary); margin-bottom: 4px; letter-spacing: 0.01em; line-height: 16px; }
    .input-wrap { position: relative; border-radius: 10px; overflow: hidden; }
    .input-wrap::before { content: ''; position: absolute; top: 0; left: 15%; right: 15%; height: 1px; background: var(--clear-border); opacity: 0.3; z-index: 2; pointer-events: none; }
    .field input { width: 100%; height: 40px; padding: 0 12px; border-radius: 10px; border: 1px solid var(--clear-border); border-top-color: var(--glass-border-top); border-bottom-color: var(--glass-border-bottom); background: var(--clear-bg); backdrop-filter: blur(12px) saturate(1.3); -webkit-backdrop-filter: blur(12px) saturate(1.3); box-shadow: var(--clear-shadow); color: var(--text); font-size: 0.82rem; font-family: inherit; outline: none; transition: all 0.25s; }
    .field input::placeholder { color: var(--text-tertiary); }
    .field input:focus { border-color: var(--focus-border); box-shadow: 0 0 0 3.5px var(--focus-ring), var(--clear-shadow); }
    .pw-wrap { position: relative; }
    .pw-wrap .input-wrap input { padding-right: 40px; }
    .pw-toggle { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); z-index: 3; background: none; border: none; color: var(--text-tertiary); cursor: pointer; padding: 4px; transition: color 0.2s; display: flex; }
    .pw-toggle:hover { color: var(--text-secondary); }
    .pw-toggle svg { width: 14px; height: 14px; }
    .strength { display: flex; gap: 3px; margin-top: 4px; }
    .strength span { flex: 1; height: 2px; border-radius: 1px; background: var(--divider); transition: background 0.3s; }
    .strength span.on.s1 { background: #ef4444; }
    .strength span.on.s2 { background: #f59e0b; }
    .strength span.on.s3 { background: #10b981; }
    .terms { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 16px; }
    .terms input[type="checkbox"] { appearance: none; width: 16px; height: 16px; border-radius: 5px; border: 1px solid var(--clear-border); border-top-color: var(--glass-border-top); border-bottom-color: var(--glass-border-bottom); background: var(--clear-bg); backdrop-filter: blur(8px); box-shadow: var(--clear-shadow); cursor: pointer; flex-shrink: 0; margin-top: 2px; transition: all 0.2s; position: relative; }
    .terms input[type="checkbox"]:checked { background: rgba(0,122,255,0.70); border-color: rgba(0,122,255,0.10); }
    [data-theme="dark"] .terms input[type="checkbox"]:checked { background: rgba(50,140,255,0.60); }
    .terms input[type="checkbox"]:checked::after { content: ''; position: absolute; left: 4.5px; top: 1.5px; width: 4px; height: 8px; border: solid #fff; border-width: 0 1.5px 1.5px 0; transform: rotate(45deg); }
    .terms > span { font-size: 0.66rem; color: var(--text-secondary); line-height: 1.5; }
    .terms a { color: var(--link); text-decoration: none; }
    .terms a:hover { color: var(--link-hover); }
    .submit { width: 100%; height: 40px; border-radius: 10px; border: 1px solid var(--active-border); background: var(--active-bg); backdrop-filter: blur(20px) saturate(1.6); -webkit-backdrop-filter: blur(20px) saturate(1.6); box-shadow: inset 0 0.5px 0 rgba(255,255,255,0.06), 0 2px 6px rgba(0,0,0,0.08), 0 10px 30px rgba(0,0,0,0.10); color: var(--active-text); font-size: 0.82rem; font-weight: 500; font-family: inherit; cursor: pointer; transition: all 0.25s; position: relative; }
    .submit::before { content: ''; position: absolute; top: 0; left: 15%; right: 15%; height: 1px; background: rgba(255,255,255,0.10); pointer-events: none; }
    .submit:hover { filter: brightness(1.15); }
    .submit:active { transform: scale(0.98); }
    .submit span { position: relative; z-index: 1; }
    .submit.ok { background: rgba(16,185,129,0.75); border-color: rgba(16,185,129,0.15); pointer-events: none; }
    [data-theme="dark"] .submit.ok { background: rgba(16,185,129,0.35); }
    .grid-overlay { align-items: start; padding-top: 2rem; }
    .card { grid-column: 1 / -1 !important; margin: 0 auto; max-width: 420px; }
    .grid-col { display: none; }
    .grid-baseline, .grid-margin-left, .grid-margin-right { display: none; }
    @media (max-width: 480px) { .card { border-radius: 0; max-width: 100%; } .row { flex-direction: column; gap: 0; } .social-row { flex-direction: column; } }
  </style>
</head>
<body>
  <button class="theme-toggle" aria-label="Toggle theme">
    <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
    <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
  </button>
  <div class="grid-baseline"></div>
  <div class="grid-margin-left"></div>
  <div class="grid-margin-right"></div>
  <div class="bg-blobs">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
    <div class="blob blob-4"></div>
  </div>
  <div class="grid-overlay">
    <div class="grid-container" id="gridContainer">
      <div class="card" style="grid-column: 4 / 10; grid-row: 1;">
        <div class="avatar-area">
          <div class="avatar" id="avatar">
            <span class="avatar-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
            <span class="avatar-initials" id="avatarInitials"></span>
          </div>
          <span class="avatar-label" id="avatarLabel"></span>
        </div>
        <div class="header">
          <h1>Create an account</h1>
          <p>Already have one? <a href="#">Sign in</a></p>
        </div>
        <div class="social-row">
          <button class="social-btn"><svg viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg><span>Google</span></button>
          <button class="social-btn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg><span>GitHub</span></button>
        </div>
        <div class="divider"><span>or</span></div>
        <form id="form" class="form-wrap" novalidate>
          <div class="row">
            <div class="field"><label>First name</label><div class="input-wrap"><input type="text" id="fn" placeholder="Ada" autocomplete="given-name"></div></div>
            <div class="field"><label>Last name</label><div class="input-wrap"><input type="text" id="ln" placeholder="Lovelace" autocomplete="family-name"></div></div>
          </div>
          <div class="field"><label>Email</label><div class="input-wrap"><input type="email" id="email" placeholder="ada@example.com" autocomplete="email"></div></div>
          <div class="field"><label>Password</label><div class="pw-wrap"><div class="input-wrap"><input type="password" id="pw" placeholder="Min. 8 characters" autocomplete="new-password"></div><button type="button" class="pw-toggle" aria-label="Show password"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button></div><div class="strength"><span></span><span></span><span></span><span></span></div></div>
          <label class="terms"><input type="checkbox" id="tos"><span>I agree to the <a href="#">Terms</a> and <a href="#">Privacy Policy</a></span></label>
          <button type="submit" class="submit"><span>Create account</span></button>
        </form>
      </div>
    </div>
  </div>
  <script>
    const gc=document.getElementById('gridContainer'),card=gc.querySelector('.card');
    for(let i=1;i<=12;i++){const c=document.createElement('div');c.className='grid-col';c.dataset.col=i;c.style.gridColumn=i;c.style.gridRow='1';gc.insertBefore(c,card);}
    document.querySelector('.theme-toggle').addEventListener('click',()=>{const h=document.documentElement;h.dataset.theme=h.dataset.theme==='dark'?'light':'dark';});
    const fnI=document.getElementById('fn'),lnI=document.getElementById('ln'),av=document.getElementById('avatar'),avI=document.getElementById('avatarInitials'),avL=document.getElementById('avatarLabel');
    function updateAvatar(){const f=fnI.value.trim(),l=lnI.value.trim(),ini=(f?f[0]:'').toUpperCase()+(l?l[0]:'').toUpperCase();avI.textContent=ini;if(ini){av.classList.add('has-initials');avL.textContent=[f,l].filter(Boolean).join(' ');avL.classList.add('active');}else{av.classList.remove('has-initials');avL.textContent='';avL.classList.remove('active');}}
    fnI.addEventListener('input',updateAvatar);lnI.addEventListener('input',updateAvatar);
    const pw=document.getElementById('pw'),tog=document.querySelector('.pw-toggle');
    tog.addEventListener('click',()=>{const show=pw.type==='password';pw.type=show?'text':'password';tog.innerHTML=show?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';});
    const segs=document.querySelectorAll('.strength span');
    pw.addEventListener('input',()=>{const v=pw.value;let s=0;if(v.length>=4)s++;if(v.length>=8)s++;if(/[A-Z]/.test(v)&&/[a-z]/.test(v))s++;if(/[^a-zA-Z0-9]/.test(v))s++;const c=s<=1?'s1':s<=2?'s2':'s3';segs.forEach((el,i)=>{el.className=i<s?'on '+c:'';});});
    const form=document.getElementById('form'),btn=form.querySelector('.submit');
    form.addEventListener('submit',e=>{e.preventDefault();const ok=fnI.value.trim()&&document.getElementById('email').value.trim()&&pw.value.length>=8&&document.getElementById('tos').checked;if(!ok){btn.style.animation='shake .35s ease';btn.addEventListener('animationend',()=>btn.style.animation='',{once:true});return;}btn.classList.add('ok');btn.querySelector('span').textContent='Welcome!';});
    const sk=document.createElement('style');sk.textContent='@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}';document.head.appendChild(sk);
  </script>
</body>
</html>`;

const SignUpGlassDemo = () => {
  return (
    <iframe
      srcDoc={signUpGlassHtml}
      style={{
        width: "100%",
        height: 700,
        border: "none",
        borderRadius: 12,
        background: "#e8e4e0",
      }}
      title="Daily UI #001 — Sign Up"
    />
  );
};

const signUpGlassCode = signUpGlassHtml;

/* ---- Experiment 8: Daily UI #002 — Checkout (Terminal) ---- */
const checkoutTerminalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daily UI #002 — Checkout</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --fg: #24292f; --fg-bright: #1a1e24; --fg-muted: #656d76;
      --fg-accent: #0969da; --fg-green: #1a7f37; --fg-yellow: #9a6700;
      --fg-red: #cf222e; --fg-purple: #8250df;
      --bg: #f6f8fa; --bg-surface: #ffffff; --border: #d0d7de;
      --selection: rgba(9,105,218,0.08); --cursor: #0969da;
      --gutter-fg: #b0b8c1; --lh: 1.65; --flash: rgba(9,105,218,0.12);
    }
    html { background: var(--bg); }
    body { font-family: 'JetBrains Mono', 'Cascadia Code', 'Fira Code', monospace; font-size: 13px; line-height: var(--lh); color: var(--fg); background: var(--bg); min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem 1rem; -webkit-font-smoothing: antialiased; }
    .terminal { width: 100%; max-width: 78ch; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06); }
    .chrome { display: flex; align-items: center; padding: 10px 14px; background: var(--bg); border-bottom: 1px solid var(--border); gap: 8px; }
    .dots { display: flex; gap: 6px; }
    .dot { width: 12px; height: 12px; border-radius: 50%; cursor: pointer; transition: filter 0.2s; }
    .dot:hover { filter: brightness(0.9); }
    .dot.red { background: #ff5f57; } .dot.yellow { background: #febc2e; } .dot.green { background: #28c840; }
    .chrome-title { flex: 1; text-align: center; font-size: 11px; color: var(--fg-muted); }
    .content { padding: 0; white-space: pre; overflow-x: hidden; cursor: default; user-select: none; }
    .line { display: block; padding: 0 1ch 0 0; min-height: calc(1em * var(--lh)); transition: background 0.1s; }
    .line:hover { background: var(--selection); }
    .line.typing-hidden { opacity: 0; height: 0; min-height: 0; overflow: hidden; }
    .line.typing-visible { animation: typeFadeIn 0.06s ease-out forwards; }
    @keyframes typeFadeIn { from { opacity: 0.3; } to { opacity: 1; } }
    .gutter { display: inline-block; width: 4ch; text-align: right; color: var(--gutter-fg); padding-right: 1.5ch; user-select: none; pointer-events: none; }
    .accent { color: var(--fg-accent); } .green { color: var(--fg-green); } .yellow { color: var(--fg-yellow); } .red { color: var(--fg-red); } .purple { color: var(--fg-purple); } .bright { color: var(--fg-bright); font-weight: 500; } .muted { color: var(--fg-muted); } .dim { color: var(--border); }
    .nav-link { color: var(--fg); text-decoration: none; cursor: pointer; display: inline; transition: color 0.15s; background: none; border: none; font: inherit; padding: 0; }
    .nav-link:hover { color: var(--fg-accent); }
    .nav-link.active { color: var(--fg-accent); text-decoration: underline; text-underline-offset: 3px; }
    .step { cursor: pointer; display: inline; transition: color 0.15s; }
    .step:hover { color: var(--fg-bright); }
    .step.done { color: var(--fg-green); } .step.current { color: var(--fg-accent); }
    .ascii-btn { display: inline; background: none; border: none; font: inherit; color: var(--fg); cursor: pointer; padding: 0; transition: color 0.15s; }
    .ascii-btn:hover { color: var(--fg-accent); }
    .ascii-btn.primary { color: var(--fg-green); }
    .ascii-btn.primary:hover { color: #2da44e; }
    .ascii-btn.danger:hover { color: var(--fg-red); }
    @keyframes pulse-ready { 0%, 100% { color: var(--fg-green); } 50% { color: #2da44e; } }
    .ascii-btn.ready { animation: pulse-ready 1.8s ease-in-out infinite; }
    .card-pill { display: inline; background: none; border: none; font: inherit; cursor: pointer; padding: 0; color: var(--fg-muted); transition: color 0.15s; }
    .card-pill.selected { color: var(--fg-accent); } .card-pill:hover { color: var(--fg-bright); } .card-pill.auto-detected { color: var(--fg-green); }
    .ascii-input-wrap { display: inline-block; position: relative; }
    .ascii-input { font: inherit; background: transparent; border: none; color: var(--fg-bright); outline: none; padding: 0; width: 100%; caret-color: var(--cursor); letter-spacing: inherit; }
    .ascii-input::placeholder { color: var(--border); }
    .ascii-input:focus { background: var(--selection); }
    .ascii-check, .ascii-radio { display: inline; cursor: pointer; color: var(--fg); background: none; border: none; font: inherit; padding: 0; transition: color 0.15s; }
    .ascii-check:hover, .ascii-radio:hover { color: var(--fg-accent); }
    .ascii-radio.selected { color: var(--fg-green); }
    @keyframes toggle-flash { 0% { color: var(--fg-accent); } 100% { color: inherit; } }
    .flash { animation: toggle-flash 0.4s ease-out; }
    @media (max-width: 660px) { body { font-size: 10px; padding: 0.5rem; } .terminal { border-radius: 0; } }
    .content::-webkit-scrollbar { height: 6px; } .content::-webkit-scrollbar-track { background: transparent; } .content::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
    ::selection { background: var(--selection); color: var(--fg-bright); }
    @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }
  </style>
</head>
<body>
<div class="terminal">
  <div class="chrome">
    <div class="dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
    <span class="chrome-title">checkout.md — SecurePay</span>
    <span style="width:52px"></span>
  </div>
  <div class="content" id="content"></div>
</div>
<script>
const state={cardType:'',cardNumber:'',cardName:'',expiry:'',cvv:'',saveCard:true,billing:'same',step:1,subtotal:99.00,taxRate:0.08,booted:false};
state.tax=+(state.subtotal*state.taxRate).toFixed(2);state.total=+(state.subtotal+state.tax).toFixed(2);
const CW=72;
function padR(s,n){s=String(s);return s.length>=n?s.substring(0,n):s+' '.repeat(n-s.length)}
function padL(s,n){s=String(s);return s.length>=n?s:' '.repeat(n-s.length)+s}
function hr(w=CW,ch='\\u2500'){return ch.repeat(w)}
function boxT(w){return'\\u250c'+'\\u2500'.repeat(w-2)+'\\u2510'}
function boxM(w){return'\\u251c'+'\\u2500'.repeat(w-2)+'\\u2524'}
function boxB(w){return'\\u2514'+'\\u2500'.repeat(w-2)+'\\u2518'}
function boxR(c,w){const l=sLen(c),p=w-4-l;return p<=0?'\\u2502 '+c+' \\u2502':'\\u2502 '+c+' '.repeat(p)+' \\u2502'}
function sLen(h){return h.replace(/<[^>]*>/g,'').length}
function escH(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function getCompletion(){let n=0,total=4;if(state.cardNumber.replace(/\\s/g,'').length>=16)n++;if(state.cardName.trim())n++;if(state.expiry.length>=5)n++;if(state.cvv.length>=3)n++;return n/total}
function isFormValid(){return state.cardNumber.replace(/\\s/g,'').length>=16&&state.cardName.trim()&&state.expiry.length>=5&&state.cvv.length>=3}
function progressBar(w){const pct=getCompletion();const filled=Math.round(pct*w);const empty=w-filled;const bar='\\u2588'.repeat(filled)+'\\u2591'.repeat(empty);const label=Math.round(pct*100)+'%';const cls=pct>=1?'green':pct>=0.5?'yellow':'muted';return '<span class="'+cls+'">'+bar+'</span> <span class="muted">'+label+'</span>'}
function detectCard(num){const d=num.replace(/\\s/g,'');if(!d)return'';if(d[0]==='4')return'visa';if(d[0]==='5')return'mastercard';return''}
function nav(label,id,active){return'<button class="nav-link'+(active?' active':'')+'" onclick="navClick(\\''+id+'\\')">'+label+'</button>'}
function step(label,i){if(i<state.step)return'<span class="step done" onclick="setStep('+i+')">  '+label+'  </span>';if(i===state.step)return'<span class="step current" onclick="setStep('+i+')">[ '+label+' ]</span>';return'<span class="muted step" onclick="setStep('+i+')">  '+label+'  </span>'}
function inp(id,ph,w,opts){opts=opts||{};const val=state[id]||'';const ml=opts.maxlen||w;const tp=opts.type||'text';return'[<span class="ascii-input-wrap" style="width:'+w+'ch"><input class="ascii-input" type="'+tp+'" id="input-'+id+'" value="'+escH(val)+'" placeholder="'+ph+'" maxlength="'+ml+'" style="width:'+w+'ch" data-field="'+id+'" oninput="onInput(this)" onfocus="onFocus(this)" onblur="onBlur(this)"></span>]'}
function chk(on){return'<button class="ascii-check" onclick="toggleCheck()" id="chk-save">'+(on?'\\u2611':'\\u2610')+'</button>'}
function rad(val,label){const sel=state.billing===val;return'<button class="ascii-radio'+(sel?' selected':'')+'" onclick="setRadio(\\''+val+'\\')" id="rad-'+val+'">'+(sel?'\\u25cf':'\\u25cb')+' '+label+'</button>'}
function pill(type,label){const auto=detectCard(state.cardNumber);let cls='card-pill';if(state.cardType===type)cls+=' selected';if(auto===type&&auto)cls+=' auto-detected';return'<button class="'+cls+'" onclick="setCard(\\''+type+'\\')">['+label+']</button>'}
let ln=0,focused=null;
function L(html){html=html||'';ln++;return'<span class="line"><span class="gutter">'+padL(ln,3)+'</span>'+html+'</span>\\n'}
function render(animate){ln=0;const BW=CW;let o='';const detected=detectCard(state.cardNumber);if(detected&&detected!==state.cardType)state.cardType=detected;
o+=L();o+=L(' '+nav('SecurePay','home',true)+'   '+nav('Products','products')+'   '+nav('Cart','cart')+'   '+nav('Orders','orders')+'                      '+nav('[ Sign Out ]','signout'));o+=L('<span class="dim">'+hr()+'</span>');
o+=L('<span class="bright"> Complete Your Purchase</span>');o+=L(' '+step('Shipping',0)+' '+step('Payment',1)+'  '+step('Review',2)+'  '+step('Complete',3));o+=L('<span class="dim">'+hr()+'</span>');
o+=L(' <span id="progress-bar">'+progressBar(CW-8)+'</span>');o+=L();
o+=L(' '+boxT(BW-2));o+=L(' '+boxR('<span class="bright">Order Summary</span>          <span class="yellow">Premium Subscription</span> \\u00b7 1 Year           Subtotal: <span class="bright">$'+state.subtotal.toFixed(2)+'</span>  Tax: <span class="bright">$'+state.tax.toFixed(2)+'</span>',BW-2));o+=L(' '+boxR(' '.repeat(BW-30)+'<span class="green bright">Total:  $'+state.total.toFixed(2)+'</span>     ',BW-2));o+=L(' '+boxB(BW-2));o+=L();
o+=L(' '+boxT(BW-2));o+=L(' '+boxR('<span class="bright">Payment Information</span>',BW-2));
o+=L(' \\u251c\\u2500<span class="muted">Accepted Cards:</span>'+'\\u2500'.repeat(BW-22)+'\\u2524');
o+=L(' '+boxR('  <span id="card-pills">'+pill('visa','VISA')+' '+pill('mastercard','MC')+(detected?' <span class="green">\\u2190 auto-detected</span>':'')+'</span>',BW-2));o+=L(' '+boxR('',BW-2));
o+=L(' '+boxR('<span class="muted">Card Number</span>',BW-2));o+=L(' '+boxR('  '+inp('cardNumber','0000 0000 0000 0000',BW-12,{maxlen:19}),BW-2));o+=L(' '+boxR('',BW-2));
o+=L(' '+boxR('<span class="muted">Cardholder Name</span>',BW-2));o+=L(' '+boxR('  '+inp('cardName','Your full name',BW-12),BW-2));o+=L(' '+boxR('',BW-2));
const halfW=Math.floor((BW-14)/2);o+=L(' '+boxR('<span class="muted">Expiry Date</span>'+' '.repeat(halfW-8)+'<span class="muted">Security Code (CVV)</span>',BW-2));o+=L(' '+boxR('  '+inp('expiry','MM/YY',halfW-4,{maxlen:5})+'   '+inp('cvv','\\u00b7\\u00b7\\u00b7',halfW-5,{maxlen:4,type:'password'}),BW-2));o+=L(' '+boxR('',BW-2));
o+=L(' '+boxR('  '+chk(state.saveCard)+' <span class="muted">Save card for future purchases</span>',BW-2));o+=L(' '+boxR('',BW-2));o+=L(' '+boxB(BW-2));o+=L();
o+=L(' '+boxT(BW-2));o+=L(' '+boxR('<span class="bright">Billing Address</span>',BW-2));o+=L(' '+boxR('  '+rad('same','Same as shipping address'),BW-2));o+=L(' '+boxR('  '+rad('different','Use different billing address'),BW-2));o+=L(' '+boxB(BW-2));
o+=L();o+=L(' <span class="muted">Your payment is secured with 256-bit SSL encryption</span>');o+=L();
const valid=isFormValid();const payClass=valid?'ascii-btn primary ready':'ascii-btn primary';const payHint=valid?' <span class="muted">\\u21b5 Enter</span>':'';const cancel='<button class="ascii-btn danger" onclick="onCancel()">[    Cancel    ]</button>';const pay='<button class="'+payClass+'" onclick="onPay()">[  Pay $'+state.total.toFixed(2)+'  ]</button>';
o+=L(' '.repeat(CW-40)+' '+cancel+'  <span id="pay-btn-wrap">'+pay+payHint+'</span>');o+=L();
document.getElementById('content').innerHTML=o;
if(animate){const lines=document.querySelectorAll('.line');lines.forEach((line,i)=>{line.classList.add('typing-hidden');setTimeout(()=>{line.classList.remove('typing-hidden');line.classList.add('typing-visible');},i*25)});state.booted=true;return}
if(focused){const el=document.getElementById('input-'+focused);if(el){el.focus();const l=el.value.length;el.setSelectionRange(l,l)}}}
function onInput(el){const f=el.dataset.field;let v=el.value;if(f==='cardNumber'){v=v.replace(/[^0-9]/g,'').substring(0,16);v=v.replace(/(.{4})/g,'$1 ').trim()}if(f==='expiry'){v=v.replace(/[^0-9/]/g,'');if(v.length===2&&!v.includes('/')&&state.expiry.length<v.length)v+='/'}if(f==='cvv')v=v.replace(/[^0-9]/g,'').substring(0,4);state[f]=v;if(el.value!==v){const pos=el.selectionStart;el.value=v;el.setSelectionRange(Math.min(pos+1,v.length),Math.min(pos+1,v.length))}if(f==='cardNumber'){const detected=detectCard(v);if(detected&&detected!==state.cardType)state.cardType=detected;const pillsEl=document.getElementById('card-pills');if(pillsEl){const det=detectCard(state.cardNumber);const hint=det?' <span class="green">\\u2190 auto-detected</span>':'';pillsEl.innerHTML=pill('visa','VISA')+' '+pill('mastercard','MC')+hint}}updateDynamic()}
function updateDynamic(){const pb=document.getElementById('progress-bar');if(pb)pb.innerHTML=progressBar(CW-8);const pw=document.getElementById('pay-btn-wrap');if(pw){const valid=isFormValid();const payClass=valid?'ascii-btn primary ready':'ascii-btn primary';const payHint=valid?' <span class="muted">\\u21b5 Enter</span>':'';pw.innerHTML='<button class="'+payClass+'" onclick="onPay()">[  Pay $'+state.total.toFixed(2)+'  ]</button>'+payHint}}
function onFocus(el){focused=el.dataset.field}function onBlur(el){if(focused===el.dataset.field)focused=null}
function toggleCheck(){state.saveCard=!state.saveCard;render();setTimeout(()=>{const el=document.getElementById('chk-save');if(el)el.classList.add('flash')},10)}
function setRadio(v){state.billing=v;render();setTimeout(()=>{const el=document.getElementById('rad-'+v);if(el)el.classList.add('flash')},10)}
function setCard(t){state.cardType=t;render()}function setStep(n){state.step=n;render()}function navClick(){}
function onCancel(){if(confirm('Cancel your purchase?')){state.cardNumber='';state.cardName='';state.expiry='';state.cvv='';state.cardType='';render()}}
function onPay(){const errs=[];if(state.cardNumber.replace(/\\s/g,'').length<16)errs.push('Card number must be 16 digits');if(!state.cardName.trim())errs.push('Cardholder name is required');if(state.expiry.length<5)errs.push('Expiry date is required');if(state.cvv.length<3)errs.push('CVV must be at least 3 digits');if(errs.length){alert('Validation errors:\\n\\n'+errs.map(e=>'  \\u2717 '+e).join('\\n'));return}state.step=3;render();showSuccess()}
function showSuccess(){setTimeout(()=>{ln=0;const sw=46;const pad=' '.repeat(Math.floor((CW-sw)/2));const lines=[];lines.push(L());lines.push(L());lines.push(L());lines.push(L(pad+boxT(sw)));lines.push(L(pad+boxR('',sw)));lines.push(L(pad+boxR('<span class="green bright">\\u2713 Payment Successful!</span>',sw)));lines.push(L(pad+boxR('',sw)));lines.push(L(pad+boxR('<span class="muted">Amount charged:</span>  <span class="bright">$'+state.total.toFixed(2)+'</span>',sw)));lines.push(L(pad+boxR('<span class="muted">Card ending:</span>     <span class="bright">****'+state.cardNumber.replace(/\\s/g,'').slice(-4)+'</span>',sw)));lines.push(L(pad+boxR('<span class="muted">Status:</span>          <span class="green">Confirmed</span>',sw)));lines.push(L(pad+boxR('',sw)));lines.push(L(pad+boxR('<span class="muted">A receipt has been sent to</span>',sw)));lines.push(L(pad+boxR('<span class="muted">your registered email address.</span>',sw)));lines.push(L(pad+boxR('',sw)));lines.push(L(pad+boxR('<button class="ascii-btn accent" onclick="resetForm()">[  Back to Dashboard  ]</button>',sw)));lines.push(L(pad+boxR('',sw)));lines.push(L(pad+boxB(sw)));lines.push(L());lines.push(L());const container=document.getElementById('content');container.innerHTML='';lines.forEach((lineHtml,i)=>{setTimeout(()=>{container.innerHTML+=lineHtml},i*60)})},400)}
function resetForm(){state.step=1;state.cardNumber='';state.cardName='';state.expiry='';state.cvv='';state.cardType='';render(true)}
document.addEventListener('keydown',(e)=>{if(e.key==='Enter'&&!e.shiftKey&&isFormValid()){const active=document.activeElement;if(active&&active.classList.contains('ascii-input')){e.preventDefault();onPay()}}if(e.key==='Tab'){const order=['cardNumber','cardName','expiry','cvv'];const currentIdx=order.indexOf(focused);if(currentIdx!==-1){e.preventDefault();const next=e.shiftKey?(currentIdx-1+order.length)%order.length:(currentIdx+1)%order.length;focused=order[next];render()}}});
render(true);
</script>
</body>
</html>`;

const CheckoutTerminalDemo = () => {
  return (
    <iframe
      srcDoc={checkoutTerminalHtml}
      style={{
        width: "100%",
        height: 580,
        border: "none",
        borderRadius: 12,
        background: "#f6f8fa",
      }}
      title="Daily UI #002 — Checkout"
    />
  );
};

const checkoutTerminalCode = checkoutTerminalHtml;

interface LabExperiment {
  id: string;
  title: string;
  description: string;
  icon: string;
  code: string;
  preview: React.ReactNode;
  srcDoc?: string;
  language?: string;
}

const fileExperiments: LabExperiment[] = [
  { id: "variable-font", title: "Variable Font Animator", description: "Polices variables, axes, easings", icon: "Aa", code: variableFontCode, preview: <VariableFontDemo />, srcDoc: variableFontHtml, language: "html" },
  { id: "dynamic-island", title: "Dynamic Island", description: "Emoji sender, gooey filter, springs", icon: "💬", code: dynamicIslandCode, preview: <DynamicIslandDemo /> },
  { id: "theme-transition", title: "Theme Transition", description: "Clip-path reveal light/dark", icon: "◐", code: clipRevealCode, preview: <ClipRevealDemo />, language: "html" },
  { id: "chat-split-flap", title: "Chat Split-Flap", description: "Split-flap AI thinking indicator", icon: "▦", code: chatFlapCode, preview: <ChatFlapDemo /> },
  { id: "morph-checkbox", title: "Morph Checkbox", description: "SVG morphing checkbox", icon: "☑", code: morphCheckboxCode, preview: <MorphCheckboxDemo /> },
  { id: "scrubber-input", title: "Scrubber Input", description: "Drag to scrub, click to edit", icon: "↔", code: scrubberInputCode, preview: <ScrubberInputDemo /> },
  { id: "hold-to-delete", title: "Hold to Delete", description: "Maintien + clip-path reveal", icon: "🗑", code: holdToDeleteCode, preview: <HoldToDeleteButton /> },
];

const dailyUiExperiments: LabExperiment[] = [
  { id: "daily-ui-001", title: "#001 — Sign Up", description: "Liquid Glass, glassmorphism", icon: "01", code: signUpGlassCode, preview: <SignUpGlassDemo />, srcDoc: signUpGlassHtml, language: "html" },
  { id: "daily-ui-002", title: "#002 — Checkout", description: "Terminal-style, ASCII art", icon: "02", code: checkoutTerminalCode, preview: <CheckoutTerminalDemo />, srcDoc: checkoutTerminalHtml, language: "html" },
];

const Laboratoire = () => {
  useSEO({
    title: "Laboratoire — Chloé Halloin",
    description:
      "Expérimentations interactives — micro-interactions, composants UI et prototypes créatifs.",
  });

  const [openId, setOpenId] = useState<string | null>(null);
  const [folderOpen, setFolderOpen] = useState(false);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const allExperiments = [...fileExperiments, ...dailyUiExperiments];
  const openExperiment = allExperiments.find((e) => e.id === openId);
  const visibleFiles = folderOpen ? dailyUiExperiments : fileExperiments;

  const handleOpen = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  const handleFolderOpen = useCallback(() => {
    setFolderOpen(true);
    setOpenId(null);
  }, []);

  const handleBack = useCallback(() => {
    setFolderOpen(false);
    setOpenId(null);
  }, []);

  useEffect(() => {
    if (openId && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [openId]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (openId) setOpenId(null);
        else if (folderOpen) setFolderOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openId, folderOpen]);

  return (
    <>
      <section className="lab-section" aria-label="Laboratoire">
        <h2 className="section-title">Laboratoire</h2>
        <p className="section-intro">
          Mes petits tests et expérimentations en code. Cliquez sur un élément
          pour voir l'aperçu interactif et le code source.
        </p>

        {folderOpen && (
          <p className="finder-breadcrumb">
            <button className="breadcrumb-link" onClick={handleBack}>Laboratoire</button>
            {" › "}
            <span>Daily UI</span>
          </p>
        )}

        <div className="finder-grid">
          {/* Folder (only in root) */}
          {!folderOpen && (
            <button className="finder-file" onClick={handleFolderOpen}>
              <div className="finder-folder-icon">
                <div className="finder-folder-icon-tab" />
                <div className="finder-folder-icon-back" />
                <div className="finder-folder-icon-front" />
              </div>
              <span className="finder-file-label">Daily UI</span>
            </button>
          )}

          {/* Files */}
          {visibleFiles.map((exp) => (
            <button
              key={exp.id}
              className={`finder-file${openId === exp.id ? " selected" : ""}`}
              onClick={() => handleOpen(exp.id)}
              onMouseEnter={() => setHoverId(exp.id)}
              onMouseMove={(e) => {
                if (tooltipRef.current) {
                  tooltipRef.current.style.left = `${e.clientX}px`;
                  tooltipRef.current.style.top = `${e.clientY}px`;
                }
              }}
              onMouseLeave={() => setHoverId(null)}
            >
              <div className="finder-file-icon">
                <div className="finder-file-icon-page">
                  <span className="finder-file-icon-preview">{exp.icon}</span>
                </div>
              </div>
              <span className="finder-file-label">{exp.title}</span>
            </button>
          ))}
        </div>

        {/* ── Quick Look tooltip (fixed, outside finder overflow) ── */}
        {hoverId && (() => {
          const exp = allExperiments.find((e) => e.id === hoverId);
          if (!exp) return null;
          return (
            <div
              ref={tooltipRef}
              className="finder-quicklook"
            >
              <div className="finder-quicklook-inner">
                {exp.srcDoc ? (
                  <iframe
                    srcDoc={exp.srcDoc}
                    title={exp.title}
                    style={{ border: "none" }}
                  />
                ) : (
                  exp.preview
                )}
              </div>
            </div>
          );
        })()}

        {/* ── Detail panel ── */}
        {openExperiment && (
          <div className="finder-detail" ref={detailRef}>
            <div className="finder-detail-header">
              <div>
                <h3 className="finder-detail-title">{openExperiment.title}</h3>
                <p className="finder-detail-desc">{openExperiment.description}</p>
              </div>
              <button
                className="finder-detail-close"
                onClick={() => setOpenId(null)}
                aria-label="Fermer"
              >
                <X size={16} />
              </button>
            </div>
            <CodePreview
              title={openExperiment.title}
              code={openExperiment.code}
              preview={openExperiment.preview}
              language={openExperiment.language}
            />
          </div>
        )}
      </section>
    </>
  );
};

export default Laboratoire;
