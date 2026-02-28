import { Github } from "lucide-react";

const ReadMeButton = () => {
  return (
    <a
      href="https://github.com/ChloeHal/PortfolioChloHal"
      target="_blank"
      rel="noopener noreferrer"
      className="readme-float"
      aria-label="Voir le code source sur GitHub"
      id="github-button"
    >
      <Github size={24} aria-hidden="true" />
      Read me
    </a>
  );
};

export default ReadMeButton;
