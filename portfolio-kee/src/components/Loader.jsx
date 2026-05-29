import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_SEQUENCE = [
  "INITIALIZING INTERFACE SYSTEMS...",
  "LOADING ASSETS AND VECTOR CACHES...",
  "SYNCHRONIZING GRAPHICS ENGINE...",
  "ESTABLISHING SECURE PROTOCOLS...",
  "UI RENDER NETWORKS SHUNTED...",
  "WELCOME TO KEE'S COGNITIVE SECTOR.",
];

export default function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [activeLog, setActiveLog] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const duration = 2400; // ms
    const interval = 20; // update speed
    const steps = duration / interval;
    const increment = 100 / steps;
    
    let currentProgress = 0;
    
    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        clearInterval(timer);
        setProgress(100);
        setCompleted(true);
        setTimeout(() => {
          if (onFinish) onFinish();
        }, 800);
      } else {
        setProgress(currentProgress);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onFinish]);

  useEffect(() => {
    const logInterval = setInterval(() => {
      setActiveLog((prev) => {
        if (prev < BOOT_SEQUENCE.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 380);

    return () => clearInterval(logInterval);
  }, []);

  return (
    <AnimatePresence>
      {!completed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100vh",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-between bg-lavender-bg p-8 select-none overflow-hidden"
        >
          {/* Soft light mesh overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(165,148,249,0.18),transparent)] pointer-events-none" />
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #CDC1FF 1.5px, transparent 1.5px)`,
              backgroundSize: "28px 28px"
            }}
          />

          {/* Top corner cyber metrics */}
          <div className="w-full flex justify-between text-lavender-vibrant/60 font-cyber text-[9px] tracking-widest uppercase font-bold">
            <div>STATUS: ONLINE // BOOT_SYS</div>
            <div>SECTOR_ID: #7B33-KEE</div>
          </div>

          {/* Center visual: Cyber Logo & Loader */}
          <div className="flex flex-col items-center justify-center space-y-8 z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative flex items-center justify-center"
            >
              {/* Outer spinning glowing elements */}
              <div className="absolute w-24 h-24 border border-lavender-medium/40 rounded-full animate-spin-slow" />
              <div className="absolute w-28 h-28 border-t-2 border-lavender-vibrant border-r-2 border-transparent rounded-full animate-spin" />
              
              <div className="w-16 h-16 rounded-full glass flex items-center justify-center shadow-lg border-lavender-medium/30">
                <span className="font-cyber font-bold text-2xl text-deep-text tracking-tighter">K</span>
              </div>
            </motion.div>

            {/* Percentage Indicator */}
            <div className="flex flex-col items-center space-y-2">
              <span className="font-cyber text-4xl font-extrabold text-deep-text tracking-widest text-shadow-[0_0_10px_rgba(165,148,249,0.2)]">
                {Math.floor(progress)}%
              </span>
              <span className="text-[10px] tracking-[0.3em] font-cyber text-lavender-vibrant uppercase font-bold animate-pulse">
                synchronizing interface
              </span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-64 h-[2px] bg-lavender-light/40 border border-lavender-medium/20 rounded-full overflow-hidden relative">
              <motion.div 
                className="h-full bg-gradient-to-r from-lavender-light via-lavender-medium to-lavender-vibrant shadow-[0_0_8px_#A594F9]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Bottom terminal logs */}
          <div className="w-full max-w-lg glass px-6 py-4 rounded-lg border-lavender-medium/25 text-left flex flex-col font-cyber text-[10px] tracking-wider space-y-1.5 min-h-[110px] shadow-lg z-10">
            <div className="text-deep-text/60 border-b border-lavender-medium/20 pb-1 mb-2 uppercase flex justify-between items-center font-bold">
              <span>System Output console</span>
              <span className="w-1.5 h-1.5 rounded-full bg-lavender-vibrant animate-ping" />
            </div>
            {BOOT_SEQUENCE.slice(0, activeLog + 1).map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={idx === activeLog ? "text-deep-text font-bold neon-text-vibrant" : "text-lavender-vibrant/75"}
              >
                &gt;&gt; {log}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
