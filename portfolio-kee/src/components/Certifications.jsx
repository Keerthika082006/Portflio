import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  Shield, CheckCircle, Award, Compass, 
  Layers, Lock, Unlock, Cpu, Globe, BookOpen 
} from "lucide-react";

// Inline Counter for Learning Metrics
function MetricCounter({ value, duration = 1.2 }) {
  const [count, setCount] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
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
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      const currentCount = Math.floor(easeProgress * (end - start) + start);
      setCount(currentCount + suffix);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [value, duration, isInView]);

  return <span ref={ref}>{count}</span>;
}

const CERTIFICATIONS = [
  {
    id: "java-foundation",
    title: "Java Foundation Associate",
    issuer: "Oracle",
    date: "Jan 2026",
    skills: ["Java SE basics", "OOP Architecture", "Variables & Operators", "Flow Control"],
    code: "ORCL-JFA-9920",
    badgeType: "core"
  },
  {
    id: "networking-cloud",
    title: "Introduction to Networking and Cloud Computing",
    issuer: "Microsoft",
    date: "Feb 2026",
    skills: ["Azure Cloud Core", "IP Protocols", "DNS Architecture", "Virtual Networking"],
    code: "MSFT-NET-8831",
    badgeType: "network"
  },
  {
    id: "iot-fundamentals",
    title: "Introduction to Internet of Things",
    issuer: "NPTEL",
    date: "Mar 2026",
    skills: ["Embedded Systems", "Microcontrollers", "LoRa & MQTT Protocols", "Sensor Networks"],
    code: "NPTEL-IOT-7712",
    badgeType: "iot"
  },
  {
    id: "entrepreneurship",
    title: "Understanding Incubation and Entrepreneurship",
    issuer: "NPTEL",
    date: "Apr 2026",
    skills: ["Business Modeling", "Startup Funding", "IP Management", "Strategic Marketing"],
    code: "NPTEL-INC-6604",
    badgeType: "business"
  }
];

const PROGRESS_METRICS = [
  { label: "Certifications Earned", value: "4", icon: Award },
  { label: "Cloud & Net Modules", value: "1", icon: Globe },
  { label: "IoT Specialization", value: "1", icon: Cpu },
  { label: "Java foundations", value: "1", icon: BookOpen },
  { label: "Incubation Strategy", value: "1", icon: Compass }
];

