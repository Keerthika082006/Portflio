import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Compass, Info } from "lucide-react";
import CyberTerminal from "./CyberTerminal";
import PathfindingVisualizer from "./PathfindingVisualizer";

export default function SysOpsDashboard() {
  const [activeTab, setActiveTab] = useState("terminal"); // 'terminal' or 'pathfinder'
  const containerRef = useRef(null);

  return (
    <section 
      id="console" 
      ref={containerRef}
      className="relative min-h-screen py-24 px-6 md:px-12 xl:px-24 select-none overflow-hidden bg-transparent"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "auto none auto 680px",
      }}
    >
      {/* Background neon atmosphere glows */}
      <div className="absolute top-[20%] left-[5%] w-[35vw] h-[35vw] rounded-full bg-lavender-light/20 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[30vw] h-[30vw] rounded-full bg-lavender-medium/15 blur-[80px] pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        {/* Module Header */}
        <div className="text-center mb-16">
          <span className="font-cyber text-[10px] tracking-[0.4em] uppercase text-lavender-vibrant font-extrabold block mb-2">
            SEC_INTEGRATION // CONTROL_INTERFACE
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-deep-text tracking-tight uppercase">
            SysOps <span className="bg-gradient-to-r from-lavender-vibrant via-lavender-medium to-deep-text bg-clip-text text-transparent neon-text-vibrant">Dashboard</span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-lavender-light via-lavender-medium to-lavender-vibrant mx-auto mt-4" />
        </div>

        {/* Dashboard Box Frame */}
        <div className="w-full max-w-5xl mx-auto glass rounded-2xl border-lavender-medium/25 bg-white/35 shadow-xl overflow-hidden p-6 sm:p-8 flex flex-col min-h-[620px] justify-between relative">
          {/* Retro futuristic cyber hud corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-lavender-vibrant/60" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-lavender-vibrant/60" />

          {/* Module Controls / Tabs bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-lavender-medium/20 pb-6 mb-6">
            
            {/* Tab Selectors */}
            <div className="flex space-x-3 w-full sm:w-auto">
              {[
                { id: "terminal", label: "Sys Shell Terminal", icon: Terminal },
                { id: "pathfinder", label: "Orbit Navigator Pathfinder", icon: Compass },
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center space-x-2 font-cyber text-[9px] sm:text-[10px] tracking-widest uppercase py-3.5 px-4 rounded-xl border transition-all duration-300 font-extrabold cursor-pointer interactive-glow ${
                      isActive 
                        ? "bg-lavender-vibrant border-lavender-vibrant text-deep-text shadow-[0_0_12px_rgba(165,148,249,0.3)]" 
                        : "border-lavender-medium/35 bg-white/40 text-deep-text/75 hover:bg-white/70 hover:border-lavender-vibrant/50"
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Micro Info Badge (HUD Spec) */}
            <div className="hidden lg:flex items-center space-x-2 font-cyber text-[8px] tracking-[0.2em] text-lavender-vibrant uppercase font-black bg-lavender-light/20 border border-lavender-medium/20 rounded px-3 py-2">
              <Info className="w-3 h-3 animate-pulse" />
              <span>LOG: ACTIVE_INTERFACE_TUNING // OK</span>
            </div>

          </div>

          {/* Tab Content Rendering with Animate Presence */}
          <div className="flex-grow flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {activeTab === "terminal" ? (
                <motion.div
                  key="terminal"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full h-full"
                >
                  <CyberTerminal />
                </motion.div>
              ) : (
                <motion.div
                  key="pathfinder"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full h-full"
                >
                  <PathfindingVisualizer />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
