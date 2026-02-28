import { useState } from "react";
import { Link } from "react-router-dom";
import { usePortfolioData } from "../data/usePortfolioData";
import type {
  PortfolioData,
  Experience,
  Education,
  SkillCategory,
  Quality,
} from "../data/portfolio";
import "../styles/adaptive-portfolio.css";

const ADMIN_PASSWORD = "chloe2024";

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

/* ─── Password Gate ─── */

function LoginScreen({
  onLogin,
}: {
  onLogin: () => void;
}) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="admin-login">
      <h1>Admin</h1>
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Mot de passe"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
            setError(false);
          }}
          autoFocus
        />
        <button type="submit" className="admin-btn admin-btn-primary">
          Entrer
        </button>
      </form>
      {error && <p className="admin-login-error">Mot de passe incorrect</p>}
      <Link to="/" className="admin-back-link">
        ← Retour au portfolio
      </Link>
    </div>
  );
}

/* ─── Tags Input ─── */

function TagsInput({
  tags,
  onChange,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        onChange([...tags, input.trim()]);
      }
      setInput("");
    }
    if (e.key === "Backspace" && !input && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  return (
    <div className="admin-tags-input">
      {tags.map((tag) => (
        <span key={tag} className="admin-tag">
          {tag}
          <button
            type="button"
            onClick={() => onChange(tags.filter((t) => t !== tag))}
          >
            ×
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ajouter + Entrée"
      />
    </div>
  );
}

/* ─── Admin Dashboard ─── */

function AdminDashboard() {
  const { data, updateData, resetData, exportJSON } = usePortfolioData();

  const update = (partial: Partial<PortfolioData>) => {
    updateData({ ...data, ...partial });
  };

  /* Hero */
  const updateHero = (field: string, value: string) => {
    update({ hero: { ...data.hero, [field]: value } });
  };

  const updateHeroLink = (index: number, field: string, value: string) => {
    const links = [...data.hero.links];
    links[index] = { ...links[index], [field]: value };
    update({ hero: { ...data.hero, links } });
  };

  const addHeroLink = () => {
    update({
      hero: {
        ...data.hero,
        links: [...data.hero.links, { label: "Nouveau lien", url: "#" }],
      },
    });
  };

  const removeHeroLink = (index: number) => {
    update({
      hero: {
        ...data.hero,
        links: data.hero.links.filter((_, i) => i !== index),
      },
    });
  };

  /* Experiences */
  const updateExperience = (id: string, field: string, value: string) => {
    update({
      experiences: data.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const addExperience = () => {
    update({
      experiences: [
        ...data.experiences,
        {
          id: `exp-${generateId()}`,
          period: "20XX — 20XX",
          title: "Nouveau poste",
          description: "Description...",
        },
      ],
    });
  };

  const removeExperience = (id: string) => {
    update({
      experiences: data.experiences.filter((exp) => exp.id !== id),
    });
  };

  /* Education */
  const updateEducation = (id: string, field: string, value: string) => {
    update({
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const addEducation = () => {
    update({
      education: [
        ...data.education,
        {
          id: `edu-${generateId()}`,
          title: "Nouvelle formation",
          school: "École",
          year: "20XX",
        },
      ],
    });
  };

  const removeEducation = (id: string) => {
    update({
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  /* Skills */
  const updateSkillCategory = (id: string, name: string) => {
    update({
      skills: data.skills.map((cat) =>
        cat.id === id ? { ...cat, name } : cat
      ),
    });
  };

  const updateSkillTags = (id: string, skills: string[]) => {
    update({
      skills: data.skills.map((cat) =>
        cat.id === id ? { ...cat, skills } : cat
      ),
    });
  };

  const addSkillCategory = () => {
    update({
      skills: [
        ...data.skills,
        {
          id: `skill-${generateId()}`,
          name: "Nouvelle catégorie",
          skills: [],
        },
      ],
    });
  };

  const removeSkillCategory = (id: string) => {
    update({
      skills: data.skills.filter((cat) => cat.id !== id),
    });
  };

  /* Qualities */
  const updateQuality = (id: string, field: string, value: string) => {
    update({
      qualities: data.qualities.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      ),
    });
  };

  const addQuality = () => {
    update({
      qualities: [
        ...data.qualities,
        {
          id: `qual-${generateId()}`,
          title: "Nouvelle qualité",
          description: "Description...",
        },
      ],
    });
  };

  const removeQuality = (id: string) => {
    update({
      qualities: data.qualities.filter((q) => q.id !== id),
    });
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin CMS</h1>
        <div className="admin-header-actions">
          <Link to="/" className="admin-btn">
            ← Portfolio
          </Link>
          <button className="admin-btn" onClick={exportJSON}>
            Exporter JSON
          </button>
          <button className="admin-btn admin-btn-danger" onClick={resetData}>
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="admin-section">
        <h2>Hero</h2>
        <div className="admin-field">
          <label>Titre</label>
          <input
            value={data.hero.title}
            onChange={(e) => updateHero("title", e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label>Sous-titre</label>
          <input
            value={data.hero.subtitle}
            onChange={(e) => updateHero("subtitle", e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label>Description</label>
          <textarea
            value={data.hero.description}
            onChange={(e) => updateHero("description", e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label>Liens</label>
          {data.hero.links.map((link, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <input
                placeholder="Label"
                value={link.label}
                onChange={(e) => updateHeroLink(i, "label", e.target.value)}
                style={{ flex: 1 }}
              />
              <input
                placeholder="URL"
                value={link.url}
                onChange={(e) => updateHeroLink(i, "url", e.target.value)}
                style={{ flex: 2 }}
              />
              <button
                className="admin-btn admin-btn-danger"
                onClick={() => removeHeroLink(i)}
              >
                ×
              </button>
            </div>
          ))}
          <button className="admin-add-btn" onClick={addHeroLink}>
            + Ajouter un lien
          </button>
        </div>
      </div>

      {/* Experiences */}
      <div className="admin-section">
        <h2>Expériences</h2>
        {data.experiences.map((exp) => (
          <div key={exp.id} className="admin-item">
            <div className="admin-item-header">
              <h3>{exp.title || "Sans titre"}</h3>
              <button
                className="admin-btn admin-btn-danger"
                onClick={() => removeExperience(exp.id)}
              >
                Supprimer
              </button>
            </div>
            <div className="admin-field">
              <label>Période</label>
              <input
                value={exp.period}
                onChange={(e) =>
                  updateExperience(exp.id, "period", e.target.value)
                }
              />
            </div>
            <div className="admin-field">
              <label>Titre du poste</label>
              <input
                value={exp.title}
                onChange={(e) =>
                  updateExperience(exp.id, "title", e.target.value)
                }
              />
            </div>
            <div className="admin-field">
              <label>Description</label>
              <textarea
                value={exp.description}
                onChange={(e) =>
                  updateExperience(exp.id, "description", e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <button className="admin-add-btn" onClick={addExperience}>
          + Ajouter une expérience
        </button>
      </div>

      {/* Education */}
      <div className="admin-section">
        <h2>Formation</h2>
        {data.education.map((edu) => (
          <div key={edu.id} className="admin-item">
            <div className="admin-item-header">
              <h3>{edu.title || "Sans titre"}</h3>
              <button
                className="admin-btn admin-btn-danger"
                onClick={() => removeEducation(edu.id)}
              >
                Supprimer
              </button>
            </div>
            <div className="admin-field">
              <label>Titre</label>
              <input
                value={edu.title}
                onChange={(e) =>
                  updateEducation(edu.id, "title", e.target.value)
                }
              />
            </div>
            <div className="admin-field">
              <label>École / Organisme</label>
              <input
                value={edu.school}
                onChange={(e) =>
                  updateEducation(edu.id, "school", e.target.value)
                }
              />
            </div>
            <div className="admin-field">
              <label>Année</label>
              <input
                value={edu.year}
                onChange={(e) =>
                  updateEducation(edu.id, "year", e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <button className="admin-add-btn" onClick={addEducation}>
          + Ajouter une formation
        </button>
      </div>

      {/* Skills */}
      <div className="admin-section">
        <h2>Compétences</h2>
        {data.skills.map((cat) => (
          <div key={cat.id} className="admin-item">
            <div className="admin-item-header">
              <h3>{cat.name}</h3>
              <button
                className="admin-btn admin-btn-danger"
                onClick={() => removeSkillCategory(cat.id)}
              >
                Supprimer
              </button>
            </div>
            <div className="admin-field">
              <label>Nom de la catégorie</label>
              <input
                value={cat.name}
                onChange={(e) => updateSkillCategory(cat.id, e.target.value)}
              />
            </div>
            <div className="admin-field">
              <label>Compétences (Entrée pour ajouter)</label>
              <TagsInput
                tags={cat.skills}
                onChange={(skills) => updateSkillTags(cat.id, skills)}
              />
            </div>
          </div>
        ))}
        <button className="admin-add-btn" onClick={addSkillCategory}>
          + Ajouter une catégorie
        </button>
      </div>

      {/* Qualities */}
      <div className="admin-section">
        <h2>Qualités</h2>
        {data.qualities.map((qual) => (
          <div key={qual.id} className="admin-item">
            <div className="admin-item-header">
              <h3>{qual.title || "Sans titre"}</h3>
              <button
                className="admin-btn admin-btn-danger"
                onClick={() => removeQuality(qual.id)}
              >
                Supprimer
              </button>
            </div>
            <div className="admin-field">
              <label>Titre</label>
              <input
                value={qual.title}
                onChange={(e) =>
                  updateQuality(qual.id, "title", e.target.value)
                }
              />
            </div>
            <div className="admin-field">
              <label>Description</label>
              <textarea
                value={qual.description}
                onChange={(e) =>
                  updateQuality(qual.id, "description", e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <button className="admin-add-btn" onClick={addQuality}>
          + Ajouter une qualité
        </button>
      </div>
    </div>
  );
}

/* ─── Main Admin Page ─── */

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return <LoginScreen onLogin={() => setAuthenticated(true)} />;
  }

  return <AdminDashboard />;
};

export default Admin;
