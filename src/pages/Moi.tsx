import InteractiveTools from "../components/InteractiveTools";
import { usePortfolioData } from "../data/usePortfolioData";

const Moi = () => {
  const { data } = usePortfolioData();

  return (
    <>
      {/* Hero */}
      <section className="hero-section" aria-label="Présentation">
        <div className="hero-content">
          <h1 className="hero-title">{data.hero.title}</h1>
          <h2 className="hero-subtitle">{data.hero.subtitle}</h2>
          <p className="hero-description">{data.hero.description}</p>
          <div className="hero-links">
            {data.hero.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.url.endsWith(".pdf") ? "Voir le CV" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" aria-hidden="true" />

      {/* Technical Skills */}
      <section className="skills-section" aria-label="Compétences techniques">
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

      {/* Ce que je fais & pourquoi travailler avec moi */}
      <section className="soft-skills-section" aria-label="Ce que j'apporte">
        <h2 className="section-title">Ce que j'apporte</h2>
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

      {/* Interactive Tools / Divertissement */}
      <InteractiveTools />
    </>
  );
};

export default Moi;
