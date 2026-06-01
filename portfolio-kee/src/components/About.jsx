import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal, Database, Code2, Server, Award, Laptop, Briefcase, Sparkles } from "lucide-react";

// Themed skill progress gradients
const SKILLS = [
  { name: "Java & OOP Architectures", level: 90, color: "from-lavender-light to-lavender-medium" },
  { name: "React & Modern Ecosystems", level: 85, color: "from-lavender-medium to-lavender-vibrant" },
  { name: "Tailwind CSS & Motion Design", level: 95, color: "from-lavender-light to-lavender-vibrant" },
  { name: "Database Design & MySQL", level: 80, color: "from-lavender-medium to-deep-text" },
];

const TECH_STACK = [
  { name: "Java", category: "Backend", desc: "Enterprise API Architecture", icon: Server, color: "#A594F9" },
  { name: "React", category: "Frontend", desc: "Single Page Apps & Hooks", icon: Laptop, color: "#61dafb" },
  { name: "Tailwind", category: "Styles", desc: "Modern CSS Orchestration", icon: Code2, color: "#38bdf8" },
  { name: "MySQL", category: "Database", desc: "Relational Queries & Optimization", icon: Database, color: "#CDC1FF" },
  { name: "JavaScript", category: "Language", desc: "Dynamic Scripting Core", icon: Code2, color: "#A594F9" },
  { name: "HTML5", category: "Structure", desc: "Semantic Document Standard", icon: Terminal, color: "#e34f26" },
  { name: "CSS3", category: "Design", desc: "Transitions & Keyframe FX", icon: Sparkles, color: "#1572b6" },
  { name: "GitHub", category: "DevOps", desc: "Secure Version Control Sync", icon: Briefcase, color: "#1C1635" },
];

