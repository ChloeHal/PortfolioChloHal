import React, { useState, useEffect, useRef } from "react";
import { Swords, LockKeyhole, Timer as TimerIcon, Library, Coffee } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const InteractiveTools = () => {
  const [activeTab, setActiveTab] = useState("ninja");
  const [ninjaName, setNinjaName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordOptions, setPasswordOptions] = useState({
    length: 12,
    includeSymbols: true,
    includeNumbers: true,
    includeUppercase: true,
  });
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerDone, setTimerDone] = useState(false);
  const [selectedBook, setSelectedBook] = useState<{
    title: string;
    author: string;
    genre: string;
  } | null>(null);
  const [coffeeLevel, setCoffeeLevel] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ninjaFirstNames = [
    "Silent", "Big", "Sad", "Dark", "Agile", "Fragile", "Dumb", "Dead",
    "Ghost", "Snake", "Mysterious", "Clumsy", "Hollow", "Iron", "Golden",
    "Gracefull", "Invisible",
  ];
  const ninjaLastNames = [
    "Killer", "Soldier", "Assassin", "Demon", "Hunter", "Spider", "Bullet",
    "Buildozer", "Stalker", "Samaritan", "Ninja", "Thunder", "Wolf", "Shade",
    "Dagger", "Master",
  ];

  const books = [
    { title: "1984", author: "George Orwell", genre: "Dystopie" },
    { title: "Dune", author: "Frank Herbert", genre: "Sci-Fi" },
    { title: "Fahrenheit 451", author: "Ray Bradbury", genre: "Dystopie" },
    { title: "Jane Eyre", author: "Charlotte Brontë", genre: "Classique" },
    { title: "Ne tirez pas sur l'oiseau moqueur", author: "Harper Lee", genre: "Classique" },
    { title: "La servante écarlate", author: "Margaret Atwood", genre: "Dystopie" },
    { title: "Le pouvoir", author: "Naomi Alderman", genre: "Sci-Fi" },
    { title: "Babel", author: "R.F. Kuang", genre: "Fantasy" },
    { title: "Dark Matter", author: "Blake Crouch", genre: "Sci-Fi" },
    { title: "La Parabole du semeur", author: "Octavia E. Butler", genre: "Sci-Fi" },
    { title: "Kallocaïne", author: "Karin Boye", genre: "Dystopie" },
    { title: "Les Sept Morts d'Evelyn Hardcastle", author: "Stuart Turton", genre: "Mystère" },
    { title: "Là où chantent les écrevisses", author: "Delia Owens", genre: "Fiction" },
    { title: "Kim Jiyoung, née en 1982", author: "Cho Nam-Joo", genre: "Fiction" },
    { title: "Piranèse", author: "Susanna Clarke", genre: "Fantasy" },
    { title: "La tresse", author: "Laetitia Colombani", genre: "Fiction" },
    { title: "Daisy Jones & The Six", author: "Taylor Jenkins Reid", genre: "Fiction" },
    { title: "Betty", author: "Tiffany McDaniel", genre: "Fiction" },
    { title: "American Gods", author: "Neil Gaiman", genre: "Fantasy" },
    { title: "Celle qui devint le soleil", author: "Shelley Parker-Chan", genre: "Fantasy" },
    { title: "Le Temps des Sorcières", author: "Alix E. Harrow", genre: "Fantasy" },
    { title: "Nous sommes tous des féministes", author: "Chimamanda Ngozi Adichie", genre: "Essai" },
    { title: "Ces hommes qui m'expliquent la vie", author: "Rebecca Solnit", genre: "Essai" },
    { title: "Beauté fatale", author: "Mona Chollet", genre: "Essai" },
    { title: "Technoféminisme", author: "Mathilde Saliou", genre: "Essai" },
    { title: "Le coût de la virilité", author: "Lucile Peytavin", genre: "Essai" },
    { title: "My Absolute Darling", author: "Gabriel Tallent", genre: "Thriller" },
    { title: "Les Promises", author: "Jean-Christophe Grangé", genre: "Thriller" },
  ];

  const coffeeMessages = [
    "Je sais que tu rêve plus d'un café que de connaître la soirée de Karen! ☕",
    "Tu sais comment dire bonjour, mais ton regard est encore un peu passif/agressif.",
    "Sociabilisation tolérée. Tu es apte pour répondre à des questions complexes. ☕",
    "Tu ris, tu souris, tu peux presque parler météo sans pleurer.",
    "Feu vert 🚀 Tu proposes même d'aller chercher la prochaine fournée.",
    "Tu peux tenir un Ted Talk mais essaye quand même de rester focus",
    "Même si Lorelai Gilmore te vénère, on n'est pas encore à l'after work 😅",
    "Oui ... ça s'appelle une tachycardie",
    "Explosion ou implosion ... ça va mal finir 🤯",
  ];

  const generateNinjaName = () => {
    const firstName = ninjaFirstNames[Math.floor(Math.random() * ninjaFirstNames.length)];
    const lastName = ninjaLastNames[Math.floor(Math.random() * ninjaLastNames.length)];
    setNinjaName(`${firstName} ${lastName}`);
  };

  const generatePassword = () => {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (passwordOptions.includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (passwordOptions.includeNumbers) charset += "0123456789";
    if (passwordOptions.includeSymbols) charset += "!@$%&_+-=;:,.<>?";
    let result = "";
    for (let i = 0; i < passwordOptions.length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
  };

  const startTimer = (preset: string) => {
    let seconds: number;
    switch (preset) {
      case "soft": seconds = 240; break;
      case "medium": seconds = 360; break;
      case "hard": seconds = 480; break;
      default: seconds = 300;
    }
    setTimerSeconds(seconds);
    setTimerActive(true);
    setTimerDone(false);
  };

  const selectRandomBook = () => {
    const randomBook = books[Math.floor(Math.random() * books.length)];
    setSelectedBook(randomBook);
  };

  useEffect(() => {
    if (timerActive && timerSeconds > 0) {
      timerRef.current = setTimeout(() => {
        setTimerSeconds(timerSeconds - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerActive) {
      setTimerActive(false);
      setTimerDone(true);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timerActive, timerSeconds]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const tabs: { id: string; name: string; icon: LucideIcon }[] = [
    { id: "ninja", name: "Nom Ninja", icon: Swords },
    { id: "password", name: "Mot de passe", icon: LockKeyhole },
    { id: "timer", name: "Minuteur", icon: TimerIcon },
    { id: "book", name: "Livre au hasard", icon: Library },
    { id: "coffee", name: "Jauge café", icon: Coffee },
  ];

  return (
    <section className="interactive-tools-section" id="tools" aria-label="Outils interactifs">
      <h2 className="section-title">
        Et si on restait ensemble un peu plus longtemps ?
      </h2>

      <div className="tools-container">
        <div className="tools-tabs" role="tablist" aria-label="Outils bonus">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                className={`tool-tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                tabIndex={activeTab === tab.id ? 0 : -1}
              >
                <span className="tab-icon" aria-hidden="true"><TabIcon size={14} /></span>
                <span className="tab-name">{tab.name}</span>
              </button>
            );
          })}
        </div>

        <div className="tools-content">
          {activeTab === "ninja" && (
            <div className="tool-panel ninja-tool" role="tabpanel" id="panel-ninja" aria-labelledby="tab-ninja">
              <h3>Générateur de nom ninja</h3>
              <p>Découvrez votre identité ninja secrète</p>
              <button className="generate-btn" onClick={generateNinjaName}>
                Générer un nom ninja
              </button>
              {ninjaName && (
                <div className="result-display" aria-live="polite">
                  <strong>{ninjaName}</strong>
                </div>
              )}
            </div>
          )}

          {activeTab === "password" && (
            <div className="tool-panel password-tool" role="tabpanel" id="panel-password" aria-labelledby="tab-password">
              <h3>Générateur de mot de passe</h3>
              <div className="password-options">
                <div className="option-group">
                  <label htmlFor="password-length">Longueur : {passwordOptions.length}</label>
                  <input
                    id="password-length"
                    type="range"
                    min="8"
                    max="32"
                    value={passwordOptions.length}
                    aria-label={`Longueur du mot de passe : ${passwordOptions.length}`}
                    onChange={(e) =>
                      setPasswordOptions({
                        ...passwordOptions,
                        length: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={passwordOptions.includeSymbols}
                      onChange={(e) =>
                        setPasswordOptions({
                          ...passwordOptions,
                          includeSymbols: e.target.checked,
                        })
                      }
                    />
                    Inclure les symboles
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={passwordOptions.includeNumbers}
                      onChange={(e) =>
                        setPasswordOptions({
                          ...passwordOptions,
                          includeNumbers: e.target.checked,
                        })
                      }
                    />
                    Inclure les chiffres
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={passwordOptions.includeUppercase}
                      onChange={(e) =>
                        setPasswordOptions({
                          ...passwordOptions,
                          includeUppercase: e.target.checked,
                        })
                      }
                    />
                    Inclure les majuscules
                  </label>
                </div>
              </div>
              <button className="generate-btn" onClick={generatePassword}>
                Générer un mot de passe
              </button>
              {password && (
                <div className="result-display password-result" aria-live="polite">
                  <code>{password}</code>
                  <button
                    onClick={() => navigator.clipboard.writeText(password)}
                    aria-label="Copier le mot de passe"
                  >
                    Copier
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "timer" && (
            <div className="tool-panel timer-tool" role="tabpanel" id="panel-timer" aria-labelledby="tab-timer">
              <h3>Minuteur à œufs</h3>
              <div className="timer-display" aria-live="polite" aria-atomic="true">
                {formatTime(timerSeconds)}
              </div>
              {timerDone && (
                <div className="timer-alert" role="alert" aria-live="assertive">
                  Temps écoulé !
                </div>
              )}
              <div className="timer-presets">
                <button onClick={() => startTimer("soft")}>
                  Œuf mollet (4min)
                </button>
                <button onClick={() => startTimer("medium")}>
                  Œuf moyen (6min)
                </button>
                <button onClick={() => startTimer("hard")}>
                  Œuf dur (8min)
                </button>
              </div>
              {timerActive && (
                <button
                  className="generate-btn"
                  onClick={() => setTimerActive(false)}
                >
                  Arrêter
                </button>
              )}
            </div>
          )}

          {activeTab === "book" && (
            <div className="tool-panel book-tool" role="tabpanel" id="panel-book" aria-labelledby="tab-book">
              <h3>Livre au hasard</h3>
              <p>Besoin d'une lecture ? Laissez le destin décider.</p>
              <button className="generate-btn" onClick={selectRandomBook}>
                Choisir un livre
              </button>
              {selectedBook && (
                <div className="result-display" aria-live="polite">
                  <strong>{selectedBook.title}</strong>
                  <br />
                  {selectedBook.author} · {selectedBook.genre}
                </div>
              )}
            </div>
          )}

          {activeTab === "coffee" && (
            <div className="tool-panel coffee-tool" role="tabpanel" id="panel-coffee" aria-labelledby="tab-coffee">
              <h3>Jauge de consommation de café</h3>
              <div className="coffee-slider-container">
                <input
                  type="range"
                  min="0"
                  max="8"
                  value={coffeeLevel}
                  onChange={(e) => setCoffeeLevel(parseInt(e.target.value))}
                  className="coffee-slider"
                  aria-label="Nombre de cafés"
                  aria-valuemin={0}
                  aria-valuemax={8}
                  aria-valuenow={coffeeLevel}
                  aria-valuetext={`${coffeeLevel} cafés — ${coffeeMessages[coffeeLevel]}`}
                />
                <div className="coffee-level-display">
                  <span className="coffee-cups" aria-hidden="true"><Coffee size={18} /> x {coffeeLevel}</span>
                </div>
              </div>
              <div className="coffee-status" aria-live="polite">
                <strong>{coffeeMessages[coffeeLevel]}</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InteractiveTools;
