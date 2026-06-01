import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Award, Calendar, ShieldCheck, ChevronDown, ChevronUp, Cpu } from "lucide-react";

const CERTIFICATIONS = [
  {
    title: "Oracle Certified Java Associate",
    issuer: "Oracle University",
    date: "Jan 2025",
    id: "OCA-JA-2849",
    skills: ["Java SE", "OOP", "Exception Handling", "Memory Allocation"],
    color: "#A594F9",
    ribbon: "SYSTEM_CORE"
  },
  {
    title: "Advanced React & Architecture",
    issuer: "Vanguard Frontend Institute",
    date: "Sep 2025",
    id: "ADV-RX-3920",
    skills: ["React 19", "Framer Motion", "Hydration Engine", "Web Performance"],
    color: "#A594F9",
    ribbon: "UI_SYSTEM"
  },
  {
    title: "Relational Database Specialist",
    issuer: "MySQL Academy",
    date: "Mar 2026",
    id: "SQL-DB-4019",
    skills: ["MySQL", "Query Optimization", "ACID Transactions", "Indexing"],
    color: "#A594F9",
    ribbon: "DATA_CORE"
  }
];

function CertificationCard({ cert, idx }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: idx * 0.15, ease: "easeOut" }}
      className="w-full"
    >
      <div 
        onClick={() => setExpanded(!expanded)}
        className="group relative glass rounded-2xl border-lavender-medium/25 hover:border-lavender-vibrant/50 shadow-md p-5 hover:shadow-[0_10px_30px_rgba(165,148,249,0.15)] transition-all duration-300 bg-white/35 cursor-pointer overflow-hidden flex flex-col justify-between"
      >
        {/* Floating Animation */}
        <div className="animate-float" style={{ animationDelay: `${idx * 0.5}s`, animationDuration: "5s" }}>
          
          {/* Card Top: Ribbon Badge */}
          <div className="flex justify-between items-start mb-4">
            <div 
              className="px-2.5 py-1 rounded text-[8px] font-cyber tracking-widest font-black uppercase text-white shadow-sm border"
              style={{ 
                borderColor: `${cert.color}44`,
                backgroundColor: `${cert.color}25`,
                color: "#1C1635"
              }}
            >
              {cert.ribbon}
            </div>
            
            <div className="w-8 h-8 rounded-full bg-lavender-light/30 border border-lavender-medium/30 flex items-center justify-center text-lavender-vibrant group-hover:text-deep-text transition-colors group-hover:shadow-[0_0_8px_#A594F9]">
              <Award className="w-4 h-4" />
            </div>
          </div>

          {/* Certificate Graphical Preview Block */}
          <div className="relative w-full aspect-[16/9] bg-lavender-bg/85 rounded-lg border border-lavender-medium/25 flex flex-col justify-between p-3 select-none mb-4 group-hover:border-lavender-vibrant/50 transition-colors shadow-inner overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_center,_#1C1635_1px,_transparent_1px)] bg-[size:10px_10px]" />
            <div className="absolute inset-0 border border-lavender-vibrant/10 m-1 rounded" />

            <div className="flex items-center space-x-1.5 z-10">
              <Cpu className="w-3.5 h-3.5" style={{ color: cert.color }} />
              <span className="font-cyber text-[7px] tracking-widest uppercase text-deep-text/60 font-bold">Credential Sync</span>
            </div>

            <div className="text-center z-10 px-1 py-2">
              <span className="font-cyber text-[8px] tracking-[0.2em] font-extrabold uppercase text-lavender-vibrant/90 block mb-1">
                CERTIFICATE OF ACHIEVEMENT
              </span>
              <span className="font-display text-[9px] font-black text-deep-text group-hover:text-lavender-vibrant transition-colors block uppercase max-w-[190px] mx-auto truncate">
                {cert.title}
              </span>
            </div>

            <div className="flex justify-between items-center z-10 border-t border-lavender-medium/10 pt-1.5">
              <span className="font-cyber text-[6px] tracking-wider text-deep-text/60 font-bold">{cert.issuer}</span>
              {/* Glowing Wax Seal Stamp */}
              <div className="w-4.5 h-4.5 rounded-full bg-lavender-vibrant/10 border border-lavender-vibrant/45 flex items-center justify-center shadow-[0_0_6px_rgba(165,148,249,0.3)] animate-pulse">
                <span className="text-[5px] font-cyber font-black text-lavender-vibrant">★</span>
              </div>
            </div>
          </div>

          {/* Title and Issuer */}
          <div className="text-left space-y-1">
            <h3 className="font-cyber text-sm font-extrabold tracking-wide text-deep-text group-hover:text-lavender-vibrant transition-colors uppercase">
              {cert.title}
            </h3>
            <div className="flex items-center text-deep-text/75 font-sans text-xs space-x-3 font-medium">
              <span>{cert.issuer}</span>
              <span className="w-1 h-1 rounded-full bg-lavender-medium/50" />
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-lavender-vibrant" />
                <span className="font-cyber text-[10px]">{cert.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Expand Trigger */}
        <div className="flex justify-center items-center text-deep-text/70 group-hover:text-lavender-vibrant pt-3 border-t border-lavender-medium/20 mt-4 transition-colors font-bold">
          <span className="font-cyber text-[8px] tracking-[0.2em] uppercase mr-1">
            {expanded ? "HIDE CREDENTIAL" : "VIEW CREDENTIAL"}
          </span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>

        {/* Expandable Drawer */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden text-left z-10 w-full"
            >
              <div className="pt-4 space-y-3 font-cyber text-[10px] tracking-wider border-t border-lavender-medium/20 mt-3">
                <div className="flex items-center space-x-2 text-deep-text/80 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-lavender-vibrant" />
                  <span>LICENSE:</span>
                  <span className="text-lavender-vibrant font-extrabold">{cert.id}</span>
                </div>
                
                <div className="space-y-1">
                  <span className="text-deep-text/70 block uppercase mb-1 font-bold">skills_acquired:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded bg-lavender-light/35 border border-lavender-medium/25 text-deep-text/90 text-[8px] font-bold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="relative min-h-screen py-24 px-6 md:px-12 xl:px-24 select-none overflow-hidden bg-transparent">
      {/* Dynamic ambient gradients */}
      <div className="absolute top-[30%] -left-[10%] w-[35vw] h-[35vw] rounded-full bg-lavender-light/20 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[0%] w-[30vw] h-[30vw] rounded-full bg-lavender-medium/15 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        {/* Module Header */}
        <div className="text-center mb-16">
          <span className="font-cyber text-[10px] tracking-[0.4em] uppercase text-lavender-vibrant font-extrabold block mb-2">
            SEC_VERIFICATION // CRYPTO_SIGNATURES
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-deep-text tracking-tight uppercase">
            System <span className="bg-gradient-to-r from-lavender-vibrant via-lavender-medium to-deep-text bg-clip-text text-transparent neon-text-vibrant">Certificates</span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-lavender-light via-lavender-medium to-lavender-vibrant mx-auto mt-4" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATIONS.map((cert, idx) => (
            <CertificationCard key={idx} cert={cert} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