function ScrollCounter({ value, duration = 1.5, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const intervalTime = 30;
    const totalSteps = Math.ceil(totalMiliseconds / intervalTime);
    const stepIncrement = end / totalSteps;

    const timer = setInterval(() => {
      start += stepIncrement;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-cyber font-black text-3xl sm:text-4xl text-lavender-vibrant tracking-tight">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const detailsRef = useRef(null);
  const detailsInView = useInView(detailsRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative min-h-screen py-24 px-6 md:px-12 xl:px-24 select-none overflow-hidden bg-transparent">
      {/* Background soft flares */}
      <div className="absolute top-[30%] -left-[10%] w-[35vw] h-[35vw] rounded-full bg-lavender-light/20 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[0%] w-[30vw] h-[30vw] rounded-full bg-lavender-medium/15 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        {/* Module Header */}
        <div className="text-center mb-16">
          <span className="font-cyber text-[10px] tracking-[0.4em] uppercase text-lavender-vibrant font-extrabold block mb-2">
            SEC_IDENTIFICATION // DATA_QUERY
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-deep-text tracking-tight uppercase">
            About <span className="bg-gradient-to-r from-lavender-vibrant via-lavender-medium to-deep-text bg-clip-text text-transparent neon-text-vibrant">The Architect</span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-lavender-light via-lavender-medium to-lavender-vibrant mx-auto mt-4" />
        </div>

        {/* Grid Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Stats and Narrative Profile */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            <motion.div
              ref={detailsRef}
              initial={{ opacity: 0, y: 35 }}
              animate={detailsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass p-6 sm:p-8 rounded-2xl border-lavender-medium/20 shadow-xl relative overflow-hidden"
            >
              {/* Retro HUD Corner borders */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-lavender-vibrant/60" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-lavender-vibrant/60" />

              <h3 className="font-cyber text-sm tracking-[0.2em] uppercase text-deep-text/75 mb-4 flex items-center space-x-2 font-bold">
                <Terminal className="w-4 h-4 text-lavender-vibrant" />
                <span>NARRATIVE_LOG.LOG</span>
              </h3>
              
              <div className="space-y-4 font-sans text-deep-text/85 text-sm sm:text-base leading-relaxed font-medium">
                <p>
                  Hello! I'm <strong className="text-lavender-vibrant font-extrabold">Kee</strong>, a software developer fueled by an intense passion for building beautiful, optimized virtual interfaces. I bridge the gap between heavy enterprise logic systems and aesthetic user interfaces.
                </p>
                <p>
                  My developer journey is deeply rooted in <strong className="text-lavender-vibrant font-extrabold">Object-Oriented Java Programming</strong> and <strong className="text-lavender-vibrant font-extrabold">High-Performance Frontend Systems</strong>. I believe code should not only compile perfectly, but it should also deliver a striking, unforgettable user experience. 
                </p>
                <p>
                  When I am not coding high-frequency web apps or modeling relational schemas, I study modern AI agents, design human-centered UI/UX systems, and participate in online algorithmic optimization challenges. Let's boot up something amazing together!
                </p>
              </div>
            </motion.div>

            {/* Dynamic statistics counter grids */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {[
                { label: "COMPLETED PROJS", val: 12, suffix: "+" },
                { label: "CERTIFICATIONS", val: 8, suffix: "" },
                { label: "SOLVED CODE PROBS", val: 420, suffix: "+" },
                { label: "INTERNSHIP EXPS", val: 2, suffix: "" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={detailsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * idx, ease: [0.16, 1, 0.3, 1] }}
                  className="glass p-4 rounded-xl border-lavender-medium/20 text-center flex flex-col justify-center space-y-1 hover:border-lavender-vibrant/40 hover:shadow-[0_0_15px_rgba(165,148,249,0.15)] transition-all bg-white/20"
                >
                  <ScrollCounter value={stat.val} suffix={stat.suffix} />
                  <span className="font-cyber text-[8px] sm:text-[9px] tracking-widest text-deep-text/70 uppercase font-bold">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Panel: Skill bars & Tech Badges */}
          <div className="lg:col-span-5 flex flex-col space-y-6 text-left w-full">
            {/* Skill meters card */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={detailsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="glass p-6 rounded-2xl border-lavender-medium/20 shadow-xl relative"
            >
              <h3 className="font-cyber text-sm tracking-[0.2em] uppercase text-deep-text/75 mb-6 flex items-center space-x-2 font-bold">
                <Award className="w-4 h-4 text-lavender-vibrant" />
                <span>COGNITIVE_PROFICIENCY</span>
              </h3>

              <div className="space-y-4">
                {SKILLS.map((skill, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between font-cyber text-[10px] sm:text-xs tracking-wider">
                      <span className="text-deep-text/80 uppercase font-bold">{skill.name}</span>
                      <span className="text-lavender-vibrant font-extrabold">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-lavender-light/35 border border-lavender-medium/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={detailsInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1.5, delay: 0.3 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Glowing Tech Badges Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={detailsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="glass p-6 rounded-2xl border-lavender-medium/20 shadow-xl"
            >
              <h3 className="font-cyber text-sm tracking-[0.2em] uppercase text-deep-text/75 mb-4 flex items-center space-x-2 font-bold">
                <Code2 className="w-4 h-4 text-lavender-vibrant" />
                <span>INTEGRATED_TECH_STACK</span>
              </h3>
              
              <div className="grid grid-cols-4 gap-3">
                {TECH_STACK.map((tech, idx) => {
                  const IconComp = tech.icon;
                  return (
                    <div 
                      key={idx}
                      className="group relative flex flex-col items-center justify-center p-3.5 rounded-xl border border-lavender-medium/35 bg-white/40 hover:border-lavender-vibrant/60 hover:bg-white/80 transition-all duration-300 hover:scale-105"
                    >
                      {/* Floating mini tool-tip */}
                      <div className="absolute bottom-[108%] left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 bg-lavender-bg border border-lavender-vibrant/30 text-[8px] font-cyber tracking-widest text-deep-text py-1.5 px-2.5 rounded shadow-lg pointer-events-none transition-all duration-200 uppercase whitespace-nowrap z-30 font-bold">
                        {tech.category} // {tech.desc}
                      </div>

                      <IconComp 
                        className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
                        style={{ 
                          color: tech.color,
                          filter: `drop-shadow(0 0 4px ${tech.color}44)` 
                        }} 
                      />
                      
                      <span className="font-cyber text-[8px] sm:text-[9px] tracking-wider text-deep-text/75 mt-2 font-bold group-hover:text-lavender-vibrant transition-colors uppercase">
                        {tech.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
