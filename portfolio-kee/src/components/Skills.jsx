import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  Code2, 
  Layers, 
  Database, 
  Cpu, 
  Sparkles, 
  Workflow, 
  Info,
  Maximize2,
  ChevronDown
} from "lucide-react";

// Assign icons to each category
const CATEGORY_ICONS = {
  languages: Code2,
  "web-tech": Layers,
  "database-cloud": Database,
  fundamentals: Cpu,
  "tools-frameworks": Sparkles
};

// Custom brand icon for GitHub
const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const SKILL_CATEGORIES = [
  {
    id: "languages",
    title: "Languages",
    subtitle: "Core syntax & compilation",
    // Coordinates for the 1000x600 canvas coordinate space
    x: 200,
    y: 150,
    skills: [
      { name: "C Programming", level: "Advanced", desc: "Low-level system programming, pointers, structures, and manual memory management." },
      { name: "Java", level: "Expert", desc: "Enterprise API architecture, OOP design patterns, multithreading, and secure JVM execution." },
      { name: "Python", level: "Expert", desc: "Data structures, analytical scripting, machine learning integration, and automation." },
      { name: "TypeScript", level: "Advanced", desc: "Type-safe structural interfaces, modular application development, and React compiler integration." },
      { name: "JavaScript", level: "Expert", desc: "Asynchronous event loops, ESNext syntax engines, performance profiling, and APIs." },
      { name: "SQL", level: "Advanced", desc: "Complex relational queries, indexing, table schemas, and transactions." }
    ]
  },
  {
    id: "web-tech",
    title: "Web Technologies",
    subtitle: "Client & server systems",
    x: 500,
    y: 300,
    skills: [
      { name: "React", level: "Expert", desc: "State coordination hooks, dynamic virtual DOM rendering, and concurrent UI mode architecture." },
      { name: "Tailwind CSS", level: "Expert", desc: "Utility-first design orchestration, fluid layouts, and modular design tokens." },
      { name: "HTML5", level: "Expert", desc: "Semantic structural documents, web worker scripts, local cache storage, and SEO structure." },
      { name: "CSS3", level: "Expert", desc: "Keyframe layouts, transitions, backdrop filters, and custom layouts." },
      { name: "Node.js", level: "Advanced", desc: "Non-blocking event-driven servers, file streaming, and npm modular packages." },
      { name: "Express.js", level: "Advanced", desc: "RESTful HTTP endpoint routing, custom middleware layers, and security headers." }
    ]
  },
  {
    id: "database-cloud",
    title: "Database & Cloud",
    subtitle: "Storage & edge networks",
    x: 230,
    y: 450,
    skills: [
      { name: "MySQL", level: "Advanced", desc: "ACID transactional modeling, relational normalization, and query performance tuning." },
      { name: "Vercel", level: "Advanced", desc: "Production edge serverless deployments, CI/CD automated integration, and optimization." }
    ]
  },
  {
    id: "fundamentals",
    title: "Core Fundamentals",
    subtitle: "Theoretical pillars",
    x: 800,
    y: 180,
    skills: [
      { name: "Data Structures & Algorithms (DSA)", level: "Advanced", desc: "Optimal time/space complexity modeling, sorting algorithms, and network path traversal." },
      { name: "Object-Oriented Programming (OOP)", level: "Expert", desc: "Encapsulation, modular inheritance, polymorphic interfaces, and clean design patterns." },
      { name: "Internet of Things (IoT)", level: "Intermediate", desc: "Physical controller integration, sensor arrays, and low-latency network telemetry." },
      { name: "Document Object Model (DOM)", level: "Expert", desc: "Programmatic node traversal, high-frequency event flow, and layout manipulation." }
    ]
  },
  {
    id: "tools-frameworks",
    title: "Tools & Frameworks",
    subtitle: "Productivity & intelligence",
    x: 770,
    y: 440,
    skills: [
      { name: "Git", level: "Expert", desc: "Distributed version tree control, branch merge conflicts, and local rebase routines." },
      { name: "GitHub", level: "Expert", desc: "Pull request reviews, GitHub Actions pipeline automation, and open-source contribution." },
      { name: "Google AI Studio", level: "Advanced", desc: "Generative model tuning, prompt configurations, and structured output parsing." },
      { name: "Google Antigravity", level: "Expert", desc: "Multi-agent orchestration frameworks, goal-oriented system tools, and AI workflows." },
      { name: "Stitch", level: "Intermediate", desc: "Data warehousing connectors, target sync routines, and extraction configurations." },
      { name: "Codex", level: "Advanced", desc: "AI-assisted code generation engines, lexical parsing, and code auto-complete." },
      { name: "GitHub Copilot", level: "Expert", desc: "Contextual software development assistance, comment parsing, and logic generation." }
    ]
  }
];

