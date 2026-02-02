import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Download,
  Linkedin,
  Github,
  Palette,
  Timer,
  Wand2,
  Book,
  Coffee,
  Shield,
  X,
} from "lucide-react";

// Sample data - replace with your actual data
const personalInfo = {
  name: "Chloé Halloin",
  photo: "tete.png",
  description: "Product Designer - UX/UI designer",
  descriptionplus:
    "Designer UX/UI et Product Designer passionnée par la création d'expériences digitales qui font sens. J'adore transformer des idées complexes en interfaces intuitives et des objectifs business en parcours pertinents. Entre analyse, wireframes et lignes de code, je m'amuse à concevoir des produits qui allient stratégie, impact utilisateur et viabilité technique.",
  cvUrl: "cv-chloe-halloin.pdf",
  linkedinUrl:
    "https://www.linkedin.com/in/chlo%C3%A9-halloin-front-end-dev-uxui-design/",
  githubUrl: "https://github.com/ChloeHal/PortfolioChloHal",
};

const workPhilosophy =
  "Je crois en un équilibre entre autonomie et collaboration : savoir porter une vision produit, mais aussi la co-construire avec les utilisateurs et les équipes. J'aborde chaque problème avec curiosité, créativité et une grande adaptabilité, en restant toujours à l'écoute des besoins humains derrière les métriques. Pour moi, un bon produit repose sur l'itération constante, la remise en question des hypothèses, et l'envie d'apprendre de chaque test utilisateur. Je préfère avancer avec optimisme, en valorisant l'intelligence collective, la bienveillance dans les feedbacks et la rigueur dans la démarche.";

const experiences = [
  {
    year: "Janvier 2026 - Avril 2026",
    title: "Product Designer Trainee",
    company: "Enobase",
    description:
      "Conception UX/UI pour un générateur d'ERP, avec un focus sur l’optimisation des flux utilisateurs et l’amélioration de l’efficacité opérationnelle.",
  },
  {
    year: "Aout 2023 - Septembre 2025",
    title: "Front-End Designer & Web Developer",
    company: "Vertical Design",
    description:
      "Gestion de projets web sur mesure de bout en bout — de la conception UX/UI et du prototypage jusqu’au développement, au déploiement et à l’hébergement ainsi que la maintenance et l'accompagnement pour la prise en main — pour garantir des solutions personnalisées qui équilibrent les besoins des utilisateurs, la performance technique et les objectifs du client.",
  },
  {
    year: "Juillet -  Aout 2023",
    title: "UX/UI Design Trainee & Web Developer",
    company: "Codika.io",
    description:
      "Conception UX/UI pour des interfaces mobiles, avec un focus sur l’expérience utilisateur, la clarté des parcours et l’engagement au quotidien.",
  },
  {
    year: "Janvier 2021 - Décembre 2022",
    title: "Webdesigner",
    company: "DixNeuf 90",
    description:
      "Design UX/UI et création d’identités de marque cohérentes pour des produits digitaux.",
  },
  {
    year: "Octobre 2020 - Avril 2021",
    title: "e-Commerce Intern",
    company: "Distriplus (Di & Planet Parfum)",
    description:
      "Conception UX/UI et élaboration de concepts digitaux innovants, depuis l’idée initiale jusqu’aux prototypes fonctionnels.",
  },
  {
    year: "Mars 2019 - Aout 2023",
    title: "Executive Director & Graphic Designer",
    company: "Thé OK! ASBL",
    description:
      "Direction d’une organisation à but non lucratif de 15 membres dédiée à la sensibilisation et à l’éducation autour du consentement. Création de supports visuels pour les réseaux sociaux et les supports imprimés.",
  },
  {
    year: "Février - Mai 2019",
    title: "Trainee in the Webshop Team",
    company: "MCS Kick & Rush",
    description:
      "Création de supports imprimés et digitaux : cartes de visite, flyers, affiches et newsletters. Direction artistique pour la création de sites web, contribution à la mise en place d’Odoo, et rédaction de contenus optimisés pour le référencement (SEO).",
  },
];

