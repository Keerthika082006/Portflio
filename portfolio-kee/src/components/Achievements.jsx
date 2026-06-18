import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion";
import { Trophy, Star, Award, Calendar, Landmark, Percent, Zap } from "lucide-react";

const ACHIEVEMENTS = [
  {
    title: "National Level Hackathon Winner",
    institution: "KAHE",
    year: "2026",
    type: "win",
    icon: "🏆",
    metric: "1st Place",
    desc: "Recognized as the top innovative development team at the national level hackathon, showcasing robust full-stack deployment and real-time data sync capabilities."
  },
  {
    title: "Texperia Ideathon Winner",
    institution: "SNS Institutions",
    year: "2026",
    type: "win",
    icon: "🏆",
    metric: "Winner Title",
    desc: "Awarded top honors for designing an optimization framework addressing complex routing and distributed computational delays."
  },
  {
    title: "CodeRush Winner",
    institution: "SNS Institutions",
    year: "2026",
    type: "win",
    icon: "🏆",
    metric: "Speed Coding Champ",
    desc: "Demonstrated mastery of data structures, complexity analysis, and low-latency algorithmic solutions under extreme time constraints."
  },
  {
    title: "AI-Blitz Winner",
    institution: "SNS Institutions",
    year: "2026",
    type: "win",
    icon: "🏆",
    metric: "Top AI Solution",
    desc: "Built and deployed a real-time computer vision analysis model, delivering high performance inside a lightweight client browser interface."
  },
  {
    title: "Empirex Ideathon Winner",
    institution: "RVS Technical Campus",
    year: "2026",
    type: "win",
    icon: "🏆",
    metric: "1st Prize",
    desc: "Pioneered a smart hardware-software bridge targeting localized resource constraints and secure data transmission protocols."
  },
  {
    title: "Texperia Hackathon Finalist",
    rank: "Top 11 out of 150 Teams",
    institution: "SNS Institutions",
    year: "2026",
    type: "finalist",
    icon: "⭐",
    metric: "Finalist (Top 11)",
    desc: "Competed with 150 teams to design and present a production-grade system node architecture, securing a highly-rated finalist position."
  },
  {
    title: "Special Visionary Award",
    event: "Queenathon",
    institution: "DAIT",
    year: "2026",
    type: "award",
    icon: "🌟",
    metric: "Visionary Honor",
    desc: "Recipient of the Special Visionary Award for outstanding systemic design, clean interface aesthetics, and future-forward technical vision."
  }
];

const HERO_STATS = [
  { label: "Competition Wins", value: "5+", icon: Trophy },
  { label: "Special Award", value: "1", icon: Star },
  { label: "Finalist Finish", value: "Top 11", icon: Zap },
  { label: "National-Level Events", value: "Multiple", icon: Award }
];

function Counter({ value, duration = 1.2 }) {
  const [count, setCount] = useState("");

  useEffect(() => {
    const numericPart = parseInt(value);
    if (isNaN(numericPart)) {
      setCount(value);
      return;
    }
    const suffix = value.toString().replace(/[0-9]/g, "");
    let start = 0;
    const end = numericPart;
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / (duration * 1000), 1);
      const easeProgress = 1 - (1 - progress) * (1 - progress); // easeOutQuad
      const currentCount = Math.floor(easeProgress * (end - start) + start);
      setCount(currentCount + suffix);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [value, duration]);

  return <span>{count}</span>;
}

