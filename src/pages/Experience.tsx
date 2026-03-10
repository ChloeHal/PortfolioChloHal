import { usePortfolioData } from "../data/usePortfolioData";

const Experience = () => {
  const { data } = usePortfolioData();

  return (
    <>
      <section className="experience-section" aria-label="Expérience professionnelle">
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

      <section className="education-section" aria-label="Formation">
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
    </>
  );
};

export default Experience;