const education = [
  {
    year: "Septembre 2025 - Avril 2026",
    title: "UX/UI Designer",
    institution: "Interface3",
    description:
      "Formation professionnelle axée sur le design UX/UI et l'accessibilité, combinant théorie et pratique à travers des projets concrets.",
  },
  {
    year: "Novembre 2022 - Aout 2023",
    title: "Developpeur Web",
    institution: "BeCode",
    description:
      "Programme intensif de formation en développement web axé sur la méthodologie active, visant à former des développeurs front-end compétents et adaptables.",
  },
  {
    year: "Septembre 2021 - 2022",
    title: "Bachelier en Écriture Multimédia",
    institution: "ISFSC",
    description:
      "Grande Distinction - Bachelier créatif à destination des métiers du web comme le marketing, le graphisme ou le web.",
  },
  {
    year: "Septembre 2026 - Juin 2020",
    title: "Bachelier en e-Business",
    institution: "EPHEC",
    description:
      "Distinction - Bachelier permettant de développer des compétences dans les différents aspects digitaux d'un business comme le droit, la supply chain, le marketing, le développement web, les bases données, ...",
  },
];

const skills = {
  soft: [
    "Indépendance",
    "Optimisme",
    "Collaboration",
    "Empathie",
    "Curiosité",
    "Constance",
    "Créativité",
    "Polyvalence",
    "Adaptabilité",
    "Fiabilité",
    "Bienveillance",
    "Vulgarisation",
    "Apprentissage continu",
  ],
  hard: [
    "Scrum Master",
    "Product Owner",
    "Odoo",
    "Prestashop",
    "Illustrator",
    "Photoshop",
    "Html",
    "CSS",
    "PHP",
    "Javascript",
    "Liquid",
    "Tailwind",
    "Bootstrap",
    "Wordpress",
    "Shopify",
    "Figma",
    "Adobe XD",
    "Mailchimp",
    "Google Analytics",
  ],
};

interface Project {
  id: number;
  title: string;
  image: string;
  tags: string[];
  services: string[];
  fullImage: string;
  description: string;
  tools: string[];
  gallery?: string[];
  role?: string;
  duration?: string;
  problem?: string;
  objective?: string;
  research?: string;
  designSolutions?: string;
  mockups?: string[];
  technicalImplementation?: string;
  results?: string;
  learnings?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "187 Hippies",
    image: "1872.png",
    tags: [
      "E-commerce",
      "Développement web",
      "Charte graphique",
      "UI/UX Design",
    ],
    services: [
      "E-commerce",
      "Développement web",
      "Charte graphique",
      "UI/UX Design",
    ],
    fullImage: "1872.png",
    description:
      "Création complète d'une plateforme e-commerce pour la maison de production 187 Hippies (Caba & Jean Jass), de la conception de l'identité visuelle au développement technique.",
    tools: ["Shopify", "Liquid", "JavaScript", "Photoshop", "Figma"],

    // Galerie d'images (optionnel - remplace fullImage si présent)
    gallery: ["1872.png", "1872.png", "1872.png"], // Ajoutez vos images ici

    // Mon rôle dans le projet
    role: "Product Designer & Lead Developer - Responsable de la conception UX/UI complète et du développement de la plateforme e-commerce de A à Z",

    // Durée du projet
    duration: "3 mois (Août - Octobre 2023)",

    // Le problème à résoudre
    problem:
      "La maison de production 187 Hippies n'avait aucune présence digitale pour commercialiser le merchandising de ses artistes (Caba & Jean Jass). Le défi majeur était de créer une plateforme e-commerce professionnelle à partir d'un simple logo, sans identité visuelle établie, tout en capturant l'essence de l'univers rap francophone et en gérant les pics de trafic lors des lancements de produits.",

    // L'objectif du projet
    objective:
      "Développer une plateforme e-commerce complète qui reflète authentiquement l'univers artistique de 187 Hippies, optimisée pour les lancements de produits exclusifs et capable de gérer des volumes de trafic importants. L'objectif était de créer une expérience d'achat fluide qui transforme les fans en clients tout en établissant une présence digitale forte dans l'écosystème rap francophone.",

