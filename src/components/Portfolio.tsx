import { useState, useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
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
  X
} from 'lucide-react';

// Sample data - replace with your actual data
const personalInfo = {
  name: "John Doe",
  photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  description: "Full-stack developer passionate about creating beautiful and functional web experiences.",
  cvUrl: "/path-to-your-cv.pdf",
  linkedinUrl: "https://linkedin.com/in/yourprofile",
  githubUrl: "https://github.com/yourprofile"
};

const workPhilosophy = "I believe in writing clean, maintainable code that not only works but tells a story. Every line of code should serve a purpose, and every feature should enhance the user experience. Collaboration and continuous learning are at the heart of my development process.";

const experiences = [
  {
    year: "2023 - Present",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    description: "Led the development of responsive web applications using React and TypeScript. Collaborated with design teams to create intuitive user interfaces."
  },
  {
    year: "2021 - 2023",
    title: "Full-Stack Developer",
    company: "StartupXYZ",
    description: "Built scalable web applications from scratch using modern technologies. Implemented CI/CD pipelines and maintained high code quality standards."
  },
  {
    year: "2019 - 2021",
    title: "Junior Developer",
    company: "WebSolutions Ltd.",
    description: "Developed and maintained client websites using various web technologies. Gained experience in both frontend and backend development."
  }
];

const education = [
  {
    year: "2015 - 2019",
    title: "Computer Science Degree",
    institution: "University of Technology",
    description: "Graduated with honors. Specialized in software engineering and web development."
  },
  {
    year: "2018",
    title: "Web Development Bootcamp",
    institution: "CodeAcademy",
    description: "Intensive 12-week program focusing on modern web development technologies."
  }
];

const skills = {
  soft: ["Problem Solving", "Team Leadership", "Communication", "Adaptability", "Time Management", "Critical Thinking"],
  hard: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL", "Git", "Docker", "AWS", "TailwindCSS"]
};

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    tags: ["React", "Node.js", "MongoDB"],
    services: ["Frontend Development", "Backend API", "Database Design"],
    fullImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    description: "A full-featured e-commerce platform with user authentication, product management, shopping cart functionality, and payment integration. Built with modern technologies for optimal performance.",
    tools: ["React", "Node.js", "Express", "MongoDB", "Stripe API", "JWT", "Cloudinary"]
  },
  {
    id: 2,
    title: "Task Management App",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    tags: ["Vue.js", "Firebase", "PWA"],
    services: ["Frontend Development", "Real-time Updates", "PWA Implementation"],
    fullImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    description: "A Progressive Web App for task management with real-time collaboration features. Users can create projects, assign tasks, and track progress with team members.",
    tools: ["Vue.js", "Firebase", "Vuex", "Service Workers", "Push Notifications"]
  },
  {
    id: 3,
    title: "Portfolio Website",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    services: ["UI/UX Design", "Animation", "SEO Optimization"],
    fullImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    description: "A modern, responsive portfolio website with smooth animations and optimized performance. Features dark mode, multiple themes, and excellent SEO.",
    tools: ["Next.js", "TailwindCSS", "Framer Motion", "TypeScript", "Vercel"]
  }
];

const themes = [
  { name: 'Default', value: '', color: '#3b82f6' },
  { name: 'Flower', value: 'theme-flower', color: '#d946ef' },
  { name: 'Wine', value: 'theme-wine', color: '#dc2626' },
  { name: 'Box', value: 'theme-box', color: '#0ea5e9' },
  { name: 'Real Estate', value: 'theme-real-estate', color: '#ea580c' },
  { name: 'Media', value: 'theme-media', color: '#06b6d4' },
  { name: 'Agency', value: 'theme-agency', color: '#8b5cf6' },
  { name: 'Music', value: 'theme-music', color: '#d946ef' },
  { name: 'Production', value: 'theme-production', color: '#f59e0b' },
  { name: 'Doudou', value: 'theme-doudou', color: '#eab308' },
  { name: 'Luxury', value: 'theme-luxury', color: '#fbbf24' }
];

const books = [
  "The Pragmatic Programmer",
  "Clean Code",
  "Design Patterns",
  "You Don't Know JS",
  "Eloquent JavaScript",
  "The Art of Computer Programming",
  "Code Complete",
  "Refactoring",
  "Head First Design Patterns",
  "JavaScript: The Good Parts"
];

