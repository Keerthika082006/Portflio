import { useRef } from "react";
import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";
import mockup1 from "../assets/project_mockup_1.png";
import mockup2 from "../assets/project_mockup_2.png";
import mockup3 from "../assets/project_mockup_3.png";

// Custom brand icon SVG definition
const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const PROJECTS = [
  {
    title: "CyberCore IDE v3.1",
    desc: "A futuristic web-based development environment featuring a custom synthwave code theme, modular file systems, real-time code execution parsing, and terminal shells.",
    tags: ["React", "Tailwind CSS", "GSAP", "Monaco Editor"],
    image: mockup1,
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Galactic Navigator Hub",
    desc: "An algorithmic solar grid mapping suite built to model complex celestial orbits, utilizing high-efficiency spatial pathfinding node systems for space routes.",
    tags: ["Java", "Relational Mapping", "OOP", "Custom Dijkstra"],
    image: mockup2,
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Cyber Symphony Wave",
    desc: "A stunning audio frequencies visualizer transforming multi-channel audio buffers into three-dimensional floating neon waveform grids with parallax.",
    tags: ["JavaScript", "HTML5 Canvas", "Web Audio API", "CSS Grid"],
    image: mockup3,
    github: "https://github.com",
    demo: "https://example.com",
  },
];

function ProjectCard({ project, idx }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [12, -12]);
  const rotateY = useTransform(x, [0, 1], [-12, 12]);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-[1000px] w-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative w-full rounded-2xl overflow-hidden glass border-lavender-medium/25 hover:border-lavender-vibrant/50 shadow-md p-4 transition-all duration-300 bg-white/35 flex flex-col justify-between min-h-[480px]"
      >
        {/* Animated glowing border layer on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-lavender-light/0 via-lavender-medium/0 to-lavender-vibrant/0 group-hover:from-lavender-light/10 group-hover:via-lavender-medium/20 group-hover:to-lavender-vibrant/10 transition-colors pointer-events-none" />
        
        {/* Neon outer ambient glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_30px_rgba(165,148,249,0.18)] rounded-2xl" />

        {/* Card Header: Image Asset */}
        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-5 border border-white/10 shadow-inner">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-lavender-bg via-transparent to-transparent opacity-40" />
        </div>

        {/* Card Main Body */}
        <div className="flex flex-col flex-grow text-left space-y-3 z-10">
          <div className="flex justify-between items-center">
            <h3 className="font-cyber font-extrabold text-lg tracking-wide text-deep-text group-hover:text-lavender-vibrant transition-colors uppercase">
              {project.title}
            </h3>
            <Code2 className="w-4 h-4 text-lavender-vibrant group-hover:animate-pulse" />
          </div>

          <p className="font-sans text-xs sm:text-sm text-deep-text/85 leading-relaxed min-h-[64px] font-medium">
            {project.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tags.map((tag, tagIdx) => (
              <span
                key={tagIdx}
                className="font-cyber text-[8px] sm:text-[9px] tracking-widest text-lavender-vibrant uppercase px-2.5 py-1 rounded bg-lavender-light/20 border border-lavender-medium/30 group-hover:border-lavender-vibrant/50 transition-all font-bold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer: Call Actions */}
        <div className="flex items-center space-x-3 pt-6 border-t border-lavender-medium/20 mt-6 z-10">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center space-x-2 font-cyber text-[10px] tracking-widest uppercase border border-lavender-medium/40 bg-white/40 text-deep-text py-3.5 px-4 rounded hover:border-lavender-vibrant hover:text-lavender-vibrant hover:bg-white/70 transition-all interactive-glow font-bold"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>Repository</span>
          </a>

          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center space-x-2 font-cyber text-[10px] tracking-widest uppercase bg-gradient-to-r from-lavender-light to-lavender-vibrant text-deep-text py-3.5 px-4 rounded hover:shadow-[0_0_15px_rgba(165,148,249,0.35)] transition-all interactive-glow border border-lavender-medium/30 font-bold"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const containerRef = useRef(null);

  return (
    <section id="projects" className="relative min-h-screen py-24 px-6 md:px-12 xl:px-24 select-none overflow-hidden bg-transparent">
      {/* Background neon flares */}
      <div className="absolute top-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-lavender-light/20 blur-[90px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[35%] left-[5%] w-[30vw] h-[30vw] rounded-full bg-lavender-medium/15 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        {/* Module Header */}
        <div className="text-center mb-16">
          <span className="font-cyber text-[10px] tracking-[0.4em] uppercase text-lavender-vibrant font-extrabold block mb-2">
            SEC_COMPILATION // RECENT_DEPLOYMENTS
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-deep-text tracking-tight uppercase">
            Featured <span className="bg-gradient-to-r from-lavender-vibrant via-lavender-medium to-deep-text bg-clip-text text-transparent neon-text-vibrant">Creations</span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-lavender-light via-lavender-medium to-lavender-vibrant mx-auto mt-4" />
        </div>

        {/* Project Grid */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