    // Recherches et insights retenus
    research:
      "Analyse approfondie des plateformes e-commerce d'artistes similaires dans le rap francophone et international. Étude des comportements d'achat des fans de rap (principalement mobile-first, achats impulsifs lors des drops). Interviews avec l'équipe de production pour comprendre leurs besoins en gestion de stock, pre-orders et communication avec les fans. Insights clés : nécessité d'une expérience rapide et sans friction, importance de l'authenticité visuelle, et besoin d'outils de gestion simples pour une petite équipe.",

    // Solutions design
    designSolutions:
      "Création d'une identité visuelle urbaine et authentique qui prolonge l'univers des artistes. Mise en place d'un système de grille flexible pour mettre en avant les drops exclusifs et les nouveautés. Design mobile-first avec une navigation simplifiée adaptée aux achats impulsifs. Palette de couleurs sombres et contrastées reflétant l'esthétique du label. Typographie bold et impactante pour les CTAs. Système de badges pour les éditions limitées et produits exclusifs.",

    // Screenshots des maquettes (optionnel)
    mockups: ["1872.png", "1872.png"], // Ajoutez vos maquettes ici

    // Explication de l'implémentation technique
    technicalImplementation:
      "Développement sur Shopify avec personnalisation poussée en Liquid et JavaScript pour créer une expérience unique. Optimisation des performances (lazy loading, compression d'images, minification) pour supporter les pics de trafic lors des lancements. Intégration d'un système de gestion de stock en temps réel avec alertes automatiques. Mise en place d'un système de pre-order personnalisé pour les lancements d'albums et de merchandising exclusif. Configuration de Google Analytics pour tracking des conversions et comportements d'achat. Intégration de Mailchimp pour les newsletters et annonces de drops.",

    // Résultats et impacts
    results:
      "Lancement réussi avec plus de 10 000 visiteurs lors de la première semaine. Taux de conversion de 3.2%, supérieur à la moyenne e-commerce (2-3%). Positionnement en première page Google pour les recherches liées à la marque et aux artistes. Vente de 85% du stock lors du premier drop en moins de 48h. Augmentation de 40% de l'engagement sur les réseaux sociaux grâce aux liens vers la boutique. Retour client positif sur l'expérience d'achat (4.8/5 en moyenne).",

    // Ce que j'ai appris
    learnings:
      "Ce projet m'a permis de comprendre l'importance cruciale de l'optimisation des performances pour les sites e-commerce à fort trafic, particulièrement lors des lancements de produits limités. J'ai développé mes compétences en branding from scratch et appris à créer des expériences authentiques qui résonnent avec une communauté spécifique. La collaboration étroite avec les artistes m'a enseigné l'importance de l'écoute et de la traduction des visions créatives en interfaces fonctionnelles. J'ai également acquis une expertise en gestion de projets e-commerce de bout en bout, de la conception à la maintenance.",
  },

  // 👇 AJOUTEZ VOS NOUVEAUX PROJETS ICI EN COPIANT LA STRUCTURE CI-DESSUS
  // Chaque projet doit être séparé par une virgule
  // Exemple :
  // {
  //   id: 2,
  //   title: "Mon Projet",
  //   image: "mon-projet.png",
  //   tags: ["Tag1", "Tag2"],
  //   services: ["Service1"],
  //   fullImage: "mon-projet.png",
  //   description: "Description courte du projet",
  //   tools: ["Outil1", "Outil2"],
  //   role: "Mon rôle...",
  //   duration: "X mois",
  //   problem: "Le problème...",
  //   objective: "L'objectif...",
  //   research: "Les recherches...",
  //   designSolutions: "Les solutions...",
  //   mockups: ["mockup1.png", "mockup2.png"],
  //   technicalImplementation: "L'implémentation...",
  //   results: "Les résultats...",
  //   learnings: "Ce que j'ai appris...",
  // },
];

