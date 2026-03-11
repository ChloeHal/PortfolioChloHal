import { useState, useEffect } from "react";
import SectorNavigation from "../components/SectorNavigation";
import DarkModeToggle from "../components/DarkModeToggle";
import InteractiveTools from "../components/InteractiveTools";
import DockNavigation from "../components/DockNavigation";
import ReadMeButton from "../components/ReadMeButton";
import { usePortfolioData } from "../data/usePortfolioData";
import "../styles/adaptive-portfolio.css";

const Index = () => {
  const [currentSector, setCurrentSector] = useState("default");
  const { data } = usePortfolioData();

  useEffect(() => {
    document.body.className = currentSector;
  }, [currentSector]);

  const handleSectorChange = (sector: string) => {
    setCurrentSector(sector);
  };

  return (
    <div className="portfolio-container">
      <a href="#main-content" className="skip-to-content">
        Aller au contenu principal
      </a>

      {/* Navigation */}
      <nav className="top-navigation" aria-label="Navigation principale">
        <div className="nav-content">
          <div className="nav-logo">
            <span className="status-dot" aria-hidden="true" />
            <h2>Open to work</h2>
          </div>
          <div className="nav-actions">
            <SectorNavigation
              onSectorChange={handleSectorChange}
              currentSector={currentSector}
            />
            <DarkModeToggle />
          </div>
        </div>
        <DockNavigation />
      </nav>

      {/* Hero */}
      <section className="hero-section" id="main-content" aria-label="Présentation">
        <div className="hero-content">
          <h1 className="hero-title">{data.hero.title}</h1>
          <h2 className="hero-subtitle">{data.hero.subtitle}</h2>
          <p className="hero-description">{data.hero.description}</p>
          <div className="hero-links">
            {data.hero.links.map((link, i) =>
              link.url.endsWith(".pdf") ? (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Voir le CV"
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        </div>
      </section>

      <hr className="section-divider" aria-hidden="true" />

      {/* Experience */}
      <section className="experience-section" id="experience" aria-label="Expérience professionnelle">
        <h2 className="section-title">Expérience</h2>
        <div className="experience-timeline">
          {data.experiences.map((exp) => (
            <div key={exp.id} className="experience-item">
              <div className="experience-year">{exp.period}</div>
              <div className="experience-content">
                <h3>{exp.title}</h3>
                <p className="experience-company">{exp.company}</p>
                <p>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" aria-hidden="true" />

      {/* Education */}
      <section className="education-section" id="education" aria-label="Formation">
        <h2 className="section-title">Formation</h2>
        <div className="education-grid">
          {data.education.map((edu) => (
            <div key={edu.id} className="education-item">
              <h3>{edu.title}</h3>
              <p className="education-school">{edu.school}</p>
              <p className="education-year">{edu.year}</p>
              <p className="education-description">{edu.description}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" aria-hidden="true" />

      {/* Technical Skills */}
      <section className="skills-section" id="skills" aria-label="Compétences techniques">
        <h2 className="section-title">Compétences</h2>
        <div className="skills-grid">
          {data.skills.map((category) => (
            <div key={category.id} className="skill-category">
              <h3>{category.name}</h3>
              <div className="skill-tags">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" aria-hidden="true" />

      {/* Qualities */}
      <section className="soft-skills-section" id="qualities" aria-label="Qualités humaines">
        <h2 className="section-title">Qualités</h2>
        <div className="soft-skills-grid">
          {data.qualities.map((quality) => (
            <div key={quality.id} className="soft-skill-item">
              <h3>{quality.title}</h3>
              <p>{quality.description}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" aria-hidden="true" />

      {/* Interactive Tools */}
      <InteractiveTools />

      <ReadMeButton />

      {/* Footer */}
      <footer className="portfolio-footer">
        <div className="footer-links">
          <a
            href="https://www.linkedin.com/in/chlo%C3%A9-halloin/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <span className="footer-separator">·</span>
          <a href="mailto:halloinchloe@gmail.com">Email</a>
          <span className="footer-separator">·</span>
          <a href="https://github.com/ChloeHal" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <span className="footer-separator">·</span>
          <a href="https://x.com/chlohal" target="_blank" rel="noopener noreferrer">
            X
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
