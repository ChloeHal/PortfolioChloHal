import { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronDown,
  Sparkles,
  Gamepad2,
  Flower2,
  Wine,
  Dumbbell,
  House,
  Megaphone,
  Code2,
  Mic,
  Clapperboard,
  Heart,
  Gem,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SectorDef {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
}

interface SectorNavigationProps {
  onSectorChange: (sector: string) => void;
  currentSector: string;
}

const defaultTheme: SectorDef = {
  id: "default",
  name: "Défaut",
  icon: Sparkles,
  description: "Thème neutre",
};

const sectors: SectorDef[] = [
  { id: "leisure", name: "Loisirs", icon: Gamepad2, description: "Jeux & divertissement" },
  { id: "florist", name: "Fleuriste", icon: Flower2, description: "Design floral" },
  { id: "wine", name: "Vin", icon: Wine, description: "Vignoble & vin" },
  { id: "boxing", name: "Boxe", icon: Dumbbell, description: "Sports de combat" },
  { id: "realestate", name: "Immobilier", icon: House, description: "Services immobiliers" },
  { id: "media", name: "Médias", icon: Megaphone, description: "Médias & publicité" },
  { id: "webagency", name: "Agence Web", icon: Code2, description: "Solutions digitales" },
  { id: "singer", name: "Musique", icon: Mic, description: "Musique & spectacle" },
  { id: "production", name: "Production", icon: Clapperboard, description: "Film & vidéo" },
  { id: "plushies", name: "Peluches", icon: Heart, description: "Jouets & design" },
  { id: "jewelry", name: "Joaillerie", icon: Gem, description: "Produits de luxe" },
];

const SectorNavigation: React.FC<SectorNavigationProps> = ({
  onSectorChange,
  currentSector,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeDropdown]);

  const handleSectorSelect = (sectorId: string) => {
    onSectorChange(sectorId);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const currentSectorData =
    currentSector === "default"
      ? defaultTheme
      : sectors.find((s) => s.id === currentSector) || defaultTheme;

  const CurrentIcon = currentSectorData.icon;

  return (
    <div className="sector-dropdown-container" ref={dropdownRef}>
      <button
        ref={triggerRef}
        className={`sector-dropdown-trigger ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Sélectionner un secteur d'activité"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="current-sector">
          <span className="sector-icon" aria-hidden="true"><CurrentIcon size={16} /></span>
          <span className="sector-text">{currentSectorData.name}</span>
        </span>
        <ChevronDown className={`dropdown-arrow ${isOpen ? "rotated" : ""}`} size={14} aria-hidden="true" />
      </button>

      <div
        className={`sector-dropdown-menu ${isOpen ? "open" : ""}`}
        role="listbox"
        aria-label="Secteurs d'activité"
      >
        <div className="dropdown-header">
          <h3>Secteur d'activité</h3>
          <p className="dropdown-subtitle">Des univers que j'ai déjà pu décoder.</p>
        </div>

        <div className="dropdown-content">
          <button
            className={`sector-dropdown-item ${currentSector === "default" ? "active" : ""}`}
            onClick={() => handleSectorSelect("default")}
            role="option"
            aria-selected={currentSector === "default"}
          >
            <span className="item-icon" aria-hidden="true"><Sparkles size={16} /></span>
            <div className="item-content">
              <span className="item-name">Défaut</span>
              <span className="item-description">Thème neutre</span>
            </div>
          </button>

          {sectors.map((sector) => {
            const SectorIcon = sector.icon;
            return (
              <button
                key={sector.id}
                className={`sector-dropdown-item ${currentSector === sector.id ? "active" : ""}`}
                onClick={() => handleSectorSelect(sector.id)}
                role="option"
                aria-selected={currentSector === sector.id}
              >
                <span className="item-icon" aria-hidden="true"><SectorIcon size={16} /></span>
                <div className="item-content">
                  <span className="item-name">{sector.name}</span>
                  <span className="item-description">{sector.description}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SectorNavigation;
