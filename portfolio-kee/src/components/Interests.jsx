import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Cpu, Gamepad2, Music, Sparkles } from "lucide-react";

// Figma custom SVG brand icon definition
const FigmaIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5a3.5 3.5 0 0 1 0 7H12V2z" />
    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 5 19.5z" />
  </svg>
);

// Soft lavender custom theme assignments
const INTERESTS = [
  {
    title: "Coding",
    subtitle: "Sys Architecture & Logic",
    desc: "Writing high-efficiency, clean enterprise algorithms and modular frameworks.",
    icon: Code2,
    color: "#A594F9",
    animation: "code"
  },
  {
    title: "Artificial Intelligence",
    subtitle: "LLMs & Agentic Systems",
    desc: "Researching autonomous agent pipelines, prompt embeddings, and weights.",
    icon: Cpu,
    color: "#CDC1FF",
    animation: "ai"
  },
  {
    title: "UI/UX Design",
    subtitle: "Glassmorphism & Contrast",
    desc: "Crafting beautiful high-fidelity interfaces with premium aesthetic layers.",
    icon: FigmaIcon,
    color: "#1C1635",
    animation: "design"
  },
  {
    title: "Gaming",
    subtitle: "Cyberpunk & RPG Worlds",
    desc: "Analyzing visual design languages and motion mechanics in retro/sci-fi games.",
    icon: Gamepad2,
    color: "#A594F9",
    animation: "game"
  },
  {
    title: "Music",
    subtitle: "Lofi Beats & Synthwave",
    desc: "Focusing deep concentration flows under ambient retro digital soundscapes.",
    icon: Music,
    color: "#CDC1FF",
    animation: "music"
  },
  {
    title: "Learning Tech",
    subtitle: "APIs & Core Vitals",
    desc: "Constantly testing new framework ecosystems, bundlers, and rendering nodes.",
    icon: Sparkles,
    color: "#A594F9",
    animation: "learn"
  }
];

function InterestCard({ item, idx }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-85px" });
  const IconComp = item.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative glass p-6 rounded-2xl border-lavender-medium/25 hover:border-lavender-vibrant/50 shadow-md bg-white/35 hover:shadow-[0_10px_30px_rgba(165,148,249,0.15)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between text-left min-h-[220px]"
    >
      {/* Corner Hud Border Decors */}
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-lavender-vibrant/30" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-lavender-vibrant/30" />

      {/* Background neon soft color overlay on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(150px circle at 90% 10%, ${item.color}18, transparent 80%)`
        }}
      />

      {/* Card Header: Icon and Animated Indicator */}
      <div className="flex justify-between items-start mb-4">
        <div 
          className="w-12 h-12 rounded-xl bg-lavender-light/35 border border-lavender-medium/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{ 
            color: item.color,
            boxShadow: `inset 0 0 6px ${item.color}15`,
            borderColor: `${item.color}45`
          }}
        >
          <IconComp className="w-6 h-6" style={{ filter: `drop-shadow(0 0 4px ${item.color}33)` }} />
        </div>

        {/* Micro animation triggers */}
        <div className="h-6 flex items-center justify-center overflow-hidden">
          
          {/* Coding active script prompt */}
          {item.animation === "code" && (
            <span className="font-cyber text-[8px] text-deep-text/75 uppercase tracking-widest animate-pulse opacity-0 group-hover:opacity-100 transition-opacity font-bold">
              [RUN_COMP]
            </span>
          )}

          {/* AI core pulsing nodes */}
          {item.animation === "ai" && (
            <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="w-1.5 h-1.5 rounded-full bg-lavender-vibrant animate-ping" />
              <span className="w-1.5 h-1.5 rounded-full bg-lavender-medium animate-pulse" />
            </div>
          )}

          {/* Music Mini Waveform Animation */}
          {item.animation === "music" && (
            <div className="flex items-end space-x-0.5 h-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="w-0.5 h-2 bg-lavender-light animate-[bounce_0.8s_infinite]" />
              <span className="w-0.5 h-4 bg-lavender-vibrant animate-[bounce_0.5s_infinite_0.15s]" />
              <span className="w-0.5 h-3 bg-lavender-medium animate-[bounce_0.6s_infinite_0.3s]" />
              <span className="w-0.5 h-1 bg-lavender-vibrant animate-[bounce_0.7s_infinite]" />
            </div>
          )}

          {/* Gaming joystick bounce */}
          {item.animation === "game" && (
            <span className="font-cyber text-[8px] text-lavender-vibrant group-hover:animate-bounce opacity-0 group-hover:opacity-100 transition-opacity font-bold">
              👾 LVL_99
            </span>
          )}

          {/* UI/UX design layers */}
          {item.animation === "design" && (
            <span className="font-cyber text-[7px] text-deep-text font-bold tracking-widest uppercase border border-lavender-medium/40 rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse">
              100% vector
            </span>
          )}

          {/* Learning sparkles */}
          {item.animation === "learn" && (
            <Sparkles className="w-3.5 h-3.5 text-lavender-vibrant animate-spin opacity-0 group-hover:opacity-100 transition-opacity" style={{ animationDuration: "3s" }} />
          )}

        </div>
      </div>

      {/* Card Info */}
      <div className="space-y-1.5 z-10">
        <span className="font-cyber text-[9px] tracking-widest text-deep-text/60 font-bold uppercase">
          {item.subtitle}
        </span>
        <h3 className="font-display font-extrabold text-base text-deep-text group-hover:text-lavender-vibrant transition-colors uppercase">
          {item.title}
        </h3>
        <p className="font-sans text-xs text-deep-text/85 leading-relaxed min-h-[50px] pt-1 font-medium">
          {item.desc}
        </p>
      </div>

    </motion.div>
  );
}

export default function Interests() {
  return (
    <section id="interests" className="relative min-h-screen py-24 px-6 md:px-12 xl:px-24 select-none overflow-hidden bg-transparent">
      {/* Background atmosphere shadows */}
      <div className="absolute top-[20%] right-[0%] w-[35vw] h-[35vw] rounded-full bg-lavender-light/20 blur-[95px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[0%] w-[30vw] h-[30vw] rounded-full bg-lavender-medium/15 blur-[85px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        {/* Module Header */}
        <div className="text-center mb-16">
          <span className="font-cyber text-[10px] tracking-[0.4em] uppercase text-lavender-vibrant font-extrabold block mb-2">
            SEC_INTEGRATION // COGNITIVE_SUBSECTORS
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-deep-text tracking-tight uppercase">
            Hobby <span className="bg-gradient-to-r from-lavender-vibrant via-lavender-medium to-deep-text bg-clip-text text-transparent neon-text-vibrant">Interests</span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-lavender-light via-lavender-medium to-lavender-vibrant mx-auto mt-4" />
        </div>

        {/* Interests Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INTERESTS.map((item, idx) => (
            <InterestCard key={idx} item={item} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