function AchievementCard({ ach, idx }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [particles, setParticles] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const triggerConfetti = (e) => {
    if (isExpanded) {
      setIsExpanded(false);
      return;
    }
    setIsExpanded(true);

    const newParticles = Array.from({ length: 40 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 30 + Math.random() * 100;
      return {
        id: Math.random(),
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 20,
        color: ["#A594F9", "#CDC1FF", "#E5D9F2", "#1C1635"][Math.floor(Math.random() * 4)],
        size: 3 + Math.random() * 6,
        rotation: Math.random() * 360,
        shape: Math.random() > 0.5 ? "circle" : "square"
      };
    });
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
  };

  const isLeft = idx % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`relative w-full flex flex-col md:flex-row items-center justify-between mb-12 md:mb-16 ${
        isLeft ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Central node on timeline */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-lavender-medium/40 bg-white flex items-center justify-center z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: idx * 0.1 }}
          className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] ${
            ach.type === "win"
              ? "bg-lavender-vibrant shadow-[0_0_12px_#A594F9]"
              : ach.type === "award"
              ? "bg-lavender-medium shadow-[0_0_10px_#CDC1FF]"
              : "bg-lavender-light shadow-[0_0_8px_#E5D9F2]"
          }`}
        />
      </div>

      {/* Card container */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 60 : -60, y: 30 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        onClick={triggerConfetti}
        className="w-[calc(100%-40px)] ml-10 md:ml-0 md:w-[44%] glass p-6 rounded-2xl border-lavender-medium/25 hover:border-lavender-vibrant/60 shadow-md text-left bg-white/35 transition-all duration-500 cursor-pointer overflow-hidden group select-none relative"
        style={{
          background: `radial-gradient(280px circle at ${mousePos.x}% ${mousePos.y}%, rgba(165, 148, 249, 0.08), transparent 75%)`
        }}
      >
        {/* Glow border element */}
        <div className="absolute inset-0 border border-transparent group-hover:border-lavender-vibrant/40 rounded-2xl pointer-events-none transition-all duration-500" />

        {/* Confetti canvas particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute pointer-events-none z-30"
            initial={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
            animate={{ x: p.x, y: p.y, scale: 0, rotate: p.rotation, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.shape === "circle" ? "50%" : "2px",
              left: "50%",
              top: "50%"
            }}
          />
        ))}

        {/* Top Header info */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl">{ach.icon}</span>
            <div>
              <span className="font-cyber text-[8px] tracking-[0.25em] text-lavender-vibrant font-extrabold uppercase block">
                {ach.type === "win" ? "CHAMPIONSHIP // FIRST_PLACE" : ach.type === "award" ? "SPECIAL_RECOGNITION" : "FINALIST_STANDINGS"}
              </span>
              <h3 className="font-display font-extrabold text-base sm:text-lg text-deep-text tracking-wide uppercase group-hover:text-lavender-vibrant transition-colors">
                {ach.title}
              </h3>
            </div>
          </div>
          <span className="font-cyber text-xs text-deep-text/50 font-black">{ach.year}</span>
        </div>

        {/* Institution Info */}
        <div className="flex items-center space-x-1.5 text-deep-text/75 font-cyber text-[9px] uppercase tracking-wider font-extrabold mb-3">
          <Landmark className="w-3.5 h-3.5 text-lavender-vibrant" />
          <span>{ach.institution}</span>
          {ach.rank && (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-lavender-medium" />
              <span className="text-lavender-vibrant">{ach.rank}</span>
            </>
          )}
        </div>

        {/* Short Highlight badge */}
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-lavender-light/20 border border-lavender-medium/30 group-hover:border-lavender-vibrant/40 transition-colors mb-2 z-10 relative">
          <span className="w-1.5 h-1.5 rounded-full bg-lavender-vibrant animate-pulse" />
          <span className="font-cyber text-[9px] font-bold text-deep-text uppercase tracking-widest">{ach.metric}</span>
        </div>

        {/* Click to expand hint */}
        <div className="text-center md:text-left mt-2">
          <span className="font-cyber text-[8px] tracking-[0.2em] text-lavender-vibrant/75 group-hover:text-lavender-vibrant uppercase block font-bold transition-all">
            {isExpanded ? "Click to Collapse Dashboard // Sync closed" : "Click to spotlight achievements // Analyze Node"}
          </span>
        </div>

        {/* Expanded panel details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden mt-4 pt-4 border-t border-lavender-medium/20 z-10 relative"
            >
              <p className="font-sans text-xs sm:text-sm text-deep-text/80 leading-relaxed font-medium">
                {ach.desc}
              </p>
              
              <div className="mt-4 p-3 rounded-xl bg-lavender-light/10 border border-lavender-medium/15 flex items-center justify-between">
                <span className="font-cyber text-[8px] tracking-wider text-deep-text/60 uppercase font-black">
                  STATUS: VERIFIED_RECORD
                </span>
                <span className="font-cyber text-[8px] tracking-widest text-lavender-vibrant uppercase font-extrabold">
                  SECURE_METRIC_PASS
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Grid spacer */}
      <div className="hidden md:block w-[44%]" />
    </div>
  );
}

export default function Achievements() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <section
      id="achievements"
      className="relative min-h-screen py-24 px-6 md:px-12 xl:px-24 select-none overflow-hidden bg-transparent"
    >
      {/* Background ambient mesh grids */}
      <div className="absolute top-[20%] left-[5%] w-[35vw] h-[35vw] rounded-full bg-lavender-light/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[30vw] h-[30vw] rounded-full bg-lavender-medium/15 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        
        {/* Module Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="font-cyber text-[10px] tracking-[0.4em] uppercase text-lavender-vibrant font-extrabold block mb-2">
            SEC_RECOGNITION // ACCOLADE_VAULT
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-deep-text tracking-tight uppercase">
            Achievements & <span className="bg-gradient-to-r from-lavender-vibrant via-lavender-medium to-deep-text bg-clip-text text-transparent neon-text-vibrant">Recognition</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-deep-text/75 max-w-xl mx-auto mt-4 font-medium leading-relaxed">
            Milestones, victories, and innovations recognized through competitive hackathons, ideathons, and technology events.
          </p>
          <div className="w-24 h-[2px] bg-gradient-to-r from-lavender-light via-lavender-medium to-lavender-vibrant mx-auto mt-6" />
        </div>

        {/* Hero Statistics Panels */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-20">
          {HERO_STATS.map((stat, sIdx) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: sIdx * 0.1 }}
                key={sIdx}
                className="glass p-5 rounded-2xl border-lavender-medium/20 text-center flex flex-col items-center justify-center bg-white/25 hover:border-lavender-vibrant/40 hover:shadow-[0_8px_20px_rgba(165,148,249,0.12)] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-lavender-light/20 border border-lavender-medium/30 flex items-center justify-center text-lavender-vibrant mb-3 shadow-inner">
                  <StatIcon className="w-5 h-5" />
                </div>
                
                <h4 className="font-display font-black text-xl sm:text-2xl text-deep-text uppercase tracking-wide">
                  <Counter value={stat.value} />
                </h4>
                
                <span className="font-cyber text-[8px] tracking-wider text-deep-text/60 uppercase font-black mt-1">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline wall of fame */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto py-8">
          
          {/* Base centerline timeline */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-lavender-light/40 border-r border-lavender-medium/20" />

          {/* Active dynamically growing colored line */}
          <motion.div
            style={{
              scaleY,
              transformOrigin: "top"
            }}
            className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-lavender-light via-lavender-medium to-lavender-vibrant shadow-[0_0_12px_#A594F9]"
          />

          <div className="space-y-4">
            {ACHIEVEMENTS.map((ach, idx) => (
              <AchievementCard key={idx} ach={ach} idx={idx} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