export default function Portfolio() {
  const [currentTheme, setCurrentTheme] = useState('');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [ninjaName, setNinjaName] = useState('');
  const [password, setPassword] = useState('');
  const [eggDoneness, setEggDoneness] = useState<'soft' | 'medium' | 'hard'>('medium');
  const [timerTime, setTimerTime] = useState(420); // Default to medium (7 minutes)
  const [timerActive, setTimerActive] = useState(false);
  const [randomBook, setRandomBook] = useState('');
  const [coffeeMood, setCoffeeMood] = useState(0);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    document.documentElement.className = currentTheme;
  }, [currentTheme]);
  
  useEffect(() => {
    // Update timer duration when egg doneness changes
    const durations = {
      soft: 300,  // 5 minutes
      medium: 420,  // 7 minutes
      hard: 540   // 9 minutes
    };
    setTimerTime(durations[eggDoneness]);
  }, [eggDoneness]);

  useEffect(() => {
    if (timerActive && timerTime > 0) {
      timerRef.current = setTimeout(() => {
        setTimerTime(prev => prev - 1);
      }, 1000);
    } else if (timerTime === 0) {
      setTimerActive(false);
      alert('Your egg is ready! 🥚');
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timerActive, timerTime]);

  const generateNinjaName = () => {
    const firstNames = ['Shadow', 'Silent', 'Swift', 'Hidden', 'Dark', 'Storm', 'Fire', 'Ice'];
    const lastNames = ['Blade', 'Warrior', 'Master', 'Hunter', 'Dragon', 'Wolf', 'Eagle', 'Tiger'];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    setNinjaName(`${firstName} ${lastName}`);
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setTimerActive(true);
  };

  const resetTimer = () => {
    setTimerActive(false);
    const durations = {
      soft: 300,  // 5 minutes
      medium: 420,  // 7 minutes
      hard: 540   // 9 minutes
    };
    setTimerTime(durations[eggDoneness]);
  };

  const pickRandomBook = () => {
    const book = books[Math.floor(Math.random() * books.length)];
    setRandomBook(book);
  };

  const checkCoffeeMood = (cups: number) => {
    if (cups <= 0) return 'You need coffee! ☕';
    if (cups === 1) return 'Mildly caffeinated 😊';
    if (cups === 2) return 'Getting started ☕';
    if (cups === 3) return 'Fully energized! ⚡';
    if (cups === 4) return 'Peak productivity! 🚀';
    if (cups === 5) return 'Super focused! 🎯';
    if (cups === 6) return 'Slight hand tremors... 👋';
    if (cups === 7) return 'Heart racing! ❤️‍🔥';
    return 'Vibrating through walls! 🤯';
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold">{personalInfo.name}</h1>
          </div>
          <button
            onClick={() => setShowThemeSelector(!showThemeSelector)}
            className="btn btn-ghost btn-sm relative"
          >
            <Palette className="w-4 h-4 mr-1" />
            Theme
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
                        currentTheme === theme.value ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
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
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {personalInfo.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={personalInfo.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg inline-flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                View CV
              </a>
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-lg inline-flex items-center gap-2"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">My Work Philosophy</h2>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto">
            {workPhilosophy}
          </p>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Professional Experience</h2>
          <div className="max-w-3xl mx-auto">
            <div className="timeline">
              {experiences.map((exp, index) => (
                <div key={index} className="mb-8">
                  <div className="timeline-dot"></div>
                  <div className="bg-card p-6 rounded-lg shadow-sm">
                    <div className="text-sm text-muted-foreground mb-1">{exp.year}</div>
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <div className="text-primary font-medium mb-2">{exp.company}</div>
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
          <h2 className="text-3xl font-bold text-center mb-12">Education</h2>
          <div className="max-w-3xl mx-auto">
            <div className="timeline">
              {education.map((edu, index) => (
                <div key={index} className="mb-8">
                  <div className="timeline-dot"></div>
                  <div className="bg-card p-6 rounded-lg shadow-sm">
                    <div className="text-sm text-muted-foreground mb-1">{edu.year}</div>
                    <h3 className="text-xl font-semibold">{edu.title}</h3>
                    <div className="text-primary font-medium mb-2">{edu.institution}</div>
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
          <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>
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
              <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
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
          <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>
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
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
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
          <h2 className="text-3xl font-bold text-center mb-4">Interactive Tools</h2>
          <p className="text-center text-muted-foreground mb-12">
            Fun tools to keep recruiters engaged!
          </p>
          <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-sm p-6">
            <Tabs defaultValue="ninja">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="ninja">Ninja Name</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="egg">Egg Timer</TabsTrigger>
                <TabsTrigger value="book">Book Picker</TabsTrigger>
                <TabsTrigger value="coffee">Coffee Mood</TabsTrigger>
              </TabsList>

              <TabsContent value="ninja" className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Wand2 className="w-5 h-5 text-[hsl(var(--tool-highlight))]" />
                  <h3 className="font-semibold">Ninja Name Generator</h3>
                </div>
                <button
                  onClick={generateNinjaName}
                  className="btn btn-primary btn-sm mb-3 w-full"
                >
                  Generate Ninja Name
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
                  <h3 className="font-semibold">Password Generator</h3>
                </div>
                <button
                  onClick={generatePassword}
                  className="btn btn-primary btn-sm mb-3 w-full"
                >
                  Generate Password
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
                  <h3 className="font-semibold">Boiled Egg Timer</h3>
                </div>
                
                <div className="flex gap-4 justify-center mb-4">
                  {['soft', 'medium', 'hard'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setEggDoneness(type as 'soft' | 'medium' | 'hard')}
                      className={`px-4 py-2 rounded-md ${eggDoneness === type ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
                
                <div className="text-center mb-2">
                  <p className="text-sm text-muted-foreground">
                    Timer set for: {eggDoneness === 'soft' ? '5' : eggDoneness === 'medium' ? '7' : '9'} minutes
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
                    Start
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
                  <h3 className="font-semibold">Random Book Picker</h3>
                </div>
                <button
                  onClick={pickRandomBook}
                  className="btn btn-primary btn-sm mb-3 w-full"
                >
                  Pick a Book
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
                  <h3 className="font-semibold">Coffee Mood Gauge</h3>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">How many coffees have you had today?</p>
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
          className={`modal-overlay ${selectedProject ? 'open' : ''}`}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
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
              <h3 className="text-2xl font-bold mb-3">{selectedProject.title}</h3>
              <p className="text-muted-foreground mb-4">{selectedProject.description}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Tools Used:</h4>
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
                <h4 className="font-semibold mb-2">Services Provided:</h4>
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