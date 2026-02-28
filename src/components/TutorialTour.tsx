import { useState, useEffect, useRef, useCallback } from "react";
import { Palette, Swords, Github, RotateCcw } from "lucide-react";

const TutorialTour = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const restartBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!localStorage.getItem("hasSeenTour")) {
      setTimeout(() => setIsOpen(true), 1000);
    }
  }, []);

  const closeTour = useCallback(() => {
    setIsOpen(false);
    setStep(0);
    localStorage.setItem("hasSeenTour", "true");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => restartBtnRef.current?.focus(), 100);
  }, []);

  const restartTour = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setIsOpen(true);
      setStep(0);
    }, 500);
  };

  // Escape key closes the tour
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeTour();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeTour]);

  // Focus trap inside dialog
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = dialog.querySelectorAll<HTMLElement>(focusableSelector);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = dialog.querySelectorAll<HTMLElement>(focusableSelector);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen, step]);

  if (!isOpen) {
    return (
      <button
        ref={restartBtnRef}
        onClick={restartTour}
        className="tour-restart-btn"
        aria-label="Relancer le tour guidé"
      >
        <RotateCcw size={20} aria-hidden="true" />
      </button>
    );
  }

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Tour guidé — étape ${step + 1} sur 3`}
    >
      <div className="tour-overlay" />

      {step === 0 && (
        <div className="tour-card tour-step-0">
          <div className="tour-card-content">
            <Palette size={24} className="tour-icon" aria-hidden="true" />
            <div>
              <h3>Sélecteur de thème</h3>
              <p>
                Ces thèmes représentent les différents{" "}
                <strong>secteurs d'activité</strong> pour lesquels j'ai
                travaillé. Chaque thème reflète un univers professionnel distinct
                que j'ai eu l'occasion d'explorer.
              </p>
            </div>
          </div>
          <div className="tour-actions">
            <button className="tour-skip" onClick={closeTour}>
              Passer le tour
            </button>
            <button
              className="tour-next"
              onClick={() => {
                setStep(1);
                document
                  .querySelector(".interactive-tools-section")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              Suivant (1/3)
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="tour-card tour-step-1">
          <div className="tour-card-content">
            <Swords size={24} className="tour-icon" aria-hidden="true" />
            <div>
              <h3>Les Outils Bonus</h3>
              <p>
                Cette section est un <strong>moyen ludique</strong> pour vous
                faire rester plus longtemps sur le site et vous assurer que vous
                vous souviendrez de mon nom. Un peu d'amusement ne fait jamais
                de mal!
              </p>
            </div>
          </div>
          <div className="tour-actions">
            <button
              className="tour-skip"
              onClick={() => {
                setStep(0);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Retour
            </button>
            <button className="tour-next" onClick={() => setStep(2)}>
              Suivant (2/3)
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="tour-card tour-step-2">
          <div className="tour-card-content">
            <Github size={24} className="tour-icon" aria-hidden="true" />
            <div>
              <h3>Read me</h3>
              <p>
                Cliquez ici pour en savoir plus sur les{" "}
                <strong>aspects techniques</strong> de ce portfolio :
                technologies utilisées, architecture, et choix de
                développement.
              </p>
            </div>
          </div>
          <div className="tour-actions">
            <button className="tour-skip" onClick={() => setStep(1)}>
              Retour
            </button>
            <button className="tour-next" onClick={closeTour}>
              Terminer (3/3)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorialTour;
