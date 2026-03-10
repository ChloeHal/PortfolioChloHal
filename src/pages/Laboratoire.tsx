import { useState, useRef, useCallback, useEffect } from "react";
import CodePreview from "../components/CodePreview";

/* ---- Experiment 1: Hold to Delete Button ---- */
const HoldToDeleteButton = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [deleted, setDeleted] = useState(false);

  const handleTransitionEnd = useCallback((e: React.TransitionEvent) => {
    if (e.propertyName !== "clip-path") return;
    const overlay = overlayRef.current;
    if (!overlay) return;
    const clip = getComputedStyle(overlay).clipPath;
    if (clip === "inset(0px)" || clip === "inset(0px 0px 0px 0px)") {
      setDeleted(true);
    }
  }, []);

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
    <button className="hold-delete-btn">
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
      <h4><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg> Design</h4>
      <p>Dual render light &amp; dark. Le clip-path rétracte l'ancien thème.</p>
      <div style="margin-top:0.4rem"><span class="cr-badge">clip-path</span><span class="cr-badge">inset()</span><span class="cr-badge cr-badge-outline">dual render</span></div>
    </div>
    <div class="cr-card">
      <h4><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> Technique</h4>
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
            <div class="morph-task" data-morph-task>
              <div class="morph-cb-wrap"><svg viewBox="0 0 28 28" width="22" height="22"></svg></div>
              <span class="morph-task-label">${t}<span class="morph-strike"></span></span>
            </div>
          `).join("")}
          <div class="morph-divider"></div>
          <div class="morph-switch-row">
            <label>Slow motion</label>
            <button class="morph-switch"><span class="morph-thumb"></span></button>
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

      row.addEventListener("click", () => {
        checked = !checked;
        label.classList.toggle("done", checked);
        animate();
      });

      render(0);
    });

    // Slow motion toggle
    const switchBtn = wrapper.querySelector(".morph-switch")!;
    switchBtn.addEventListener("click", () => {
      slow = !slow;
      switchBtn.classList.toggle("on", slow);
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
              <div class="cf-status-line" id="cf-status-line"></div>
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
            <div class="cf-icon-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
            <div class="cf-fake-input">Ask anything...</div>
            <div class="cf-send-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 19V5m0 0-5 5m5-5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
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

const Laboratoire = () => {
  return (
    <>
      <section className="lab-section" aria-label="Laboratoire">
        <h2 className="section-title">Laboratoire</h2>
        <p className="section-intro">
          Mes petits tests et expérimentations en code. Chaque carte montre un aperçu
          interactif et le code source correspondant.
        </p>

        <div className="lab-grid">
          <CodePreview
            title="Dynamic Island"
            description="Emoji sender avec Dynamic Island, gooey SVG filter et animations spring"
            code={dynamicIslandCode}
            preview={<DynamicIslandDemo />}
          />

          <CodePreview
            title="Theme Transition (clip-reveal)"
            description="Transition de thème light/dark avec clip-path inset — les deux thèmes coexistent pendant l'animation"
            code={clipRevealCode}
            preview={<ClipRevealDemo />}
            language="html"
          />

          <CodePreview
            title="Chat Split-Flap"
            description="Indicateur de réflexion AI avec animation split-flap et skeleton loading"
            code={chatFlapCode}
            preview={<ChatFlapDemo />}
          />

          <CodePreview
            title="Morph Checkbox"
            description="Checkbox animée avec morphing SVG — le carré se transforme en checkmark"
            code={morphCheckboxCode}
            preview={<MorphCheckboxDemo />}
          />

          <CodePreview
            title="Scrubber Input"
            description="Input à la Figma : drag pour scrubber, clic pour éditer la valeur"
            code={scrubberInputCode}
            preview={<ScrubberInputDemo />}
          />

          <CodePreview
            title="Hold to Delete"
            description="Un bouton de suppression avec maintien et clip-path reveal"
            code={holdToDeleteCode}
            preview={<HoldToDeleteButton />}
          />
        </div>
      </section>
    </>
  );
};

export default Laboratoire;