const themes = [
  { name: "Par défault", value: "", color: "#3b82f6" },
  { name: "Fleurs", value: "theme-flower", color: "#d946ef" },
  { name: "Vin", value: "theme-wine", color: "#dc2626" },
  { name: "Boxe", value: "theme-box", color: "#0ea5e9" },
  { name: "Real Estate", value: "theme-real-estate", color: "#ea580c" },
  { name: "Agence Média", value: "theme-media", color: "#06b6d4" },
  { name: "Agence Digitale", value: "theme-agency", color: "#8b5cf6" },
  { name: "Artiste", value: "theme-music", color: "#d946ef" },
  { name: "Boite de Production", value: "theme-production", color: "#f59e0b" },
  { name: "Doudou", value: "theme-doudou", color: "#eab308" },
  { name: "Bijoux", value: "theme-luxury", color: "#fbbf24" },
];

const books = [
  "Circé de Madeleine Miller",
  "Propaganda de Edward L. Bernays",
  "Notre dignité de Nesrine Slaoui",
  "La ballerine de Kiev de Stéphanie Perez",
  "La saga Dune de Frank Herbert",
  "Soeurs dans la guerre de Sarah Hall",
  "Le livre des reines de Joumana Haddad",
  "L'illusion du mal de Piergiorgio Pulixi",
  "Betty de Tiffany McDaniel",
  "L'oiseau moqueur de Walter Tevis",
  "Les combustibles de Amélie Nothomb",
  "Le bal des folles de Victoria Mas",
  "La tresse de Laetitia Colombani",
  "Vox de Christina Dalcher",
  "Malevil de Robert Merle",
  "Daisy Jones & The Six de Taylor Jenkins Reid",
  "Madame Einstein de Marie Benedict",
  "La saga Under the Dome de Stephen King",
  "Le quatrième mur de Sorj Chalandon",
  "Acide sulfurique de Amélie Nothomb",
  "Monsieur Ibrahim et les fleurs du Coran de Eric-Emmanuel Schmitt",
  "Chien 51 de Laurent Gaudé",
  "1984 de George Orwell",
  "C'est le coeur qui lâche en premier de Margaret Atwood",
];

