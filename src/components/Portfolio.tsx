import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
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
  description: "UX/UI designer & Front-end developper.",
  descriptionplus:
    "Designer UX/UI et développeuse web passionnée par la création d'expériences digitales qui font sens. J'adore transformer des idées complexes en interfaces intuitives et des objectifs en parcours pertinents. Entre wireframes et lignes de code, je m'amuse à mettre sur pied des projets qui allient esthétique, efficacité et fonctionnalité.",
  cvUrl: "CV-ChloeHalloin.pdf",
  linkedinUrl:
    "https://www.linkedin.com/in/chlo%C3%A9-halloin-front-end-dev-uxui-design/",
  githubUrl: "https://github.com/yourprofile",
};

const workPhilosophy =
  "Je crois en un équilibre entre autonomie et collaboration : savoir avancer seule, mais aussi co-construire avec les autres. J’aborde chaque projet avec curiosité, créativité et une grande adaptabilité, en restant toujours à l’écoute des besoins humains derrière les objectifs. Pour moi, un bon travail repose sur la constance, la remise en question, et l’envie d’apprendre sans cesse. Je préfère avancer avec optimisme, en valorisant l’intelligence collective, la bienveillance et la rigueur.";

const experiences = [
  {
    year: "Aout 2023 - Present",
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
    year: "Novembre 2022 - Aout 2023",
    title: "Web Developer Trainee",
    company: "BeCode",
    description:
      "Apprentissage par la méthodologie active dans l’objectif de devenir développeur front-end.",
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
    "Constante",
    "Créativité",
    "Polyvalence",
    "Adaptabilité",
    "Fiabilité",
    "Bienveillance",
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

const projects = [
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
    description: "Description is coming",
    tools: ["Shopify", "Liquid", "JavaScript", "Photoshop"],
  },
  {
    id: 2,
    title: "Ambiance Altitude",
    image: "ambiancealtitude2.png",
    tags: ["UI/UX Design"],
    services: ["UI/UX Design"],
    fullImage: "ambiancealtitude2.png",
    description: "Description is coming",
    tools: ["Figma", "Illustrator"],
  },
  {
    id: 3,
    title: "Ambiance Cuisine",
    image: "ambiancecuisine2.png",
    tags: ["Développement web"],
    services: ["Développement web"],
    fullImage: "ambiancecuisine2.png",
    description: "Description is coming",
    tools: ["Figma", "Wordpress", "Elementor", "Javascript", "PHP"],
  },
  {
    id: 4,
    title: "Avril Kids",
    image: "avril2.png",
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
    fullImage: "avril2.png",
    description: "Description is coming",
    tools: ["Shopify", "Liquid", "JavaScript", "Photoshop", "Illustrator"],
  },
  {
    id: 5,
    title: "La Bastide",
    image: "bastide2.png",
    tags: ["Branding", "Charte graphique", "UI/UX Design"],
    services: ["Branding", "Charte graphique", "UI/UX Design"],
    fullImage: "bastide2.png",
    description: "Description is coming",
    tools: ["Figma", "Illustrator", "Photoshop"],
  },
  {
    id: 6,
    title: "Berquin Jewels",
    image: "berquin2.png",
    tags: ["Développement web", "Formation", "SEO Optimization"],
    services: ["Développement web", "Formation", "SEO Optimization"],
    fullImage: "berquin2.png",
    description: "Description is coming",
    tools: ["Figma", "Wordpress", "Elementor", "Javascript", "PHP"],
  },
  {
    id: 7,
    title: "Damso",
    image: "damso2.png",
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
    fullImage: "damso2.png",
    description: "Description is coming",
    tools: [
      "Figma",
      "Shopify",
      "Liquid",
      "JavaScript",
      "Illustrator",
      "Photoshop",
    ],
  },
  {
    id: 8,
    title: "Digilime",
    image: "digilime2.png",
    tags: ["Développement web", "Charte graphique", "UI/UX Design"],
    services: ["Développement web", "Charte graphique", "UI/UX Design"],
    fullImage: "digilime2.png",
    description: "Description is coming",
    tools: [
      "Figma",
      "Wordpress",
      "Elementor",
      "Javascript",
      "PHP",
      "Illustrator",
    ],
  },
  {
    id: 9,
    title: "Gobox",
    image: "gobox2.png",
    tags: [
      "UI/UX Design",
      "Charte graphique",
      "Développement web",
      "Traitement d'images",
      "SEO Optimization",
    ],
    services: [
      "UI/UX Design",
      "Charte graphique",
      "Développement web",
      "Traitement d'images",
      "SEO Optimization",
    ],
    fullImage: "gobox2.png",
    description: "Description is coming",
    tools: [
      "Figma",
      "Wordpress",
      "Understrap",
      "ACF",
      "Javascript",
      "PHP",
      "Illustrator",
      "Photoshop",
    ],
  },
  {
    id: 10,
    title: "Jump XL",
    image: "jump2.png",
    tags: [
      "UI/UX Design",
      "Charte graphique",
      "Développement web",
      "Traitement d'images",
      "SEO Optimization",
    ],
    services: [
      "UI/UX Design",
      "Charte graphique",
      "Développement web",
      "Traitement d'images",
      "SEO Optimization",
    ],
    fullImage: "jump2.png",
    description: "Description is coming",
    tools: [
      "Figma",
      "Wordpress",
      "Elementor",
      "Javascript",
      "PHP",
      "Illustrator",
      "Photoshop",
    ],
  },
  {
    id: 11,
    title: "Ninja Clicker",
    image: "ninja2.png",
    tags: ["Illustration", "UI/UX Design", "Développement web"],
    services: ["Illustration", "Développement web"],
    fullImage: "ninja2.png",
    description: "Description is coming",
    tools: [
      "Vite",
      "Tailwind",
      "Javascript",
      "Typescript",
      "MongoDB",
      "Figma",
      "Illustrator",
    ],
  },
  {
    id: 12,
    title: "Red Sheep Agency",
    image: "redsheep2.png",
    tags: ["Branding", "UI/UX Design", "Développement web", "SEO Optimization"],
    services: [
      "Branding",
      "UI/UX Design",
      "Développement web",
      "SEO Optimization",
    ],
    fullImage: "redsheep2.png",
    description: "Description is coming",
    tools: [
      "Figma",
      "Wordpress",
      "Elementor",
      "Javascript",
      "PHP",
      "Illustrator",
      "Photoshop",
    ],
  },
  {
    id: 13,
    title: "Season Flowers",
    image: "season2.png",
    tags: [
      "UI/UX Design",
      "Charte graphique",
      "Développement web",
      "Illustration",
      "SEO Optimization",
    ],
    services: [
      "UI/UX Design",
      "Charte graphique",
      "Développement web",
      "Illustration",
      "SEO Optimization",
    ],
    fullImage: "season2.png",
    description: "Description is coming",
    tools: [
      "Figma",
      "Wordpress",
      "Elementor",
      "Javascript",
      "PHP",
      "Illustrator",
      "Photoshop",
    ],
  },
  {
    id: 14,
    title: "Vertical Design",
    image: "vertical2.png",
    tags: ["Branding", "UI/UX Design", "Développement web", "SEO Optimization"],
    services: [
      "Branding",
      "UI/UX Design",
      "Développement web",
      "SEO Optimization",
    ],
    fullImage: "vertical2.png",
    description: "Description is coming",
    tools: [
      "Figma",
      "Wordpress",
      "Understrap",
      "ACF",
      "Javascript",
      "PHP",
      "Illustrator",
      "Photoshop",
    ],
  },
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
  { name: "Luxe", value: "theme-luxury", color: "#fbbf24" },
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
  "Madame Einstein de MArie Benedict",
  "La saga Under the Dome de Stephen King",
  "Le quatrième mur de Sorj Chalandon",
  "Acide sulfurique de Amélie Nothomb",
  "Monsieur Ibrahim et les fleurs du Coran de Eric-Emmanuel Schmitt",
  "Chien 51 de Laurent Gaudé",
  "1984 de George Orwell",
];

export default function Portfolio() {
  const [currentTheme, setCurrentTheme] = useState("");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [ninjaName, setNinjaName] = useState("");
  const [password, setPassword] = useState("");
  const [eggDoneness, setEggDoneness] = useState<"soft" | "medium" | "hard">(
    "medium"
  );
  const [timerTime, setTimerTime] = useState(420); // Default to medium (7 minutes)
  const [timerActive, setTimerActive] = useState(false);
  const [randomBook, setRandomBook] = useState("");
  const [coffeeMood, setCoffeeMood] = useState(0);
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  const timerRef = useRef<NodeJS.Timeout>();

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
            <p className="text-lg leading-relaxed max-w-4xl mb-8 mx-auto">
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
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Ma philosophie de travail</h2>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto">
            {workPhilosophy}
          </p>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Experience Professionelle
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="timeline">
              {experiences.map((exp, index) => (
                <div key={index} className="mb-8">
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
      <section className="py-16 px-4 bg-muted/30">
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
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Projets Réalisés
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-card shadow-md"
                onClick={() => setSelectedProject(project)}
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
          </div>
        </div>
      </section>

      {/* Interactive Tools */}
      <section className="py-16 px-4">
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
                  <div className="p-2 bg-secondary rounded text-center font-medium">
                    {ninjaName}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="password" className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-[hsl(var(--tool-highlight))]" />
                  <h3 className="font-semibold">
                    Génère ton nouveau mots de passe sécurisé.... Garanti sans
                    de "mdp123"
                  </h3>
                </div>
                <button
                  onClick={generatePassword}
                  className="btn btn-primary btn-sm mb-3 w-full"
                >
                  Générer
                </button>
                {password && (
                  <div className="p-2 bg-secondary rounded text-center font-mono text-sm break-all">
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
                  <div className="p-2 bg-secondary rounded text-center">
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

                <div className="p-2 bg-secondary rounded text-center font-medium mt-3">
                  {checkCoffeeMood(coffeeMood)}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className={`modal-overlay ${selectedProject ? "open" : ""}`}
          onClick={() => setSelectedProject(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-background/80 hover:bg-background flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
              <img
                src={selectedProject.fullImage}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3">
                {selectedProject.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {selectedProject.description}
              </p>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Outils utilisés:</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedProject.tools.map((tool, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-secondary text-secondary-foreground text-sm rounded"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Services fournis:</h4>
                <ul className="space-y-1">
                  {selectedProject.services.map((service, index) => (
                    <li key={index} className="text-muted-foreground">
                      • {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GitHub Floating Button */}
      <a
        href={personalInfo.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="github-float"
        title="Visit my GitHub"
      >
        <Github className="w-6 h-6" />
      </a>
    </div>
  );
}
