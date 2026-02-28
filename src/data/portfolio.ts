export interface Experience {
  id: string;
  period: string;
  title: string;
  company: string;
  description: string;
}

export interface Education {
  id: string;
  title: string;
  school: string;
  year: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface Quality {
  id: string;
  title: string;
  description: string;
}

export interface HeroLink {
  label: string;
  url: string;
}

export interface PortfolioData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    links: HeroLink[];
  };
  experiences: Experience[];
  education: Education[];
  skills: SkillCategory[];
  qualities: Quality[];
}

export const defaultData: PortfolioData = {
  hero: {
    title: "Chloé Halloin",
    subtitle: "Product Designer · Design Engineer",
    description:
      "Je conçois des produits et je les code. De la recherche utilisateur au composant React, je couvre tout le spectre — UX research, product design, design systems et front-end engineering. Je crois que les meilleurs produits naissent quand design et code avancent ensemble.",
    links: [
      {
        label: "LinkedIn ↗",
        url: "https://www.linkedin.com/in/chlo%C3%A9-halloin/",
      },
      {
        label: "GitHub ↗",
        url: "https://github.com/ChloeHal",
      },
      {
        label: "Email ↗",
        url: "mailto:halloinchloe@gmail.com",
      },
      {
        label: "X ↗",
        url: "https://x.com/chlohal",
      },
      {
        label: "CV ↗",
        url: "CV-ChloeHalloin.pdf",
      },
    ],
  },
  experiences: [
    {
      id: "exp-1",
      period: "Janvier 2026 — Avril 2026",
      title: "Product Designer Trainee",
      company: "Enobase",
      description:
        "Conception UX/UI pour un générateur d'ERP, avec un focus sur l'optimisation des flux utilisateurs et l'amélioration de l'efficacité opérationnelle.",
    },
    {
      id: "exp-2",
      period: "Août 2023 — Septembre 2025",
      title: "Front-End Designer & Web Developer",
      company: "Vertical Design",
      description:
        "Gestion de projets web sur mesure de bout en bout — de la conception UX/UI et du prototypage jusqu'au développement, au déploiement et à l'hébergement ainsi que la maintenance et l'accompagnement pour la prise en main — pour garantir des solutions personnalisées qui équilibrent les besoins des utilisateurs, la performance technique et les objectifs du client.",
    },
    {
      id: "exp-3",
      period: "Juillet — Août 2023",
      title: "UX/UI Design Trainee & Web Developer",
      company: "Codika.io",
      description:
        "Conception UX/UI pour des interfaces mobiles, avec un focus sur l'expérience utilisateur, la clarté des parcours et l'engagement au quotidien.",
    },
    {
      id: "exp-4",
      period: "Janvier 2021 — Décembre 2022",
      title: "Webdesigner",
      company: "DixNeuf 90",
      description:
        "Design UX/UI et création d'identités de marque cohérentes pour des produits digitaux.",
    },
    {
      id: "exp-5",
      period: "Octobre 2020 — Avril 2021",
      title: "e-Commerce Intern",
      company: "Distriplus (Di & Planet Parfum)",
      description:
        "Conception UX/UI et élaboration de concepts digitaux innovants, depuis l'idée initiale jusqu'aux prototypes fonctionnels.",
    },
    {
      id: "exp-6",
      period: "Mars 2019 — Août 2023",
      title: "Executive Director & Graphic Designer",
      company: "Thé OK! ASBL",
      description:
        "Direction d'une organisation à but non lucratif de 15 membres dédiée à la sensibilisation et à l'éducation autour du consentement. Création de supports visuels pour les réseaux sociaux et les supports imprimés.",
    },
    {
      id: "exp-7",
      period: "Février — Mai 2019",
      title: "Trainee in the Webshop Team",
      company: "MCS Kick & Rush",
      description:
        "Création de supports imprimés et digitaux : cartes de visite, flyers, affiches et newsletters. Direction artistique pour la création de sites web, contribution à la mise en place d'Odoo, et rédaction de contenus optimisés pour le référencement (SEO).",
    },
  ],
  education: [
    {
      id: "edu-1",
      title: "UX/UI Designer",
      school: "Interface3",
      year: "Septembre 2025 — Avril 2026",
      description:
        "Formation professionnelle axée sur le design UX/UI et l'accessibilité, combinant théorie et pratique à travers des projets concrets.",
    },
    {
      id: "edu-2",
      title: "Développeur Web",
      school: "BeCode",
      year: "Novembre 2022 — Août 2023",
      description:
        "Programme intensif de formation en développement web axé sur la méthodologie active, visant à former des développeurs front-end compétents et adaptables.",
    },
    {
      id: "edu-3",
      title: "Bachelier en Écriture Multimédia",
      school: "ISFSC",
      year: "Septembre 2021 — 2022",
      description:
        "Grande Distinction — Bachelier créatif à destination des métiers du web comme le marketing, le graphisme ou le web.",
    },
    {
      id: "edu-4",
      title: "Bachelier en e-Business",
      school: "EPHEC",
      year: "Septembre 2016 — Juin 2020",
      description:
        "Distinction — Bachelier permettant de développer des compétences dans les différents aspects digitaux d'un business comme le droit, la supply chain, le marketing, le développement web, les bases de données.",
    },
  ],
  skills: [
    {
      id: "skill-product",
      name: "Produit & UX",
      skills: [
        "UX Research",
        "User Interviews",
        "User Flows",
        "Wireframing",
        "Usability Testing",
        "Product Strategy",
      ],
    },
    {
      id: "skill-design",
      name: "UI & Design Systems",
      skills: [
        "Figma",
        "Design Systems",
        "UI Design",
        "Prototyping",
        "Design Tokens",
        "Motion Design",
      ],
    },
    {
      id: "skill-eng",
      name: "Développement Front-End",
      skills: [
        "React",
        "TypeScript",
        "HTML/CSS",
        "Tailwind",
        "Next.js",
        "Storybook",
      ],
    },
    {
      id: "skill-methods",
      name: "Méthodes & Outils",
      skills: [
        "Agile/Scrum",
        "Git",
        "CI/CD",
        "Accessibility (a11y)",
        "Analytics",
        "Notion",
      ],
    },
  ],
  qualities: [
    {
      id: "qual-1",
      title: "Full-stack design",
      description:
        "De la discovery au delivery. Je mène la recherche utilisateur, conçois l'expérience, dessine l'interface et je l'implémente — un seul interlocuteur, zéro perte en traduction.",
    },
    {
      id: "qual-2",
      title: "Design ↔ Code",
      description:
        "Je parle les deux langages. Je traduis l'intention design en code fidèle, et les contraintes techniques en opportunités design. Les design systems que je crée vivent en Figma et en React.",
    },
    {
      id: "qual-3",
      title: "Product mindset",
      description:
        "Je ne conçois pas des écrans, je résous des problèmes. Chaque décision design est argumentée par de la data, des insights utilisateurs ou un objectif business clair.",
    },
    {
      id: "qual-4",
      title: "Adaptabilité sectorielle",
      description:
        "Capacité à comprendre rapidement les codes visuels, les users et les enjeux de chaque industrie pour y adapter le produit.",
    },
  ],
};
