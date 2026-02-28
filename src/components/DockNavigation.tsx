import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import {
  User,
  Briefcase,
  GraduationCap,
  Code2,
  Star,
  Swords,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface DockTab {
  name: string;
  icon: LucideIcon;
  target: string;
}

const TABS: DockTab[] = [
  { name: "Accueil", icon: User, target: "main-content" },
  { name: "Expérience", icon: Briefcase, target: "experience" },
  { name: "Formation", icon: GraduationCap, target: "education" },
  { name: "Compétences", icon: Code2, target: "skills" },
  { name: "Qualités", icon: Star, target: "qualities" },
  { name: "Outils", icon: Swords, target: "tools" },
];

const DockNavigation = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].name);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabElementRef = useRef<HTMLButtonElement>(null);
  const isClickScrolling = useRef(false);

  const updateClipPath = useCallback(() => {
    const container = containerRef.current;
    const activeTabElement = activeTabElementRef.current;
    if (!container || !activeTabElement) return;

    const { offsetLeft, offsetWidth } = activeTabElement;
    const clipLeft = offsetLeft;
    const clipRight = offsetLeft + offsetWidth;

    container.style.clipPath = `inset(0 ${Number(
      100 - (clipRight / container.offsetWidth) * 100
    ).toFixed()}% 0 ${Number(
      (clipLeft / container.offsetWidth) * 100
    ).toFixed()}%)`;
  }, []);

  // Update clip-path before paint when active tab changes
  useLayoutEffect(() => {
    updateClipPath();
  }, [activeTab, updateClipPath]);

  // Recalculate on resize
  useEffect(() => {
    const handleResize = () => updateClipPath();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateClipPath]);

  // Scroll spy — disabled during click-initiated smooth scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) return;
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = TABS.length - 1; i >= 0; i--) {
        const section = document.getElementById(TABS[i].target);
        if (section && section.offsetTop <= scrollPos) {
          setActiveTab(TABS[i].name);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (tab: DockTab) => {
    setActiveTab(tab.name);
    isClickScrolling.current = true;
    document.getElementById(tab.target)?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 900);
  };

  return (
    <nav className="dock-nav" aria-label="Navigation rapide">
      <div className="dock-wrapper">
        <ul className="dock-list">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <li key={tab.name}>
                <button
                  ref={activeTab === tab.name ? activeTabElementRef : null}
                  data-tab={tab.name}
                  onClick={() => handleClick(tab)}
                  className="dock-btn"
                  aria-current={activeTab === tab.name ? "true" : undefined}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span className="dock-label">{tab.name}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div aria-hidden="true" className="dock-clip" ref={containerRef}>
          <ul className="dock-list dock-list-active">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <li key={tab.name}>
                  <button
                    data-tab={tab.name}
                    onClick={() => handleClick(tab)}
                    className="dock-btn dock-btn-active"
                    tabIndex={-1}
                  >
                    <Icon size={16} />
                    <span className="dock-label">{tab.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default DockNavigation;