export default function Portfolio() {
  const [currentTheme, setCurrentTheme] = useState("");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [ninjaName, setNinjaName] = useState("");
  const [password, setPassword] = useState("");
  const [eggDoneness, setEggDoneness] = useState<"soft" | "medium" | "hard">(
    "medium",
  );
  const [timerTime, setTimerTime] = useState(420); // Default to medium (7 minutes)
  const [timerActive, setTimerActive] = useState(false);
  const [randomBook, setRandomBook] = useState("");
  const [coffeeMood, setCoffeeMood] = useState(0);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  const timerRef = useRef<NodeJS.Timeout>();

  // Check if user has seen the tour
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      setTimeout(() => setShowTour(true), 1000); // Show tour after 1 second
    }
  }, []);

  useEffect(() => {
    document.documentElement.className = currentTheme;
  }, [currentTheme]);

  useEffect(() => {
    // Update timer duration when egg doneness changes
    const durations = {
      soft: 300, // 5 minutes
      medium: 420, // 7 minutes
      hard: 540, // 9 minutes
    };
    setTimerTime(durations[eggDoneness]);
  }, [eggDoneness]);

  useEffect(() => {
    if (timerActive && timerTime > 0) {
      timerRef.current = setTimeout(() => {
        setTimerTime((prev) => prev - 1);
      }, 1000);
    } else if (timerTime === 0) {
      setTimerActive(false);
      alert("Your egg is ready! 🥚");
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timerActive, timerTime]);

  const generateNinjaName = () => {
    const firstNames = [
      "Silent",
      "Big",
      "Sad",
      "Dark",
      "Agile",
      "Fragile",
      "Dumb",
      "Dead",
      "Ghost",
      "Snake",
      "Mysterious",
      "Clumsy",
      "Hollow",
      "Iron",
      "Golden",
      "Gracefull",
      "Invisible",
    ];
    const lastNames = [
      "Killer",
      "Soldier",
      "Assassin",
      "Demon",
      "Hunter",
      "Spider",
      "Bullet",
      "Buildozer",
      "Stalker",
      "Samaritan",
      "Ninja",
      "Thunder",
      "Wolf",
      "Shade",
      "Dagger",
      "Master",
    ];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    setNinjaName(`${firstName} ${lastName}`);
  };

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let result = "";
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    setTimerActive(true);
  };

  const resetTimer = () => {
    setTimerActive(false);
    const durations = {
      soft: 300, // 5 minutes
      medium: 420, // 7 minutes
      hard: 540, // 9 minutes
    };
    setTimerTime(durations[eggDoneness]);
  };

  const pickRandomBook = () => {
    const book = books[Math.floor(Math.random() * books.length)];
    setRandomBook(book);
  };

  const checkCoffeeMood = (cups: number) => {
    if (cups <= 0)
      return "Je sais que tu rêve plus d'un café que de connaître la soirée de Karen! ☕";
    if (cups === 1)
      return "Tu sais comment dire bonjour, mais ton regard est encore un peu passif/agressif.";
    if (cups === 2)
      return "Sociabilisation tolérée. Tu es apte pour répondre à des questions complexes. ☕";
    if (cups === 3)
      return "Tu ris, tu souris, tu peux presque parler météo sans pleurer.";
    if (cups === 4)
      return "Feu vert 🚀 Tu proposes même d'aller chercher la prochaine fournée.";
    if (cups === 5)
      return "Tu peux tenir un Ted Talk mais essaye quand même de rester focus ";
    if (cups === 6)
      return "Même si Lorelai Gilmore te vénère, on n'est pas encore à l'after work 😅";
    if (cups === 7) return "Oui ... ça s'appelle une tachycardie";
    return "Explosion ou implosion ... ça va mal finir 🤯";
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">{personalInfo.name}</h1>
          </div>
          <button
            onClick={() => setShowThemeSelector(!showThemeSelector)}
            className="btn btn-ghost btn-sm relative"
          >
            <Palette className="w-4 h-4 mr-1" />
            Choisis ton thème
            {showThemeSelector && (
              <div className="absolute top-full right-0 mt-2 p-4 bg-background border border-border rounded-lg shadow-lg min-w-[200px]">
                <div className="flex flex-col gap-2">
                  {themes.map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => {
                        setCurrentTheme(theme.value);
                        setShowThemeSelector(false);
                      }}
                      className={`px-3 py-2 rounded text-left ${
                        currentTheme === theme.value
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      }`}
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in-up">
            <img
              src={personalInfo.photo}
              alt={personalInfo.name}
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg"
            />
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {personalInfo.name}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
              {personalInfo.description}
            </p>
            <p className="text-md leading-relaxed max-w-4xl mb-8 mx-auto">
              {personalInfo.descriptionplus}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={personalInfo.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg inline-flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Voir le CV
              </a>
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-lg inline-flex items-center gap-2"
              >
                <Linkedin className="w-5 h-5" />
                Profil LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Ma philosophie de travail</h2>
          <p className="text-md leading-relaxed max-w-4xl mx-auto">
            {workPhilosophy}
          </p>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Expérience Professionnelle
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="timeline">
              {experiences.map((exp, index) => (
                <div key={index}>
                  <div className="timeline-dot"></div>
                  <div className="bg-card p-6 rounded-lg shadow-sm">
                    <div className="text-sm text-muted-foreground mb-1">
                      {exp.year}
                    </div>
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <div className="text-primary font-medium mb-2">
                      {exp.company}
                    </div>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Parcours d'apprentissage
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="timeline">
              {education.map((edu, index) => (
                <div key={index} className="mb-8">
                  <div className="timeline-dot"></div>
                  <div className="bg-card p-6 rounded-lg shadow-sm">
                    <div className="text-sm text-muted-foreground mb-1">
                      {edu.year}
                    </div>
                    <h3 className="text-xl font-semibold">{edu.title}</h3>
                    <div className="text-primary font-medium mb-2">
                      {edu.institution}
                    </div>
                    <p className="text-muted-foreground">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Compétences</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Soft Skills</h3>
              <div className="flex flex-wrap">
                {skills.soft.map((skill, index) => (
                  <span key={index} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Hard Skills</h3>
              <div className="flex flex-wrap">
                {skills.hard.map((skill, index) => (
                  <span key={index} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Projets Réalisés
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Cette section est actuellement en cours de révision, car les projets
            présentés ne correspondent plus à mes objectifs professionnels. Je
            serais néanmoins ravie d'en discuter avec vous lors d'un entretien.
          </p>
          {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-card shadow-md cursor-pointer"
                onClick={() => {
                  setSelectedProject(project);
                  setIsDrawerOpen(true);
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/* Interactive Tools */}
      <section className="py-16 px-4" id="bonus-tools">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Les Outils Bonus
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            On est pas bien ici? Alors, restons encore un peu ensemble!
          </p>
          <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-sm p-6">
            <Tabs defaultValue="ninja">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="ninja">Ninja Name</TabsTrigger>
                <TabsTrigger value="password">Password Generator</TabsTrigger>
                <TabsTrigger value="egg">Egg Timer</TabsTrigger>
                <TabsTrigger value="book">Book Picker</TabsTrigger>
                <TabsTrigger value="coffee">Coffee Mood</TabsTrigger>
              </TabsList>

              <TabsContent value="ninja" className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Wand2 className="w-5 h-5 text-[hsl(var(--tool-highlight))]" />
                  <h3 className="font-semibold">
                    Découvre ton nom de Ninja. Même si il n'est pas italien ...
                    il est quand même top!
                  </h3>
                </div>
                <button
                  onClick={generateNinjaName}
                  className="btn btn-primary btn-sm mb-3 w-full"
                >
                  Découvrir
                </button>
                {ninjaName && (
                  <div className="p-2 bg-secondary text-secondary-foreground rounded text-center font-medium">
                    {ninjaName}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="password" className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-[hsl(var(--tool-highlight))]" />
                  <h3 className="font-semibold">
                    Génère ton nouveau mots de passe sécurisé.... Garanti sans
                    "mdp123"
                  </h3>
                </div>
                <button
                  onClick={generatePassword}
                  className="btn btn-primary btn-sm mb-3 w-full"
                >
                  Générer
                </button>
                {password && (
                  <div className="p-2 bg-secondary text-secondary-foreground rounded text-center font-mono text-sm break-all">
                    {password}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="egg" className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Timer className="w-5 h-5 text-[hsl(var(--tool-highlight))]" />
                  <h3 className="font-semibold">
                    Ne plus se tromper sur la cuisson de ses oeufs.
                  </h3>
                </div>

                <div className="flex gap-4 justify-center mb-4">
                  {["soft", "medium", "hard"].map((type) => (
                    <button
                      key={type}
                      onClick={() =>
                        setEggDoneness(type as "soft" | "medium" | "hard")
                      }
                      className={`px-4 py-2 rounded-md ${
                        eggDoneness === type
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="text-center mb-2">
                  <p className="text-sm text-muted-foreground">
                    C'est parti pour :{" "}
                    {eggDoneness === "soft"
                      ? "5"
                      : eggDoneness === "medium"
                        ? "7"
                        : "9"}{" "}
                    minutes
                  </p>
                </div>

                <div className="text-center text-2xl font-bold mb-3">
                  {formatTime(timerTime)}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={startTimer}
                    disabled={timerActive}
                    className="btn btn-primary btn-sm flex-1"
                  >
                    Lancer le chrono
                  </button>
                  <button
                    onClick={resetTimer}
                    className="btn btn-outline btn-sm flex-1"
                  >
                    Reset
                  </button>
                </div>
              </TabsContent>

              <TabsContent value="book" className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Book className="w-5 h-5 text-[hsl(var(--tool-highlight))]" />
                  <h3 className="font-semibold">
                    Mon conseil lecture: J'espère qu'on a les mêmes goûts!
                  </h3>
                </div>
                <button
                  onClick={pickRandomBook}
                  className="btn btn-primary btn-sm mb-3 w-full"
                >
                  Découvrir un livre
                </button>
                {randomBook && (
                  <div className="p-2 bg-secondary text-secondary-foreground rounded text-center">
                    {randomBook}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="coffee" className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Coffee className="w-5 h-5 text-[hsl(var(--tool-highlight))]" />
                  <h3 className="font-semibold">
                    Dis moi à combien tu es de café pour aujourd'hui ....
                  </h3>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    ... et je te dirais si ça vaut la peine que tu sociabilise
                    ou non.
                  </p>
                  <Slider
                    defaultValue={[coffeeMood]}
                    min={0}
                    max={8}
                    step={1}
                    onValueChange={(value) => setCoffeeMood(value[0])}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8+</span>
                  </div>
                </div>

                <div className="p-2 bg-secondary text-secondary-foreground rounded text-center font-medium mt-3">
                  {checkCoffeeMood(coffeeMood)}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Project Drawer */}
      <Sheet
        open={isDrawerOpen}
        onOpenChange={(open) => {
          // Only allow closing if no image is zoomed
          if (!open && zoomedImage) {
            return;
          }
          setIsDrawerOpen(open);
        }}
      >
        <SheetContent
          side="right"
          className="w-full sm:w-[600px] md:w-[700px] lg:w-[800px] sm:max-w-none overflow-y-auto p-0"
        >
          <SheetHeader className="sticky top-0 bg-background z-10 border-b p-6">
            <div className="flex items-center justify-between pr-10">
              <SheetTitle className="text-2xl">
                {selectedProject?.title}
              </SheetTitle>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Fermer</span>
              </button>
            </div>
          </SheetHeader>

          <div className="p-6 space-y-6 pb-20">
            {selectedProject && (
              <>
                {/* Image principale ou Galerie d'images */}
                {(selectedProject.gallery || selectedProject.fullImage) && (
                  <div className="space-y-3">
                    {selectedProject.gallery &&
                    selectedProject.gallery.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedProject.gallery.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`${selectedProject.title} - ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => setZoomedImage(img)}
                          />
                        ))}
                      </div>
                    ) : (
                      <img
                        src={selectedProject.fullImage}
                        alt={selectedProject.title}
                        className="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() =>
                          setZoomedImage(selectedProject.fullImage)
                        }
                      />
                    )}
                  </div>
                )}

                {/* Description générale */}
                {selectedProject.description && (
                  <div>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>
                )}

                {/* Mon rôle */}
                {selectedProject.role && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Mon rôle</h4>
                    <p className="text-muted-foreground">
                      {selectedProject.role}
                    </p>
                  </div>
                )}

                {/* Durée */}
                {selectedProject.duration && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Durée</h4>
                    <p className="text-muted-foreground">
                      {selectedProject.duration}
                    </p>
                  </div>
                )}

                {/* Technologies utilisées */}
                {selectedProject.tools && selectedProject.tools.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Technologies utilisées
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tools.map((tool, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Le problème */}
                {selectedProject.problem && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Le problème</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.problem}
                    </p>
                  </div>
                )}

                {/* L'objectif */}
                {selectedProject.objective && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2">L'objectif</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.objective}
                    </p>
                  </div>
                )}

                {/* Recherches et insights */}
                {selectedProject.research && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Recherches et insights
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.research}
                    </p>
                  </div>
                )}

                {/* Solutions designs */}
                {(selectedProject.designSolutions ||
                  (selectedProject.mockups &&
                    selectedProject.mockups.length > 0)) && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Solutions design
                    </h4>
                    {selectedProject.designSolutions && (
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        {selectedProject.designSolutions}
                      </p>
                    )}
                    {selectedProject.mockups &&
                      selectedProject.mockups.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                          {selectedProject.mockups.map((mockup, index) => (
                            <img
                              key={index}
                              src={mockup}
                              alt={`Maquette ${index + 1}`}
                              className="w-full h-auto object-cover rounded-lg border cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => setZoomedImage(mockup)}
                            />
                          ))}
                        </div>
                      )}
                  </div>
                )}

                {/* Implémentation technique */}
                {selectedProject.technicalImplementation && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Implémentation technique
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.technicalImplementation}
                    </p>
                  </div>
                )}

                {/* Résultats et impacts */}
                {selectedProject.results && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Résultats et impacts
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.results}
                    </p>
                  </div>
                )}

                {/* Ce que j'ai appris */}
                {selectedProject.learnings && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Ce que j'ai appris
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.learnings}
                    </p>
                  </div>
                )}

                {/* Services fournis */}
                {selectedProject.services &&
                  selectedProject.services.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold mb-2">
                        Services fournis
                      </h4>
                      <ul className="space-y-1">
                        {selectedProject.services.map((service, index) => (
                          <li key={index} className="text-muted-foreground">
                            • {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Image Zoom Lightbox */}
      {zoomedImage &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center p-4"
            style={{ zIndex: 2147483647, pointerEvents: "auto" }}
            onClick={() => setZoomedImage(null)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              style={{ pointerEvents: "auto", cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                setZoomedImage(null);
              }}
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={zoomedImage}
              alt="Zoomed image"
              className="max-w-full max-h-full object-contain"
              style={{ pointerEvents: "none" }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body,
        )}

      {/* GitHub Floating Button */}
      <a
        href={personalInfo.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="github-float"
        title="Visit my GitHub"
        id="github-button"
      >
        <Github className="w-6 h-6" />
        Read me
      </a>

      {/* Tour Guide */}
      {showTour && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-[9999]"
            style={{ pointerEvents: tourStep === 3 ? 'auto' : 'none' }}
          />

          {/* Step 1: Theme Selector */}
          {tourStep === 0 && (
            <div
              className="fixed top-20 right-4 z-[10000] bg-background border-2 border-primary rounded-lg shadow-2xl p-6 max-w-sm animate-fade-in-up"
              style={{ pointerEvents: 'auto' }}
            >
              <div className="flex items-start gap-3 mb-4">
                <Palette className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Sélecteur de thème</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Ces thèmes représentent les différents <strong>secteurs d'activité</strong> pour lesquels j'ai travaillé.
                    Chaque thème reflète un univers professionnel distinct que j'ai eu l'occasion d'explorer.
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => {
                    setShowTour(false);
                    localStorage.setItem('hasSeenTour', 'true');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Passer le tour
                </button>
                <button
                  onClick={() => {
                    setTourStep(1);
                    setTimeout(() => {
                      document.getElementById('bonus-tools')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                  }}
                  className="btn btn-primary btn-sm"
                >
                  Suivant (1/3)
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Bonus Tools */}
          {tourStep === 1 && (
            <div
              className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-[10000] bg-background border-2 border-primary rounded-lg shadow-2xl p-6 max-w-md animate-fade-in-up"
              style={{ pointerEvents: 'auto' }}
            >
              <div className="flex items-start gap-3 mb-4">
                <Wand2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Les Outils Bonus</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Cette section est un <strong>moyen ludique</strong> pour vous faire rester plus longtemps sur le site
                    et vous assurer que vous vous souviendrez de mon nom. Un peu d'amusement ne fait jamais de mal!
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => {
                    setTourStep(0);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Retour
                </button>
                <button
                  onClick={() => setTourStep(2)}
                  className="btn btn-primary btn-sm"
                >
                  Suivant (2/3)
                </button>
              </div>
            </div>
          )}

          {/* Step 3: GitHub Button */}
          {tourStep === 2 && (
            <div
              className="fixed bottom-20 right-40 z-[10000] bg-background border-2 border-primary rounded-lg shadow-2xl p-6 max-w-sm animate-fade-in-up"
              style={{ pointerEvents: 'auto' }}
            >
              <div className="flex items-start gap-3 mb-4">
                <Github className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Read me</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Cliquez ici pour en savoir plus sur les <strong>aspects techniques</strong> de ce portfolio :
                    technologies utilisées, architecture, et choix de développement.
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => setTourStep(1)}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Retour
                </button>
                <button
                  onClick={() => {
                    setShowTour(false);
                    setTourStep(0);
                    localStorage.setItem('hasSeenTour', 'true');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn btn-primary btn-sm"
                >
                  Terminer (3/3)
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Tour Restart Button */}
      {!showTour && (
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
              setShowTour(true);
              setTourStep(0);
            }, 500);
          }}
          className="fixed bottom-20 left-4 w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-all z-[9998]"
          title="Relancer le tour guidé"
        >
          <Wand2 className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
