import { useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { Briefcase, Calendar, CheckSquare, ShieldCheck } from "lucide-react";

const EXPERIENCES = [
  {
    role: "Full Stack Software Developer Intern",
    company: "NovaByte Labs // Neural Division",
    duration: "Jun 2025 - Present",
    desc: "Engineered scalable microservice integrations using Java and Spring Boot, optimizing database transaction logic to reduce query latency by 18%. Spearheaded the development of premium responsive administrative dashboards in React, integrating real-time telemetry charting systems and fluid CSS animations.",
    bullets: [
      "Optimized Java JPA query caching, reducing server load during peak traffic intervals.",
      "Re-architected user profile modules to follow strict OAuth2 security protocols.",
      "Collaborated on visual systems using Tailwind CSS to establish unified components."
    ]
  },
  {
    role: "Frontend Development Intern",
    company: "Aetheric Tech // Interactive Division",
    duration: "Oct 2024 - Apr 2025",
    desc: "Crafted high-end consumer-facing portals using React, styled with pixel-perfect responsive Tailwind rules. Collaborated closely with creative directors to integrate advanced page transitions and interactive micro-animations using Framer Motion, enhancing user engagement and accessibility standards.",
    bullets: [
      "Implemented smooth, low-latency animation systems for high-frequency interactive panels.",
      "Conducted detailed Lighthouse auditing, boosting core web vitals (LCP, INP) scores by 22%.",
      "Created structured, reusable custom hook libraries to streamline form state handling."
    ]
  }
];

function TimelineCard({ exp, idx }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  const slideLeft = idx % 2 === 0;

  return (
    <div 
      ref={cardRef}
      className={`relative w-full flex flex-col md:flex-row items-center justify-between mb-12 md:mb-16 ${
        slideLeft ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* 1. Large Central Timeline Glowing Node */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border border-lavender-medium/40 bg-lavender-bg flex items-center justify-center z-10">
        <motion.div 
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.15 }}
          className="w-2.5 h-2.5 rounded-full bg-lavender-vibrant shadow-[0_0_8px_#A594F9]" 
        />
      </div>

      {/* 2. Slide-In Glassmorphism Card */}
      <motion.div
        initial={{ 
          opacity: 0, 
          x: slideLeft ? 50 : -50,
          y: 20 
        }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`w-[calc(100%-40px)] ml-10 md:ml-0 md:w-[44%] glass p-6 rounded-2xl border-lavender-medium/25 hover:border-lavender-vibrant/50 shadow-md text-left bg-white/35 hover:shadow-[0_10px_30px_rgba(165,148,249,0.15)] transition-all relative overflow-hidden`}
      >
        {/* Glowing background blob in card corner */}
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-lavender-medium/5 blur-xl pointer-events-none" />

        {/* Card Header: Role & Comp */}
        <div className="space-y-1 mb-4">
          <span className="font-cyber text-[10px] tracking-widest text-lavender-vibrant font-extrabold flex items-center space-x-1.5 uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{exp.company}</span>
          </span>
          <h3 className="font-display font-extrabold text-base sm:text-lg text-deep-text tracking-wide uppercase">
            {exp.role}
          </h3>
          
          <div className="flex items-center space-x-1.5 text-deep-text/75 font-cyber text-[9px] uppercase tracking-wider font-bold">
            <Calendar className="w-3.5 h-3.5 text-lavender-vibrant" />
            <span>{exp.duration}</span>
          </div>
        </div>

        {/* Narrative Description */}
        <p className="font-sans text-xs sm:text-sm text-deep-text/85 leading-relaxed mb-4 font-medium">
          {exp.desc}
        </p>

        {/* Bullet List Details */}
        <ul className="space-y-2 pt-3 border-t border-lavender-medium/20 z-10 relative">
          {exp.bullets.map((bullet, bIdx) => (
            <li key={bIdx} className="flex items-start space-x-2 text-deep-text/80 font-sans text-xs leading-relaxed font-medium">
              <CheckSquare className="w-3.5 h-3.5 text-lavender-vibrant shrink-0 mt-0.5" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* 3. Empty spacer */}
      <div className="hidden md:block w-[44%]" />
    </div>
  );
}

export default function Experience() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="relative min-h-screen py-24 px-6 md:px-12 xl:px-24 select-none overflow-hidden bg-transparent">
      {/* Ambient gradient meshes */}
      <div className="absolute top-[20%] left-[5%] w-[35vw] h-[35vw] rounded-full bg-lavender-light/20 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[30vw] h-[30vw] rounded-full bg-lavender-medium/15 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        {/* Module Header */}
        <div className="text-center mb-20">
          <span className="font-cyber text-[10px] tracking-[0.4em] uppercase text-lavender-vibrant font-extrabold block mb-2">
            SEC_TIMELINE // PROFESSIONAL_TRACK
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-deep-text tracking-tight uppercase">
            Work <span className="bg-gradient-to-r from-lavender-vibrant via-lavender-medium to-deep-text bg-clip-text text-transparent neon-text-vibrant">Experience</span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-lavender-light via-lavender-medium to-lavender-vibrant mx-auto mt-4" />
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto py-8">
          
          {/* Vertical Base Line */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-lavender-light/40 border-r border-lavender-medium/20" />

          {/* Active Filled Line */}
          <motion.div 
            style={{ 
              scaleY,
              transformOrigin: "top" 
            }}
            className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-lavender-light via-lavender-medium to-lavender-vibrant shadow-[0_0_10px_#A594F9]" 
          />

          {/* Experience Cards */}
          <div className="space-y-4">
            {EXPERIENCES.map((exp, idx) => (
              <TimelineCard key={idx} exp={exp} idx={idx} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