// SVG Network Connections mapping (Hub indices)
const CONNECTIONS = [
  { from: "languages", to: "web-tech" },
  { from: "database-cloud", to: "web-tech" },
  { from: "fundamentals", to: "web-tech" },
  { from: "tools-frameworks", to: "web-tech" },
  { from: "languages", to: "fundamentals" },
  { from: "database-cloud", to: "tools-frameworks" }
];

export default function Skills() {
  const [activeHubId, setActiveHubId] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [expandedMobileId, setExpandedMobileId] = useState("languages");
  const containerRef = useRef(null);

  // Parallax motion tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft spring config for premium lag/inertia effect
  const springConfig = { damping: 40, stiffness: 220, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Distribute transforms per depth layer
  const bgTranslateX = useTransform(smoothMouseX, [-400, 400], [-10, 10]);
  const bgTranslateY = useTransform(smoothMouseY, [-400, 400], [-10, 10]);

  const midTranslateX = useTransform(smoothMouseX, [-400, 400], [-22, 22]);
  const midTranslateY = useTransform(smoothMouseY, [-400, 400], [-22, 22]);

  const fgTranslateX = useTransform(smoothMouseX, [-400, 400], [-35, 35]);
  const fgTranslateY = useTransform(smoothMouseY, [-400, 400], [-35, 35]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize coordinates relative to container center
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setActiveHubId(null);
    setHoveredSkill(null);
  };

  // Helper to determine active nodes & paths opacity
  const getOpacityClass = (id) => {
    if (!activeHubId) return "opacity-100";
    return activeHubId === id ? "opacity-100 scale-105 z-20" : "opacity-30 scale-95 pointer-events-none";
  };

  return (
    <section id="skills" className="relative min-h-screen py-24 px-6 md:px-12 xl:px-24 select-none overflow-hidden bg-transparent">
      {/* Soft visual background flares */}
      <div className="absolute top-[20%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-lavender-light/15 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] -right-[5%] w-[35vw] h-[35vw] rounded-full bg-lavender-medium/15 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative flex flex-col items-center">
        {/* Module Header */}
        <div className="text-center mb-16">
          <span className="font-cyber text-[10px] tracking-[0.4em] uppercase text-lavender-vibrant font-extrabold block mb-2">
            SEC_SKILLS_BLUEPRINT // TECHNICAL_ECOSYSTEM
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-deep-text tracking-tight uppercase">
            Technical <span className="bg-gradient-to-r from-lavender-vibrant via-lavender-medium to-deep-text bg-clip-text text-transparent neon-text-vibrant">Arsenal</span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-lavender-light via-lavender-medium to-lavender-vibrant mx-auto mt-4" />
          <p className="font-sans text-xs sm:text-sm text-deep-text/70 mt-5 max-w-xl mx-auto font-medium">
            An interactive visualization of my engineering frameworks, backend services, core computer science principles, and intelligent agentic tools.
          </p>
        </div>

        {/* -------------------------------------------------------------
            DESKTOP / TABLET CONSTELLATION NETWORK (md and up)
            ------------------------------------------------------------- */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="hidden md:block relative w-full aspect-[1000/600] rounded-3xl border border-lavender-medium/20 bg-white/20 backdrop-blur-sm shadow-xl overflow-hidden cursor-none"
        >
          {/* Sub-grid Tech Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(165,148,249,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(165,148,249,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          {/* LAYER 1: SVG Path Connections (Parallax Layer) */}
          <motion.div 
            style={{ x: bgTranslateX, y: bgTranslateY }}
            className="absolute inset-0 pointer-events-none"
          >
            <svg 
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 1000 600"
              preserveAspectRatio="xMidYMid meet"
            >
              {CONNECTIONS.map((conn, idx) => {
                const fromHub = SKILL_CATEGORIES.find(c => c.id === conn.from);
                const toHub = SKILL_CATEGORIES.find(c => c.id === conn.to);
                
                const isHighlighted = activeHubId === conn.from || activeHubId === conn.to;
                const isSomeHubActive = activeHubId !== null;
                
                return (
                  <g key={idx}>
                    {/* Background glow path */}
                    <motion.line
                      x1={fromHub.x}
                      y1={fromHub.y}
                      x2={toHub.x}
                      y2={toHub.y}
                      className="transition-colors duration-500"
                      stroke={isHighlighted ? "rgba(165,148,249,0.4)" : "rgba(205, 193, 255, 0.15)"}
                      strokeWidth={isHighlighted ? 4 : 2}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: idx * 0.1 }}
                    />
                    
                    {/* Animated Data Stream Dashed Line */}
                    <line
                      x1={fromHub.x}
                      y1={fromHub.y}
                      x2={toHub.x}
                      y2={toHub.y}
                      stroke="url(#data-stream-gradient)"
                      strokeWidth={isHighlighted ? 2.5 : 1.5}
                      strokeDasharray="6, 12"
                      className="animate-[dash_20s_linear_infinite]"
                      style={{
                        opacity: isSomeHubActive ? (isHighlighted ? 1 : 0.15) : 0.6,
                        animationPlayState: isHighlighted ? "running" : "paused",
                        transition: "all 0.5s ease"
                      }}
                    />
                  </g>
                );
              })}
              
              <defs>
                <linearGradient id="data-stream-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-lavender-medium)" />
                  <stop offset="50%" stopColor="var(--color-lavender-vibrant)" />
                  <stop offset="100%" stopColor="var(--color-deep-text)" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* LAYER 2: Category Hubs (Parallax Layer) */}
          <motion.div
            style={{ x: midTranslateX, y: midTranslateY }}
            className="absolute inset-0"
          >
            {SKILL_CATEGORIES.map((category) => {
              const IconComponent = CATEGORY_ICONS[category.id] || Code2;
              const isActive = activeHubId === category.id;
              
              // Calculate percent positions to match SVG coordinate space
              const leftPercent = `${category.x / 10}%`;
              const topPercent = `${category.y / 6}%`;

              return (
                <div
                  key={category.id}
                  style={{
                    left: leftPercent,
                    top: topPercent,
                    transform: "translate(-50%, -50%)"
                  }}
                  className={`absolute transition-all duration-500 ${getOpacityClass(category.id)}`}
                >
                  {/* Category Hub Title Card */}
                  <button
                    onClick={() => setActiveHubId(isActive ? null : category.id)}
                    onMouseEnter={() => {
                      setActiveHubId(category.id);
                      setHoveredSkill(null);
                    }}
                    className={`relative px-4 py-3 rounded-2xl glass hover:border-lavender-vibrant border-lavender-medium/25 bg-white/55 backdrop-blur-md shadow-md text-left flex items-center gap-3 transition-all duration-300 interactive-glow ${
                      isActive ? "border-lavender-vibrant shadow-[0_0_15px_rgba(165,148,249,0.3)] bg-white/80" : ""
                    }`}
                  >
                    {/* HUD corner lines for a premium aesthetic */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-lavender-vibrant/60" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-lavender-vibrant/60" />

                    <div className={`p-2 rounded-lg ${isActive ? "bg-lavender-vibrant/25 text-deep-text" : "bg-lavender-light/30 text-lavender-vibrant"} transition-colors`}>
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div>
                      <h3 className="font-cyber text-[10px] tracking-widest font-black uppercase text-deep-text">{category.title}</h3>
                      <p className="text-[8px] font-sans font-medium uppercase text-deep-text/65 tracking-wider">{category.subtitle}</p>
                    </div>
                  </button>
                </div>
              );
            })}
          </motion.div>

          {/* LAYER 3: Orbiting Skill Nodes (Parallax Layer) */}
          <motion.div
            style={{ x: fgTranslateX, y: fgTranslateY }}
            className="absolute inset-0 pointer-events-none"
          >
            {SKILL_CATEGORIES.map((category) => {
              const isHubActive = activeHubId === category.id;
              const isSomeHubActive = activeHubId !== null;
              
              return (
                <div 
                  key={category.id} 
                  className={`absolute inset-0 transition-all duration-500 ${
                    isSomeHubActive ? (isHubActive ? "opacity-100 pointer-events-auto" : "opacity-15 pointer-events-none") : "opacity-80 pointer-events-auto"
                  }`}
                >
                  {category.skills.map((skill, index) => {
                    const N = category.skills.length;
                    
                    // Stagger and angle distribution calculation
                    const baseRadius = 100;
                    // Alternating radii creates a beautiful nested constellation look
                    const radius = baseRadius + (index % 2 === 0 ? 15 : -15);
                    const angleOffset = (category.id === "web-tech") ? 0.3 : 1.2;
                    const angle = angleOffset + (2 * Math.PI * index) / N;
                    
                    const offsetX = radius * Math.cos(angle);
                    const offsetY = radius * Math.sin(angle);

                    // Coordinate mappings in percentage
                    const skillX = `calc(${category.x / 10}% + ${offsetX}px)`;
                    const skillY = `calc(${category.y / 6}% + ${offsetY}px)`;

                    return (
                      <motion.div
                        key={skill.name}
                        style={{
                          left: skillX,
                          top: skillY,
                          transform: "translate(-50%, -50%)"
                        }}
                        // Floating animations matching natural spatial flow
                        animate={{
                          y: [0, Math.sin(index) * 6, 0],
                          x: [0, Math.cos(index) * 6, 0]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 4 + (index % 3),
                          ease: "easeInOut",
                          delay: index * 0.1
                        }}
                        onMouseEnter={() => setHoveredSkill({ ...skill, category: category.title })}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className="absolute glass border border-lavender-medium/20 px-3 py-1.5 rounded-full text-[9px] font-cyber tracking-widest text-deep-text bg-white/40 hover:bg-white/95 hover:border-lavender-vibrant hover:shadow-[0_0_12px_rgba(165,148,249,0.3)] transition-all pointer-events-auto cursor-pointer select-none font-bold uppercase flex items-center gap-1.5 interactive-glow"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-lavender-vibrant animate-pulse" />
                        <span>{skill.name}</span>
                        
                        {/* Hover mini-tooltip */}
                        {hoveredSkill?.name === skill.name && (
                          <div className="absolute bottom-[115%] left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur border border-lavender-medium/30 p-2.5 rounded-lg shadow-lg pointer-events-none transition-all duration-200 z-50 min-w-[160px] text-left">
                            <h4 className="font-cyber text-[9px] font-extrabold text-lavender-vibrant tracking-widest uppercase">{skill.name}</h4>
                            <p className="font-sans text-[7px] text-deep-text/70 uppercase tracking-widest font-extrabold mt-0.5">{skill.level} Proficiency</p>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              );
            })}
          </motion.div>


        </div>

        {/* -------------------------------------------------------------
            MOBILE ACCORDION/STACK NETWORK (sm and below)
            ------------------------------------------------------------- */}
        <div className="block md:hidden w-full space-y-4">
          {SKILL_CATEGORIES.map((category) => {
            const IconComponent = CATEGORY_ICONS[category.id] || Code2;
            const isExpanded = expandedMobileId === category.id;

            return (
              <div
                key={category.id}
                className="w-full rounded-2xl glass border border-lavender-medium/20 bg-white/40 overflow-hidden transition-all duration-300"
              >
                {/* Header/Toggler */}
                <button
                  onClick={() => setExpandedMobileId(isExpanded ? null : category.id)}
                  className={`w-full p-4 flex items-center justify-between text-left transition-colors ${
                    isExpanded ? "bg-lavender-light/20" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isExpanded ? "bg-lavender-vibrant/20 text-deep-text" : "bg-lavender-light/30 text-lavender-vibrant"}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-cyber text-xs tracking-wider font-extrabold uppercase text-deep-text">{category.title}</h3>
                      <p className="text-[8px] font-sans font-medium uppercase text-deep-text/60 tracking-wider mt-0.5">{category.subtitle}</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-deep-text/60 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                </button>

                {/* Skills Container */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-4 pb-5 pt-1 space-y-3 border-t border-lavender-medium/10">
                        {category.skills.map((skill, index) => (
                          <motion.div
                            key={skill.name}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="p-3.5 rounded-xl border border-lavender-medium/15 bg-white/50 space-y-2 hover:border-lavender-vibrant/30 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="font-cyber text-xs tracking-wider font-extrabold text-deep-text uppercase flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-lavender-vibrant" />
                                {skill.name}
                              </h4>
                              <span className="font-cyber text-[8px] tracking-widest text-lavender-vibrant bg-lavender-light/35 border border-lavender-medium/25 px-2 py-0.5 rounded font-black uppercase">
                                {skill.level}
                              </span>
                            </div>

                            <p className="font-sans text-xs text-deep-text/80 leading-relaxed font-semibold">
                              {skill.desc}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
      
      {/* CSS Animation Keyframes for path data flow dash stream */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}</style>
    </section>
  );
}