function CredentialCapsule({ cert, idx, activeIndex, setActiveIndex }) {
  const capsuleRef = useRef(null);
  const isInView = useInView(capsuleRef, { once: true });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const isHovered = activeIndex === idx;

  const handleMouseMove = (e) => {
    const rect = capsuleRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={capsuleRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: idx * 0.15, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setActiveIndex(idx)}
      onMouseLeave={() => setActiveIndex(null)}
      className={`relative glass p-6 rounded-2xl border-lavender-medium/25 hover:border-lavender-vibrant/60 shadow-lg bg-white/35 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between select-none ${
        isHovered ? "scale-[1.03] shadow-[0_12px_25px_rgba(165,148,249,0.18)]" : ""
      }`}
      style={{
        background: `radial-gradient(260px circle at ${mousePos.x}% ${mousePos.y}%, rgba(165, 148, 249, 0.08), transparent 75%)`
      }}
    >
      {/* Outer border flare */}
      <div className="absolute inset-0 border border-transparent group-hover:border-lavender-vibrant/40 rounded-2xl pointer-events-none transition-all duration-500" />

      {/* Floating capsule top badge info */}
      <div className="flex justify-between items-start mb-4">
        <div className="px-2 py-0.5 rounded bg-lavender-light/30 border border-lavender-medium/40 font-cyber text-[7px] tracking-widest text-deep-text font-black uppercase">
          SECURE_HASH // {cert.badgeType.toUpperCase()}
        </div>
        
        <div className="relative">
          {/* Glowing validation stamp */}
          <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
            isHovered 
              ? "bg-lavender-vibrant/25 border-lavender-vibrant text-lavender-vibrant shadow-[0_0_8px_#A594F9] rotate-360"
              : "bg-white/40 border-lavender-medium/30 text-deep-text/60"
          }`}>
            {isHovered ? <CheckCircle className="w-4 h-4 animate-pulse" /> : <Shield className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {/* Certificate visual mock container */}
      <div className="relative w-full aspect-[16/9] bg-[#1C1635] rounded-xl border border-white/10 p-3 select-none flex flex-col justify-between mb-4 overflow-hidden shadow-inner">
        {/* Background circuit matrix styling */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] bg-[size:8px_8px]" />
        
        <div className="flex justify-between items-center z-10">
          <div className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-lavender-vibrant animate-ping" />
            <span className="font-cyber text-[6px] tracking-widest text-white/50 uppercase">VERIFIED_VAULT</span>
          </div>
          <span className="font-cyber text-[6px] tracking-wider text-white/40">{cert.code}</span>
        </div>

        <div className="text-center z-10 py-1">
          <span className="font-cyber text-[7px] tracking-[0.2em] font-extrabold text-lavender-vibrant block mb-1">
            CREDENTIAL CERTIFICATE
          </span>
          <span className="font-display text-[9px] font-black text-white block uppercase tracking-wide max-w-[190px] mx-auto truncate">
            {cert.title}
          </span>
        </div>

        <div className="flex justify-between items-center z-10 border-t border-white/5 pt-1.5">
          <span className="font-cyber text-[6px] tracking-wider text-white/60 uppercase font-bold">{cert.issuer}</span>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="px-2 py-0.5 rounded bg-green-950 border border-green-500/40 text-green-400 font-cyber text-[5px] tracking-widest font-black uppercase"
              >
                PASS
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Title Details */}
      <div className="text-left space-y-1">
        <h3 className="font-cyber text-sm font-extrabold tracking-wide text-deep-text group-hover:text-lavender-vibrant transition-colors uppercase leading-snug min-h-[40px]">
          {cert.title}
        </h3>
        
        <div className="flex items-center justify-between font-sans text-xs text-deep-text/70 pt-2 border-t border-lavender-medium/20 mt-3 font-medium">
          <span className="uppercase text-[9px] tracking-wider">{cert.issuer}</span>
          <span className="font-cyber text-[9px] font-black uppercase text-lavender-vibrant">{cert.date}</span>
        </div>
      </div>

      {/* Expandable Info Drawer */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden text-left z-10 w-full mt-4"
          >
            <div className="space-y-2 pt-3 border-t border-lavender-medium/20 font-cyber text-[9px] tracking-wider">
              <span className="text-deep-text/70 block uppercase font-bold">skills_gained_node:</span>
              <div className="flex flex-wrap gap-1">
                {cert.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2 py-0.5 rounded bg-lavender-light/35 border border-lavender-medium/25 text-deep-text/80 text-[8px] font-bold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Certifications() {
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="certifications"
      className="relative min-h-screen py-24 px-6 md:px-12 xl:px-24 select-none overflow-hidden bg-transparent"
    >
      {/* Background radial soft shapes */}
      <div className="absolute top-[25%] left-[-5%] w-[35vw] h-[35vw] rounded-full bg-lavender-light/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[30vw] h-[30vw] rounded-full bg-lavender-medium/15 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        
        {/* Module Header */}
        <div className="text-center mb-16">
          <span className="font-cyber text-[10px] tracking-[0.4em] uppercase text-lavender-vibrant font-extrabold block mb-2">
            SEC_VERIFICATION // CREDENTIAL_CENTER
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-deep-text tracking-tight uppercase">
            Certifications & <span className="bg-gradient-to-r from-lavender-vibrant via-lavender-medium to-deep-text bg-clip-text text-transparent neon-text-vibrant font-black">Continuous Learning</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-deep-text/75 max-w-xl mx-auto mt-4 font-medium leading-relaxed">
            Verified credentials and learning milestones that strengthen my technical foundation.
          </p>
          <div className="w-24 h-[2px] bg-gradient-to-r from-lavender-light via-lavender-medium to-lavender-vibrant mx-auto mt-6" />
        </div>

        {/* Learning Journey Metrics Panel */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto mb-16">
          {PROGRESS_METRICS.map((metric, idx) => {
            const MetricIcon = metric.icon;
            return (
              <div 
                key={idx}
                className="glass p-4 rounded-xl border-lavender-medium/20 text-center flex flex-col items-center justify-center bg-white/20 hover:border-lavender-vibrant/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-lavender-light/25 border border-lavender-medium/30 flex items-center justify-center text-lavender-vibrant mb-2 shadow-inner">
                  <MetricIcon className="w-4 h-4" />
                </div>
                <div className="font-cyber text-lg font-black text-deep-text">
                  <MetricCounter value={metric.value} />
                </div>
                <span className="font-cyber text-[8px] text-deep-text/50 uppercase font-black block mt-0.5 tracking-wider">
                  {metric.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Digital Credential Vault Showcase */}
        <div ref={containerRef} className="max-w-6xl mx-auto relative">
          
          {/* Vault boundary gate frame */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="w-full border-2 border-dashed border-lavender-medium/30 rounded-3xl p-6 sm:p-8 bg-white/10 relative overflow-hidden"
          >
            {/* Vault Gate Status Bar */}
            <div className="flex items-center justify-between border-b border-lavender-medium/20 pb-4 mb-8 font-cyber text-[9px] tracking-wider text-deep-text/60">
              <div className="flex items-center space-x-2">
                {isInView ? <Unlock className="w-4 h-4 text-lavender-vibrant animate-bounce" /> : <Lock className="w-4 h-4 text-deep-text/50" />}
                <span className="font-black uppercase">
                  {isInView ? "SECURE_CREDENTIAL_VAULT: UNLOCKED" : "SECURE_CREDENTIAL_VAULT: SECURED"}
                </span>
              </div>
              <span className="font-black text-lavender-vibrant">SYSTEM_VAULT_ONLINE</span>
            </div>

            {/* Connecting pathway path inside grid */}
            <div className="absolute inset-0 pointer-events-none opacity-25">
              <svg className="w-full h-full">
                <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#A594F9" strokeWidth="1.5" strokeDasharray="6,8" className="hidden lg:block animate-[dash_40s_linear_infinite]" />
              </svg>
            </div>

            {/* Capsules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch relative z-10">
              {CERTIFICATIONS.map((cert, idx) => (
                <CredentialCapsule
                  key={cert.id}
                  cert={cert}
                  idx={idx}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                />
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
